import type { AnalysisResult } from './types';

const EDGE_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-oral`;

interface EdgeFunctionResponse extends Omit<AnalysisResult, 'overallStatus' | 'riskLevel' | 'confidence'> {
  overallStatus: string;
  riskLevel: string;
  confidence: number;
}

function waitForVideoEvent(video: HTMLVideoElement, eventName: string): Promise<void> {
  const readyState = eventName === 'loadedmetadata' ? 1 : 2;
  if (video.readyState >= readyState) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const handleEvent = () => {
      cleanup();
      resolve();
    };
    const handleError = () => {
      cleanup();
      reject(new Error('Could not read the recorded video.'));
    };
    const cleanup = () => {
      video.removeEventListener(eventName, handleEvent);
      video.removeEventListener('error', handleError);
    };
    video.addEventListener(eventName, handleEvent, { once: true });
    video.addEventListener('error', handleError, { once: true });
  });
}

function seekVideo(video: HTMLVideoElement, time: number): Promise<void> {
  const seeked = new Promise<void>((resolve, reject) => {
    const handleSeeked = () => {
      cleanup();
      resolve();
    };
    const handleError = () => {
      cleanup();
      reject(new Error('Could not read the recorded video.'));
    };
    const cleanup = () => {
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('error', handleError);
    };
    video.addEventListener('seeked', handleSeeked, { once: true });
    video.addEventListener('error', handleError, { once: true });
  });
  video.currentTime = time;
  return seeked;
}

async function extractRepresentativeFrames(videoFile: File): Promise<Blob[]> {
  const video = document.createElement('video');
  const objectUrl = URL.createObjectURL(videoFile);
  video.src = objectUrl;
  video.preload = 'auto';
  video.muted = true;
  video.playsInline = true;

  try {
    await waitForVideoEvent(video, 'loadedmetadata');
    await waitForVideoEvent(video, 'loadeddata');

    const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 1;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');

    if (!context || canvas.width === 0 || canvas.height === 0) {
      throw new Error('Could not read video frames.');
    }

    const frameTimes = [0.15, 0.4, 0.65, 0.9].map((position) =>
      Math.min(duration * position, Math.max(0, duration - 0.05))
    );
    const frames: Blob[] = [];

    for (const time of frameTimes) {
      await seekVideo(video, time);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const frame = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.84));
      if (!frame) throw new Error('Could not prepare video frames.');
      frames.push(frame);
    }

    return frames;
  } finally {
    URL.revokeObjectURL(objectUrl);
    video.removeAttribute('src');
    video.load();
  }
}

export async function analyzeVideo(videoFile: File): Promise<AnalysisResult> {
  let frames: Blob[];
  try {
    frames = await extractRepresentativeFrames(videoFile);
    console.info('[ORALYTICS][Step 1] Video/frame extraction succeeded:', {
      frameCount: frames.length,
      frameSizes: frames.map((frame) => frame.size),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[ORALYTICS][Step 1] Video/frame extraction failed:', message, error);
    throw error;
  }

  const emptyFrameIndex = frames.findIndex((frame) => frame.size === 0);
  if (frames.length !== 4 || emptyFrameIndex !== -1) {
    const message = `Expected 4 non-empty frames; received ${frames.length} frames. Empty frame index: ${emptyFrameIndex}.`;
    console.error('[ORALYTICS][Step 2] Frame image data validation failed:', message);
    throw new Error(message);
  }
  console.info('[ORALYTICS][Step 2] Four frames contain image data:', frames.map((frame) => `${frame.type} ${frame.size} bytes`));

  const formData = new FormData();
  frames.forEach((frame, index) => formData.append('frames', frame, `frame-${index + 1}.jpg`));
  console.info('[ORALYTICS][Step 3] Sending four frames to the analysis API.');

  let response: Response;
  try {
    response = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: formData,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[ORALYTICS][Step 4] API request failed before a server response:', message, error);
    throw error;
  }

  let responseBody: EdgeFunctionResponse | { error?: string; details?: string };
  try {
    responseBody = await response.json();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[ORALYTICS][Step 8] API response JSON parsing failed:', message, error);
    throw new Error(`Analysis returned a non-JSON response (${response.status}).`);
  }

  if (!response.ok) {
    const errorBody = responseBody as { error?: string; details?: string };
    const message = `${errorBody.error || `Analysis failed (${response.status})`}${errorBody.details ? ` — ${errorBody.details}` : ''}`;
    console.error('[ORALYTICS][Step 6] Server/Gemini analysis failed:', message);
    throw new Error(message);
  }

  console.info('[ORALYTICS][Step 7] Gemini response received from the server.');
  const data = responseBody as EdgeFunctionResponse;
  if (!data.overallStatus || !data.riskLevel || !data.imageQuality || !Array.isArray(data.findings)) {
    const message = 'Server response is missing required analysis fields.';
    console.error('[ORALYTICS][Step 8] Gemini JSON validation failed:', message, data);
    throw new Error(message);
  }

  const result: AnalysisResult = {
    overallStatus: data.overallStatus as AnalysisResult['overallStatus'],
    riskLevel: data.riskLevel as AnalysisResult['riskLevel'],
    confidence: data.confidence,
    imageQuality: data.imageQuality,
    findings: data.findings,
    recommendation: data.recommendation,
    summary: data.summary,
    detectedRegions: data.detectedRegions,
  };
  console.info('[ORALYTICS][Step 9] Results page received the analysis result.');
  return result;
}
