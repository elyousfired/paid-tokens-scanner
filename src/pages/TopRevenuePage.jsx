import React, { useState, useMemo } from 'react';
import { 
  DollarSign, 
  Search, 
  Flame, 
  Clock, 
  ExternalLink, 
  TrendingUp, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { generateTop100RevenueTokens } from '../services/usepaidDataService';

export default function TopRevenuePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [sortBy, setSortBy] = useState('totalRevenue');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  const allTokens = useMemo(() => generateTop100RevenueTokens(), []);

  const filteredTokens = useMemo(() => {
    return allTokens.filter(t => {
      const matchesSearch = 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.handle.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (filterStatus === 'CLAIMED') return t.claimedByOwner;
      if (filterStatus === 'EXPIRING') return t.status === 'Expiring Soon';
      if (filterStatus === 'PENDING') return t.status === 'Pending Window';
      return true;
    }).sort((a, b) => {
      if (sortBy === 'totalRevenue') return b.totalRevenue - a.totalRevenue;
      if (sortBy === 'revenue24h') return b.revenue24h - a.revenue24h;
      if (sortBy === 'mcap') return b.mcap - a.mcap;
      if (sortBy === 'volume24h') return b.volume24h - a.volume24h;
      if (sortBy === 'burnContribution') return b.burnContribution - a.burnContribution;
      return b.totalRevenue - a.totalRevenue;
    });
  }, [allTokens, searchQuery, filterStatus, sortBy]);

  const totalPages = Math.ceil(filteredTokens.length / pageSize);
  const displayedTokens = filteredTokens.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totalEcosystemRev = allTokens.reduce((a, b) => a + b.totalRevenue, 0);
  const total24hRev = allTokens.reduce((a, b) => a + b.revenue24h, 0);
  const totalBurnContribution = allTokens.reduce((a, b) => a + b.burnContribution, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner in Arc Style */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Top 100 Revenue Engine</span>
          </span>
          <span className="text-xs text-slate-500 font-mono">11,525 Total Launches Scanned</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight font-mono">
          Top 100 Protocol Revenue Generators
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Comprehensive ranking of tokens routing creator fees via UsePaid on pump.fun, tracking 24h revenue volume, and net buyback contributions to $PAID.
        </p>
      </div>

      {/* KPI Cards in Arc Style */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
        <div className="card p-5 border-slate-800 bg-[#111622]">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold">Total Lifetime Revenue</span>
            <DollarSign className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold text-white">
            ${totalEcosystemRev.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] text-cyan-400 block mt-1">
            Cumulative creator fees processed
          </span>
        </div>

        <div className="card p-5 border-slate-800 bg-[#111622]">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold">24h Ecosystem Revenue</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-emerald-400">
            ${total24hRev.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] text-slate-500 block mt-1">
            Processed in trailing 24 hours
          </span>
        </div>

        <div className="card p-5 border-slate-800 bg-[#111622]">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold">Cumulative $PAID Burn</span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <p className="text-2xl font-bold text-orange-400">
            ${totalBurnContribution.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] text-orange-400/80 block mt-1">
            20% protocol cut executed to burn
          </span>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="card p-4 border-slate-800 bg-[#111622] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, symbol, or @handle..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#0b0e14] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => { setFilterStatus('ALL'); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              filterStatus === 'ALL'
                ? 'bg-cyan-500 text-black'
                : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
            }`}
          >
            All ({allTokens.length})
          </button>
          <button
            onClick={() => { setFilterStatus('EXPIRING'); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              filterStatus === 'EXPIRING'
                ? 'bg-rose-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
            }`}
          >
            Expiring Soon ({allTokens.filter(t => t.status === 'Expiring Soon').length})
          </button>
          <button
            onClick={() => { setFilterStatus('CLAIMED'); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              filterStatus === 'CLAIMED'
                ? 'bg-emerald-500 text-black'
                : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
            }`}
          >
            Claimed ({allTokens.filter(t => t.claimedByOwner).length})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#0b0e14] border border-slate-700 text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500"
          >
            <option value="totalRevenue">Total Revenue</option>
            <option value="revenue24h">24h Revenue</option>
            <option value="mcap">Market Cap</option>
            <option value="volume24h">24h Volume</option>
            <option value="burnContribution">Burn Contribution</option>
          </select>
        </div>
      </div>

      {/* Table in Arc Style */}
      <div className="card border-slate-800 bg-[#111622] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider bg-[#0b0e14]">
                <th className="py-3 px-4"># Rank</th>
                <th className="py-3 px-4">Token & Recipient</th>
                <th className="py-3 px-4">Price / 24h</th>
                <th className="py-3 px-4 text-right">Market Cap</th>
                <th className="py-3 px-4 text-right">24h Volume</th>
                <th className="py-3 px-4 text-right">24h Fees</th>
                <th className="py-3 px-4 text-right">Total Fees</th>
                <th className="py-3 px-4 text-right">Burn Contribution</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Links</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {displayedTokens.map((token) => (
                <tr key={token.rank} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-400">#{token.rank}</td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-white text-sm">{token.name}</div>
                    <div className="flex items-center gap-1.5 text-slate-400 mt-0.5">
                      <span className="text-slate-500">{token.symbol}</span>
                      <span>·</span>
                      <a
                        href={`https://x.com/${token.handle.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:underline"
                      >
                        {token.handle}
                      </a>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-white font-bold">
                      ${token.price < 0.0001 ? token.price.toFixed(6) : token.price.toFixed(4)}
                    </div>
                    <div className={token.priceChange24h >= 0 ? "text-emerald-400 text-[11px]" : "text-rose-400 text-[11px]"}>
                      {token.priceChange24h >= 0 ? "+" : ""}{token.priceChange24h}%
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-slate-200 font-bold">
                    ${(token.mcap / 1000).toFixed(1)}k
                  </td>
                  <td className="py-3 px-4 text-right text-slate-400">
                    ${(token.volume24h / 1000).toFixed(1)}k
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-emerald-400">
                    ${token.revenue24h.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-cyan-400">
                    ${token.totalRevenue.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-orange-400">
                    ${token.burnContribution.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {token.claimedByOwner ? (
                      <span className="badge-bull">Claimed</span>
                    ) : (
                      <span className="badge-caution">{token.expiresInHours}h left</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <a
                      href={`https://dexscreener.com/solana/${token.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white inline-flex items-center transition"
                      title="View Chart"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-800 flex items-center justify-between font-mono text-xs text-slate-400">
            <span>
              Page {currentPage} of {totalPages} ({filteredTokens.length} tokens)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
