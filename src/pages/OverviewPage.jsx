import React, { useState } from "react";
import { SupplyDonut } from "../components/SupplyDonut";
import { Scorecard } from "../components/Scorecard";
import { 
  Flame, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Calendar, 
  ArrowDownRight, 
  UserCheck, 
  Zap,
  ExternalLink,
  ShieldCheck,
  Search,
  ArrowUpRight,
  Radio
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from "recharts";
import { 
  getBurnEvolutionData, 
  getRevenueEvolutionData, 
  getPriceEvolutionData, 
  getPendingFundsData, 
  recordOwnerClaim, 
  getClaimsHistory 
} from "../services/chartsHistoryService";
import { generateTop100RevenueTokens } from "../services/usepaidDataService";
import { BURN_WALLET, PAID_MINT } from "../services/solanaBurnService";

export default function OverviewPage({ marketData, burnData }) {
  // Global Timeframe for the 4 Courbes
  const [timeframe, setTimeframe] = useState("24h");
  const [claimAmount, setClaimAmount] = useState("5000");
  const [claimHandle, setClaimHandle] = useState("@vitalik");
  const [lastDeduction, setLastDeduction] = useState(null);
  const [dataVersion, setDataVersion] = useState(0);

  // Table search & filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const allTokens = generateTop100RevenueTokens();

  // Load Data for all 4 Courbes
  const burnChartData = getBurnEvolutionData(timeframe);
  const revChartData = getRevenueEvolutionData(timeframe);
  const priceChartData = getPriceEvolutionData(timeframe);
  const pendingChartData = getPendingFundsData(timeframe);
  const claimsHistory = getClaimsHistory();

  // Metrics
  const currentPrice = marketData?.priceUsd || 0.0325;
  const priceChange = marketData?.priceChange24h || 62.2;
  const currentPending = pendingChartData[pendingChartData.length - 1]?.pendingAmount || 431891;
  const totalBurnedM = burnData?.totalBurned || 34298825;
  const burnedPct = burnData?.burnedPercentage || 3.43;
  const solBal = burnData?.solBalance || 89.68;
  const currentSupply = burnData?.currentSupply || 965701175;
  const recentBurns = burnData?.recentBurns || [];

  const handleSimulateClaim = (e) => {
    e.preventDefault();
    const amt = parseFloat(claimAmount);
    if (!amt || amt <= 0) return;
    recordOwnerClaim(claimHandle || "@creator", amt);
    setLastDeduction({ handle: claimHandle, amount: amt });
    setDataVersion(v => v + 1);
  };

  const filteredTokens = allTokens.filter(t => {
    const matches = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    t.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    t.handle.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matches) return false;
    if (filterStatus === "CLAIMED") return t.claimedByOwner;
    if (filterStatus === "EXPIRING") return t.status === "Expiring Soon";
    return true;
  }).slice(0, 15);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* 1. EXACT ARC HERO SECTION (Image 1): Supply Donut, Stats, Checklist */}
      <SupplyDonut
        burnedPct={burnedPct}
        burned={totalBurnedM}
        burnedUsd={Math.round(totalBurnedM * currentPrice)}
        supply={currentSupply}
        burnWalletPending={72259}
        solBal={solBal}
        dailyRev={38800}
        cumRev={1230825}
      />

      {/* 2. EXACT ARC SCORECARD (Image 1): 15/16 scored bullish + 10 KPI cards */}
      <Scorecard
        burnVelocity={0.64}
        dailyBuyback={24600}
        dailyFees={38800}
        volume24h={marketData?.volume24h || 18640000}
        liquidity={marketData?.liquidity || 918000}
      />

      {/* 3. 4 COURBES HEADER & 24H / 7D TOGGLE */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <span>The 4 Analytics Courbes (Side-by-Side 2x2 Grid)</span>
            <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
              4-in-1 View
            </span>
          </h2>
        </div>

        {/* Global 24h / 7d Switcher */}
        <div className="flex items-center gap-1 p-1 bg-[#111622] border border-slate-800 rounded-lg font-mono text-xs">
          <button
            onClick={() => setTimeframe("24h")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded font-bold transition cursor-pointer ${
              timeframe === "24h"
                ? "bg-cyan-500 text-black shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>24H</span>
          </button>
          <button
            onClick={() => setTimeframe("7d")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded font-bold transition cursor-pointer ${
              timeframe === "7d"
                ? "bg-cyan-500 text-black shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>7D</span>
          </button>
        </div>
      </div>

      {/* 4. THE 4 COURBES SIDE BY SIDE IN 2X2 GRID (WAHD HDA WAHAD) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* ----------------------------------------------------
            COURBE 1: EVOLUTION OF $PAID BURN
            ---------------------------------------------------- */}
        <div className="card p-4 border-slate-800 bg-gradient-to-b from-[#111622] to-[#0c1018] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <Flame className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                  Courbe 1: Evolution of $PAID Burn
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  Cumulative: <strong className="text-orange-400">{burnChartData[burnChartData.length - 1]?.paidBurnedM}M PAID</strong> (~2,456 SOL)
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-bold border border-slate-700">
              {timeframe.toUpperCase()}
            </span>
          </div>

          <div className="h-48 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={burnChartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="arcBurnGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} unit="M" domain={["auto", "auto"]} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-[#111622] border border-slate-800 p-2.5 rounded-lg shadow-xl font-mono text-xs">
                          <p className="text-slate-400 font-bold mb-1">{d.time}</p>
                          <p className="text-orange-400 font-bold">{d.paidBurnedM}M $PAID Burned</p>
                          <p className="text-slate-400">{d.solSpent} SOL spent</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="paidBurnedM" stroke="#f97316" strokeWidth={2.5} fill="url(#arcBurnGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ----------------------------------------------------
            COURBE 2: EVOLUTION OF PROTOCOL REVENUE
            ---------------------------------------------------- */}
        <div className="card p-4 border-slate-800 bg-gradient-to-b from-[#111622] to-[#0c1018] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <DollarSign className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                  Courbe 2: Evolution of Protocol Revenue
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  Total Fees: <strong className="text-emerald-400">${revChartData[revChartData.length - 1]?.totalRevenue.toLocaleString()}</strong> (80% X / 20% Burn)
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-bold border border-slate-700">
              {timeframe.toUpperCase()}
            </span>
          </div>

          <div className="h-48 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revChartData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="arcRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-[#111622] border border-slate-800 p-2.5 rounded-lg shadow-xl font-mono text-xs">
                          <p className="text-slate-400 font-bold mb-1">{d.time}</p>
                          <p className="text-emerald-400 font-bold">Total: ${d.totalRevenue.toLocaleString()}</p>
                          <p className="text-orange-400">20% Burn: ${d.burnRevenue.toLocaleString()}</p>
                          <p className="text-cyan-400">80% Recipient: ${d.recipientRevenue.toLocaleString()}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="totalRevenue" stroke="#10b981" strokeWidth={2.5} fill="url(#arcRevGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ----------------------------------------------------
            COURBE 3: $PAID PRICE & ROBOT BUYBACK SPIKES
            ---------------------------------------------------- */}
        <div className="card p-4 border-slate-800 bg-gradient-to-b from-[#111622] to-[#0c1018] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <TrendingUp className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                  Courbe 3: $PAID Price & Robot Buybacks
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  Price: <strong className="text-white">${currentPrice.toFixed(4)}</strong> <span className="text-emerald-400 font-bold">(+{priceChange}%)</span>
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-bold border border-slate-700">
              {timeframe.toUpperCase()}
            </span>
          </div>

          <div className="h-48 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceChartData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} tickFormatter={(v) => `$${v.toFixed(3)}`} domain={["auto", "auto"]} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-[#111622] border border-slate-800 p-2.5 rounded-lg shadow-xl font-mono text-xs">
                          <p className="text-slate-400 font-bold mb-1">{d.time}</p>
                          <p className="text-cyan-400 font-bold">Price: ${d.price.toFixed(5)}</p>
                          {d.buybackEvent && (
                            <p className="text-orange-400 flex items-center gap-1 mt-1 pt-1 border-t border-slate-800">
                              <Zap className="w-3 h-3 fill-orange-400" />
                              <span>{d.buybackEvent}</span>
                            </p>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line type="monotone" dataKey="price" stroke="#00f2fe" strokeWidth={2.5} dot={{ r: 2, fill: "#00f2fe" }} activeDot={{ r: 6, fill: "#f97316" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ----------------------------------------------------
            COURBE 4: 14-DAY PENDING POOL & AUTO-DEDUCTION ENGINE
            ---------------------------------------------------- */}
        <div className="card p-4 border-slate-800 bg-gradient-to-b from-[#111622] to-[#0c1018] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Clock className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                  Courbe 4: 14-Day Pending Pool (Unclaimed Creator Fees)
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  Pending: <strong className="text-purple-300">${currentPending.toLocaleString()}</strong> (~92% Burn Chance)
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-purple-300 font-bold border border-slate-700">
              {timeframe.toUpperCase()}
            </span>
          </div>

          <div className="h-48 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pendingChartData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="arcPendingGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-[#111622] border border-slate-800 p-2.5 rounded-lg shadow-xl font-mono text-xs">
                          <p className="text-slate-400 font-bold mb-1">{d.time}</p>
                          <p className="text-purple-300 font-bold">Pending: ${d.pendingAmount.toLocaleString()}</p>
                          {d.event && (
                            <p className="text-emerald-400 flex items-center gap-1 mt-1">
                              <ArrowDownRight className="w-3 h-3" />
                              <span>{d.event}</span>
                            </p>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="pendingAmount" stroke="#a855f7" strokeWidth={2.5} fill="url(#arcPendingGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 5. INTERACTIVE CLAIM DEDUCTION SIMULATOR CARD */}
      <div className="card p-4 border-slate-800 bg-[#111622]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Real-Time Creator Claim Deduction Engine (Courbe 4)
            </h4>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            If a creator claims their funds via X Money, the pending pool drops instantly!
          </span>
        </div>

        <form onSubmit={handleSimulateClaim} className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <input
            type="text"
            value={claimHandle}
            onChange={(e) => setClaimHandle(e.target.value)}
            placeholder="@handle"
            className="px-3 py-1.5 rounded-md bg-[#0b0e14] border border-slate-700 text-white focus:outline-none focus:border-cyan-500 w-40"
          />
          <div className="flex items-center gap-1">
            <span className="text-slate-400">$</span>
            <input
              type="number"
              value={claimAmount}
              onChange={(e) => setClaimAmount(e.target.value)}
              placeholder="Amount"
              className="px-3 py-1.5 rounded-md bg-[#0b0e14] border border-slate-700 text-white focus:outline-none focus:border-cyan-500 w-28"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-1.5 rounded-md bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition shadow cursor-pointer flex items-center gap-1"
          >
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>Deduct Claim</span>
          </button>
          
          {lastDeduction && (
            <span className="text-emerald-400 flex items-center gap-1">
              ✓ Deducted -${lastDeduction.amount.toLocaleString()} for {lastDeduction.handle}
            </span>
          )}
        </form>
      </div>

      {/* 6. TOP REVENUE TOKENS PREVIEW TABLE */}
      <div className="card p-5 border-slate-800 bg-[#111622]">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <DollarSign className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Top Creator Fee Revenue Tokens (11,525 Scanned)
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Tokens directing creator fees through UsePaid on pump.fun
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name / @handle..."
              className="px-3 py-1.5 rounded-md bg-[#0b0e14] border border-slate-700 text-white focus:outline-none focus:border-cyan-500 w-52"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-2.5 px-3"># Rank</th>
                <th className="py-2.5 px-3">Token & Recipient</th>
                <th className="py-2.5 px-3">Price / 24h</th>
                <th className="py-2.5 px-3 text-right">MCap</th>
                <th className="py-2.5 px-3 text-right">24h Vol</th>
                <th className="py-2.5 px-3 text-right">24h Rev</th>
                <th className="py-2.5 px-3 text-right">Total Rev</th>
                <th className="py-2.5 px-3 text-right">Burn Value</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredTokens.map((t) => (
                <tr key={t.rank} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-slate-400 font-bold">{t.rank}</td>
                  <td className="py-2.5 px-3">
                    <div className="font-bold text-white">{t.name} <span className="text-slate-500 font-normal">({t.symbol})</span></div>
                    <span className="text-cyan-400 text-[11px]">{t.handle}</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="text-white">${t.price < 0.0001 ? t.price.toFixed(6) : t.price.toFixed(4)}</div>
                    <div className={t.priceChange24h >= 0 ? "text-emerald-400 text-[10px]" : "text-rose-400 text-[10px]"}>
                      {t.priceChange24h >= 0 ? "+" : ""}{t.priceChange24h}%
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-200">${(t.mcap / 1000).toFixed(1)}k</td>
                  <td className="py-2.5 px-3 text-right text-slate-400">${(t.volume24h / 1000).toFixed(1)}k</td>
                  <td className="py-2.5 px-3 text-right font-bold text-emerald-400">${t.revenue24h.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-cyan-400">${t.totalRevenue.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-orange-400">${t.burnContribution.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-center">
                    {t.claimedByOwner ? (
                      <span className="badge-bull">Claimed</span>
                    ) : (
                      <span className="badge-caution">{t.expiresInHours}h left</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. LIVE ON-CHAIN BURN EVENTS STREAM */}
      <div className="card p-5 border-slate-800 bg-[#111622]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <Flame className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Live On-Chain Burn Transactions (Token-2022)
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Direct transactions from master wallet: {BURN_WALLET.slice(0, 10)}...{BURN_WALLET.slice(-6)}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Block-synced</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
          {recentBurns.slice(0, 6).map((burn, idx) => (
            <div 
              key={burn.signature}
              className="p-3.5 rounded-lg bg-[#0b0e14] border border-slate-800/80 hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  Burn Event #{idx + 1}
                </span>
                <span className="text-[11px] text-slate-500">
                  {new Date(burn.blockTime).toLocaleTimeString()}
                </span>
              </div>

              <div className="space-y-1 mb-2">
                <div className="flex justify-between">
                  <span className="text-slate-400 text-[11px]">Burned:</span>
                  <span className="font-bold text-white">{burn.estimatedPaid.toLocaleString()} $PAID</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-[11px]">Spent:</span>
                  <span className="font-bold text-amber-400">{burn.estimatedSol} SOL</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 truncate max-w-[120px]">{burn.signature.slice(0, 12)}...</span>
                <a
                  href={burn.solscanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold"
                >
                  <span>Solscan</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
