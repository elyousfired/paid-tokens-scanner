import React from "react";
import { AlertTriangle } from "lucide-react";

export function Scorecard({
  burnVelocity = 0.64,
  dailyBuyback = 24600,
  dailyFees = 38800,
  volume24h = 18640000,
  liquidity = 918000
}) {
  const symbol = "PAID";

  return (
    <section className="space-y-4">
      {/* Score Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold font-mono text-white">
            15 <span className="text-sm font-normal text-slate-400">/ 16 scored bullish</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(14)].map((_, i) => (
              <span key={i} className="w-2.5 h-2.5 rounded-xs bg-green-500 inline-block" title="Bullish" />
            ))}
            <span className="w-2.5 h-2.5 rounded-xs bg-amber-500 inline-block" title="Caution" />
            <span className="w-2.5 h-2.5 rounded-xs bg-slate-500 inline-block" title="Neutral" />
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Bullish
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-500 inline-block" /> Neutral
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Caution
          </span>
        </div>
      </div>

      {/* Grid of 10 Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        <div className="indicator-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Burn velocity</span>
            <span className="badge-bull">Bullish</span>
          </div>
          <div className="text-xl font-bold font-mono text-white mt-2">
            {burnVelocity.toFixed(2)}% / day
          </div>
          <div className="text-[10px] text-slate-500 mt-1">~6.2M {symbol} burned daily</div>
        </div>

        <div className="indicator-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Buyback pressure</span>
            <span className="badge-bull">Bullish</span>
          </div>
          <div className="text-xl font-bold font-mono text-white mt-2">
            ${(dailyBuyback / 1000).toFixed(1)}K / day
          </div>
          <div className="text-[10px] text-slate-500 mt-1">100% of protocol cut to burn</div>
        </div>

        <div className="indicator-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Daily Platform Revenue</span>
            <span className="badge-bull">Bullish</span>
          </div>
          <div className="text-xl font-bold font-mono text-white mt-2">
            ${(dailyFees / 1000).toFixed(1)}K / day
          </div>
          <div className="text-[10px] text-slate-500 mt-1">${((dailyFees * 365) / 1e6).toFixed(2)}M annualized</div>
        </div>

        <div className="indicator-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Ecosystem volume</span>
            <span className="badge-bull">Bullish</span>
          </div>
          <div className="text-xl font-bold font-mono text-white mt-2">
            ${(volume24h / 1e6).toFixed(2)}M
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Meteora & PumpSwap pools</div>
        </div>

        <div className="indicator-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Total Pool Depth</span>
            <span className="badge-neutral">Neutral</span>
          </div>
          <div className="text-xl font-bold font-mono text-white mt-2">
            ${(liquidity / 1000).toFixed(0)}K
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Solana DEX Liquidity Pools</div>
        </div>

        <div className="indicator-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Burn Execution</span>
            <span className="badge-bull">Bullish</span>
          </div>
          <div className="text-xl font-bold font-mono text-white mt-2">1 tx / 2.8s</div>
          <div className="text-[10px] text-slate-500 mt-1">Token-2022 burnChecked</div>
        </div>

        <div className="indicator-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Gas Currency</span>
            <span className="badge-bull">Bullish</span>
          </div>
          <div className="text-xl font-bold font-mono text-cyan-400 mt-2">Solana SOL</div>
          <div className="text-[10px] text-slate-500 mt-1">Fixed ~$0.0005 Fee / TX</div>
        </div>

        <div className="indicator-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Holders Count</span>
            <span className="badge-bull">Bullish</span>
          </div>
          <div className="text-xl font-bold font-mono text-white mt-2">~14,250</div>
          <div className="text-[10px] text-slate-500 mt-1">Growing rapidly on Solana</div>
        </div>

        <div className="indicator-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Price / Ann. Rev</span>
            <span className="badge-bull">Bullish</span>
          </div>
          <div className="text-xl font-bold font-mono text-white mt-2">0.72×</div>
          <div className="text-[10px] text-slate-500 mt-1">Deep DeFi value territory</div>
        </div>

        <div className="indicator-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Transfer Tax</span>
            <span className="badge-bull">Bullish</span>
          </div>
          <div className="text-xl font-bold font-mono text-green-400 mt-2">0% Tax</div>
          <div className="text-[10px] text-slate-500 mt-1">Clean Token-2022 · No friction</div>
        </div>
      </div>

      {/* Architecture callout */}
      <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4 text-xs text-slate-300 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-cyan-300">UsePaid Automated Deflationary Architecture</div>
          <p className="text-slate-400 leading-relaxed">
            1. <strong>100% Buyback Engine</strong>: 20% of all creator fees immediately buy $PAID on Jupiter and burn it. 
            <br />
            2. <strong>14-Day Unclaimed Recipient Policy</strong>: Unclaimed creator payouts expire after 14 days and automatically convert 100% into $PAID buybacks.
          </p>
        </div>
      </div>
    </section>
  );
}
