# paid.fyi — $PAID Solana Deflationary Intelligence & Analytics Terminal

Real-time on-chain analytics and scanner platform for the **UsePaid ($PAID)** ecosystem on Solana.

![PAID Terminal](https://raw.githubusercontent.com/elyousfired/paid-tokens-scanner/main/public/preview.png)

## Overview
- **Token Contract**: `98kfF7rmsg1QDUEoCqNE7g7M1FdrTt92TEp2CLzypump` (Token-2022)
- **Official Treasury & Burn Wallet**: `PaidybYx1q4xTYXMgHq1PTAsFkPsdJf6XG7KC1NUSJ8`
- **Protocol Mechanism**: 100% Deflationary Auto-Burn via Jupiter v6 and Solana Token-2022.

## Key Features
1. **Supply & Burn Hero Gauge**: Exact Bloomberg/Arc terminal aesthetic with real-time supply, burned tokens, and verified checklist.
2. **Scorecard (15/16 Scored Bullish)**: 10 KPI indicators tracking burn velocity, daily revenue, ecosystem depth, and buyback pressure.
3. **The 4 Core Courbes (Side-by-Side 2x2 Grid)**:
   - **Courbe 1**: Cumulative $PAID Burn & SOL spent.
   - **Courbe 2**: Protocol Revenue Evolution (80% recipient / 20% burn split).
   - **Courbe 3**: $PAID Price & Robot Buyback spikes.
   - **Courbe 4**: 14-Day Unclaimed Pending Pool ($431,891 pool awaiting 100% burn conversion).
4. **Interactive Claim Deduction Engine**: Real-time simulation of owner claims automatically deducting from the pending burn pool.
5. **Top 100 Revenue Tokens**: Indexing 11,525 tokens directing creator trading fees to UsePaid on pump.fun.
6. **Live On-Chain Burn Terminal**: Direct Solana RPC feed of Jupiter swaps and Token-2022 burn executions.

## Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS + Custom Dark Theme
- **Data Visualizations**: Recharts
- **Icons**: Lucide React
- **Data APIs**: DexScreener + Solana RPC + UsePaid On-Chain Index

## Local Development
```bash
npm install
npm run dev
```
Server starts on `http://localhost:5175`.

## Build
```bash
npm run build
```
