# Conpay — Invoices as Collateral

> A high-fidelity mobile-first HTML prototype for ETHOnline 2026

**One-liner:** Invoices are promises. Conpay makes them collateral.  
**Pitch:** Humans today, agents tomorrow — same primitive.

## What It Is

Conpay is a clickable UI mock prototype demonstrating a DeFi protocol where funded USDC invoices become collateral you can earn yield on and pledge to subcontractors. This is a **demo interface only** — no wallet connection, no chain calls, fake data with instant transitions.

### Core Concepts

1. **Yield** — Locked escrow USDC earns (Aave-style vault). 50% payer rebate / 30% insurance pool / 20% protocol
2. **Pledges** — Payee irrevocably routes portions of future settlement to others. Juniors-first waterfall
3. **Settlement Score** — Sybil-resistant (World ID), gates pledge capacity. Tiers 0–3 → 50%–80% cap
4. **Agents** — Same primitive, faster: verifier contracts replace human approval for agent workflows

## How to Open

### Option 1: GitHub Pages (Recommended)
Visit **https://chiranz.github.io/conpay-ui-mock/**

This is the intended hosting method. The prototype is served from a private GitHub repo at `conpay-ui-mock` via GitHub Pages.

### Option 2: Local File
Simply open `index.html` in any modern browser. No server required — all assets are relative paths and all demo data is inline.

```bash
# Clone and open
git clone [repo-url]
cd conpay-ui-mock
open index.html
# or double-click index.html in your file browser
```

### Option 3: Local Server (Optional)
```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Best Experience
- View on mobile device (390×844) or resize browser to phone dimensions
- On desktop, the interface displays in a centered phone bezel
- Use Chrome, Safari, or Firefox for best compatibility

## Demo Flow

### Manual Tap-Through
Navigate using:
- **Bottom tabs:** Home, Escrows, Score, Agents
- **Role switcher** (top right badge): Client, Agency, Designer, Arbiter, Agent
- Tap cards and buttons to explore each actor's view

### Autoplay Demo
Click **"▶ Play Demo"** on the splash screen to watch the full 4-minute story:

**Act 1 — Humans:**
1. Client funds 10,000 USDC escrow to Northline Agency
2. Agency pledges 2,000 USDC to Maya Chen (designer)
3. Maya accepts, receives CYT badge (proof-of-payment visible)
4. Client disputes → Arbiter awards 50% with PayerFault
5. Settlement waterfall: Maya made whole (insurance top-up), client score drops

**Act 2 — Agents:**
1. Human funds escrow to orchestrator agent (verifier-gated)
2. Orchestrator pledges to specialist agent, pays x402 micropayments
3. Verifier approves → atomic tree settlement in seconds
4. MCP trust query: "Can I trust a 5,000 USDC pledge from this agent?"
5. Tagline: x402 is the agent economy's cash register; Conpay is its contract law

## Screen Map

| Screen | Description | Demo Act |
|--------|-------------|----------|
| Splash | Tagline + Play demo | Entry |
| World ID | Verification success | Act 1 |
| Home | Dashboard, yield ticker, escrow card | Act 1 |
| Create Escrow | Fund 10k to agency | Act 1 |
| Escrow Detail | State machine, pledges, yield split | Act 1 |
| Create Pledge | 2k to designer | Act 1 |
| Pledge Acceptance | Proof-of-payment, CYT minting | Act 1 |
| Request Release | 7-day review countdown | Act 1 |
| Dispute | Bond, reason, arbiter | Act 1 |
| Arbiter Ruling | PayeeShare bps, fault assignment | Act 1 |
| Settlement Waterfall | Juniors-first viz, insurance | Act 1 |
| Score | Tier, volume, Graph-powered history | Act 1 |
| Agents Tab | Agent economy explainer | Act 2 |
| Agent Job | Orchestrator escrow, specialist pledge, x402 | Act 2 |
| Agent Settle | Tree animation, atomic distribution | Act 2 |
| MCP Trust | Subgraph-backed trust answer | Act 2 |

## Tech Stack

- **Plain HTML/CSS/JS** — No framework, no build step, no npm dependencies
- **GitHub Pages Ready** — All relative paths, works at subdirectory URLs
- **File Protocol Compatible** — Can open directly as `file://` in browser
- **Mobile-first** — Designed for 390×844 (iPhone 13/14)
- **Dark premium fintech** — Deep charcoal, mint accent (#00d9c0), USDC blue secondary
- **Microinteractions** — Live yield ticker, waterfall animations, CYT card flip, score ticking

## Key Features

✓ Live yield counter (simulated 4.2% APY)  
✓ Role switcher (5 actors, same escrow)  
✓ Autoplay demo (full Act 1 + Act 2)  
✓ Juniors-first waterfall visualization  
✓ CYT badge animation on pledge acceptance  
✓ Settlement score drop on PayerFault  
✓ Agent tree settlement animation  
✓ Phone bezel on desktop, full-bleed on mobile  
✓ Bottom tab navigation (Home, Escrows, Score, Agents)  

## Design Notes

- **No lorem ipsum** — Real copy throughout
- **Status pills** — Funded (green), Disputed (red), Accepted (blue)
- **World ID badges** — Sybil-resistant verification markers
- **Tabular numbers** — Monospace for all amounts
- **Graph-powered** — Settlement score backed by subgraph data
- **Arc Testnet** — Plausible L2 for demo

## Keyboard Shortcuts

- `Cmd/Ctrl + P` — Start autoplay demo
- `Escape` — Stop demo

## Project Structure

```
/workspace/
├── index.html       # All screens and structure
├── styles.css       # Dark fintech styling, mobile-first
├── app.js           # Navigation, state, animations, demo autoplay
└── README.md        # This file
```

## Credits

Built for ETHOnline 2026 hackathon demo.  
Settlement asset: USDC only.  
Yield mechanism: Aave-style vault (simulated).  
Identity: World ID verification (visual only).  
Scoring: Subgraph-powered (conceptual).  

---

**Not a real dapp.** This is a clickable prototype to demonstrate the product concept and user flows. No smart contracts, no wallet, no backend.

Enjoy exploring Conpay! 🚀
