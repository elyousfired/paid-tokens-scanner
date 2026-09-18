import React from "react";
import { fmtNum, fmtCompact } from "../lib/format";

export function TickerBar({
  price = 0.0325,
  priceChange = 62.2,
  mcap = 31400000,
  vol24h = 18640000,
  burnedPct = 3.43,
  liquidity = 918000,
  burnWalletPending = 72259,
  solBal = 89.68,
  dailyFees = 38800,
}) {
  const symbol = "PAID";
  const p = price;
  const chg = priceChange;
  const mc = mcap;
  const vol = vol24h;
  const bpct = burnedPct;
  const liq = liquidity;
  const fees = dailyFees;

  return (
    <div className="border-b border-slate-800/80 bg-slate-950/60 text-xs py-2 px-4 sm:px-6 overflow-x-auto select-none font-mono">
      <div className="max-w-7xl mx-auto ticker !gap-6 flex items-center">
        <span>
          <span className="k">{symbol}/SOL</span>
          <b>${fmtNum(p, 4)}</b>
          <span className={chg >= 0 ? "text-up font-semibold" : "text-down font-semibold"}>
            {chg >= 0 ? `+${fmtNum(chg, 1)}%` : `${fmtNum(chg, 1)}%`}
          </span>
        </span>
        <span>
          <span className="k">MCAP</span>
          <b>{fmtCompact(mc)}</b>
        </span>
        <span>
          <span className="k">24H VOL</span>
          <b>{fmtCompact(vol)}</b>
        </span>
        <span>
          <span className="k">BURNED</span>
          <b className="text-cyan-400">{fmtNum(bpct, 2)}%</b>
        </span>
        <span>
          <span className="k">LAST BURN</span>
          <b className="text-white">32,824</b>
          <span className="k">· $1,075 · Jupiter verified</span>
        </span>
        <span>
          <span className="k">POOL TVL</span>
          <b>{fmtCompact(liq)}</b>
        </span>
        <span>
          <span className="k">PENDING IN WALLET</span>
          <b className="text-amber-400">{fmtCompact(burnWalletPending, "")} {symbol} · {solBal.toFixed(1)} SOL</b>
        </span>
        <span>
          <span className="k">14-DAY PENDING POOL</span>
          <b className="text-purple-400">$431.8K</b>
        </span>
        <span>
          <span className="k">GAS FEE</span>
          <b className="text-green-400">~$0.0005 SOL</b>
        </span>
      </div>
    </div>
  );
}
