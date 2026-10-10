import { useState } from 'react';
import { Header } from './components/Header';
import type { Page } from './components/Header';
import { Footer } from './components/Footer';
import { Landing } from './pages/Landing';
import { Screening } from './pages/Screening';
import { HowItWorks } from './pages/HowItWorks';
import { History } from './pages/History';

function App() {
  const [page, setPage] = useState<Page>('home');

  return (
    <div className="flex min-h-screen flex-col">
      <Header currentPage={page} onNavigate={setPage} />
      <main className="flex-1">
        {page === 'home' && <Landing onNavigate={setPage} />}
        {page === 'screening' && <Screening />}
        {page === 'how-it-works' && <HowItWorks onNavigate={setPage} />}
        {page === 'history' && <History />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
