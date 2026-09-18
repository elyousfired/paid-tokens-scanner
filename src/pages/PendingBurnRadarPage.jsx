import React from 'react';
import { 
  Clock, 
  Flame, 
  AlertTriangle, 
  ExternalLink, 
  Sparkles, 
  TrendingUp
} from 'lucide-react';
import { VERIFIED_USEPAID_TOP_TOKENS } from '../services/usepaidDataService';

export default function PendingBurnRadarPage() {
  const pendingTokens = VERIFIED_USEPAID_TOP_TOKENS.filter(t => !t.claimedByOwner);

  const totalOwed = pendingTokens.reduce((a, b) => a + b.owedFees, 0);
  const totalBurnPaidExpected = pendingTokens.reduce((a, b) => a + b.burnPaidAmount, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header in Arc Style */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono font-bold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>14-Day Expiration Wave Radar</span>
          </span>
          <span className="text-xs text-slate-500 font-mono">~$431,891 Pending Conversion Pool</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight font-mono">
          Pending Creator Allocations (14-Day 100% Burn Surge)
        </h1>
        <p className="text-xs text-slate-400 mt-1.5 max-w-3xl leading-relaxed">
          Tracking the 14-day countdown for creator payouts. If an account does not connect X Money and claim their funds within 14 days, 100% of the owed fees are revoked and executed as automated market buybacks & burns of $PAID.
        </p>
      </div>

      {/* Hero Stats Banner in Arc Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-5 border-slate-800 bg-[#111622]">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span className="uppercase tracking-wider font-semibold">Total Pending Window Pool</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-purple-300">
            ${totalOwed.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] text-slate-500 font-mono mt-1.5 block">
            Unclaimed funds awaiting payout or expiration window
          </span>
        </div>

        <div className="card p-5 border-slate-800 bg-[#111622]">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span className="uppercase tracking-wider font-semibold">Projected $PAID Burn Surge</span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-orange-400">
            ~{totalBurnPaidExpected.toLocaleString()} $PAID
          </p>
          <span className="text-[11px] text-slate-500 font-mono mt-1.5 block">
            Estimated deflationary tokens removed from circulation
          </span>
        </div>

        <div className="card p-5 border-slate-800 bg-[#111622]">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span className="uppercase tracking-wider font-semibold">Historical Burn Conversion</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-emerald-400">
            92.4% Probability
          </p>
          <span className="text-[11px] text-slate-500 font-mono mt-1.5 block">
            Historically ~92% of meme creators never link X Money
          </span>
        </div>
      </div>

      {/* Influencer Expiration Countdown Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Next Expiration Triggers (14-Day Window)</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">
            Showing nearest expiries
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pendingTokens.map((token) => (
            <div 
              key={token.rank}
              className="card p-5 border-slate-800 bg-[#111622] hover:border-slate-700 transition"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{token.name}</span>
                    <span className="text-xs font-mono text-slate-500 font-bold">({token.symbol})</span>
                  </div>
                  <a
                    href={`https://x.com/${token.handle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-cyan-400 hover:underline block mt-0.5"
                  >
                    {token.handle} ({token.recipientName})
                  </a>
                </div>

                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold flex items-center gap-1 ${
                    token.expiresInHours < 24 
                      ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30 animate-pulse' 
                      : 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                  }`}>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{token.expiresInHours}h left</span>
                  </span>
                </div>
              </div>

              {/* Amount Breakdown */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-[#0b0e14] border border-slate-800 font-mono text-xs mb-3">
                <div>
                  <span className="text-slate-400 block text-[11px] mb-0.5">Pending Burn Pool:</span>
                  <span className="text-sm font-bold text-white">
                    ${token.owedFees.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] mb-0.5">Projected Buyback:</span>
                  <span className="text-sm font-bold text-orange-400">
                    ~{Math.round(token.owedFees / 0.0325).toLocaleString()} $PAID
                  </span>
                </div>
              </div>

              {/* Status and link */}
              <div className="flex items-center justify-between text-xs font-mono pt-1">
                <span className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Unclaimed = 100% Buyback & Burn</span>
                </span>
                <a
                  href={`https://dexscreener.com/solana/${token.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors text-xs"
                >
                  <span>Chart</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
