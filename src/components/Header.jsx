import React from "react";
import { 
  Flame, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  ExternalLink, 
  RefreshCw, 
  Zap, 
  ChevronDown,
  Layers,
  Activity
} from "lucide-react";
import { BURN_WALLET, PAID_MINT } from "../services/solanaBurnService";

export default function Header({
  currentPage,
  setCurrentPage,
  marketData,
  burnData,
  onRefresh,
  isRefreshing
}) {
  const price = marketData?.priceUsd || 0.0325;
  const change24h = marketData?.priceChange24h || 62.2;
  const solBal = burnData?.solBalance || 89.68;
  const burnedM = ((burnData?.totalBurned || 34298825) / 1000000).toFixed(2);
  const burnedPct = burnData?.burnedPercentage?.toFixed(2) || "3.43";

  const navItems = [
    { id: "overview", label: "Overview", icon: Layers },
    { id: "charts", label: "4 Courbes (Side-by-Side)", icon: TrendingUp, badge: "Live" },
    { id: "revenue", label: "Top 100 Revenue", icon: DollarSign },
    { id: "burns", label: "Live Burns", icon: Flame },
    { id: "pending", label: "14-Day Wave", icon: Clock, badge: "$431K" }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#070b14]/95 backdrop-blur-md">
      {/* Top Ticker Bar */}
      <div className="border-b border-slate-800/60 bg-[#05080f] px-4 sm:px-6 py-1.5 text-xs font-mono flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 overflow-x-auto">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-400">PAID/SOL:</span>
            <span className="font-bold text-white">${price.toFixed(4)}</span>
            <span className={`px-1.5 py-0.2 rounded text-[11px] font-bold ${
              change24h >= 0 ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-400"
            }`}>
              {change24h >= 0 ? "+" : ""}{change24h.toFixed(1)}%
            </span>
          </div>

          <div className="h-3 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-1.5 text-slate-300">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-slate-400">Total Burned:</span>
            <span className="font-bold text-cyan-400">{burnedM}M</span>
            <span className="text-slate-500 font-mono">({burnedPct}%)</span>
          </div>

          <div className="h-3 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-400">Burn Bot Wallet:</span>
            <span className="font-bold text-amber-400">{solBal.toFixed(2)} SOL</span>
            <span className="text-slate-500 font-mono">(${(solBal * 112).toFixed(0)})</span>
          </div>

          <div className="h-3 w-px bg-slate-800 hidden md:block" />

          <div className="hidden md:flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-slate-400">14-Day Pending Pool:</span>
            <span className="font-bold text-purple-300">$431,891</span>
            <span className="text-slate-500 font-mono">(Unclaimed)</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`https://fomo.family/trade/${PAID_MINT}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-mono font-bold transition"
          >
            <span>FOMO App</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href={`https://dexscreener.com/solana/${PAID_MINT}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white font-mono transition"
          >
            <span>DexScreener</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            title="Refresh Live Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-cyan-400" : ""}`} />
          </button>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Brand */}
          <button
            onClick={() => setCurrentPage("charts")}
            className="flex items-center gap-2.5 font-bold tracking-tight text-white text-[17px] cursor-pointer"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Zap className="w-5 h-5 text-white fill-white" />
            </span>
            <span className="font-extrabold tracking-tight">paid.fyi</span>
            <span className="border border-slate-700 bg-slate-800/60 rounded px-1.5 py-0.5 text-[10px] text-cyan-400 font-medium font-mono">
              100% BURN
            </span>
          </button>

          {/* Token Selector Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-xs font-mono font-bold text-white">
            <span className="text-orange-400">🔥</span>
            <span className="text-cyan-400">$PAID</span>
            <span className="text-slate-500 text-[10px]">Solana</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  active
                    ? "bg-slate-800 text-white font-bold border border-slate-700 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? "text-cyan-400" : "text-slate-400"}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                    active ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-slate-800 text-slate-400"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
