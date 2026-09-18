import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import OverviewPage from './pages/OverviewPage';
import TopRevenuePage from './pages/TopRevenuePage';
import LiveBurnTerminalPage from './pages/LiveBurnTerminalPage';
import PendingBurnRadarPage from './pages/PendingBurnRadarPage';
import { fetchPaidMarketData } from './services/paidMarketService';
import { fetchLiveBurnWalletData, BURN_WALLET, PAID_MINT } from './services/solanaBurnService';
import { ExternalLink } from 'lucide-react';

export default function App() {
  // Default to 'overview' which renders the exact Arc Terminal + 4 Courbes Side-by-Side!
  const [currentPage, setCurrentPage] = useState('overview');
  const [marketData, setMarketData] = useState(null);
  const [burnData, setBurnData] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const [mkt, burn] = await Promise.all([
        fetchPaidMarketData(),
        fetchLiveBurnWalletData()
      ]);
      setMarketData(mkt);
      setBurnData(burn);
    } catch (err) {
      console.error('Failed loading data:', err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 20000);
    return () => clearInterval(interval);
  }, [loadData]);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Header in Arc Theme */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        marketData={marketData}
        burnData={burnData}
        onRefresh={loadData}
        isRefreshing={isRefreshing}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {(currentPage === 'overview' || currentPage === 'charts') && (
          <OverviewPage
            marketData={marketData}
            burnData={burnData}
          />
        )}

        {currentPage === 'revenue' && (
          <TopRevenuePage />
        )}

        {currentPage === 'burns' && (
          <LiveBurnTerminalPage
            burnData={burnData}
            onRefresh={loadData}
            isRefreshing={isRefreshing}
          />
        )}

        {currentPage === 'pending' && (
          <PendingBurnRadarPage />
        )}
      </main>

      {/* Footer in Arc Theme */}
      <footer className="border-t border-slate-800/80 bg-[#05080f] mt-16 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white font-bold">
              🔥
            </span>
            <div>
              <p className="text-white font-bold text-sm">paid.fyi — 100% Deflationary Intelligence</p>
              <p className="text-[11px] text-slate-500">Real-time UsePaid Protocol Scanner & Solana Analytics</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <a
              href={`https://solscan.io/token/${PAID_MINT}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition flex items-center gap-1"
            >
              <span>$PAID Contract</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={`https://solscan.io/account/${BURN_WALLET}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition flex items-center gap-1"
            >
              <span>Burn Wallet</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://usepaid.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition flex items-center gap-1"
            >
              <span>UsePaid App</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={`https://fomo.family/trade/${PAID_MINT}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition flex items-center gap-1 font-bold"
            >
              <span>FOMO App</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
