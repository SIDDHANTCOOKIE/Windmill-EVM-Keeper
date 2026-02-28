<!-- Don't delete it -->
<div name="readme-top"></div>

<!-- Organization Logo -->
<div align="center" style="display: flex; align-items: center; justify-content: center; gap: 16px;">
  <img alt="Stability Nexus" src="public/stability.svg" width="175">
  <img src="public/aossie-logo.svg" width="175" />
</div>

&nbsp;

<!-- Organization Name -->
<div align="center">

[![Static Badge](https://img.shields.io/badge/Stability_Nexus-Keepers-228B22?style=for-the-badge&labelColor=FFC517)](https://stability.nexus/)

</div>

<!-- Organization/Project Social Handles -->
<p align="center">
<a href="https://t.me/StabilityNexus">
<img src="https://img.shields.io/badge/Telegram-black?style=flat&logo=telegram&logoColor=white&logoSize=auto&color=24A1DE" alt="Telegram Badge"/></a>
&nbsp;&nbsp;
<a href="https://x.com/StabilityNexus">
<img src="https://img.shields.io/twitter/follow/StabilityNexus" alt="X Badge"/></a>
&nbsp;&nbsp;
<a href="https://discord.gg/YzDKeEfWtS">
<img src="https://img.shields.io/discord/995968619034984528?style=flat&logo=discord&logoColor=white&logoSize=auto&label=Discord&labelColor=5865F2&color=57F287" alt="Discord Badge"/></a>
&nbsp;&nbsp;
<a href="https://news.stability.nexus/">
  <img src="https://img.shields.io/badge/Medium-black?style=flat&logo=medium&logoColor=black&logoSize=auto&color=white" alt="Medium Badge"></a>
</p>

---

<div align="center">
<h1>EVM Keeper Template</h1>
</div>

This repository is the official template for building EVM keepers: long-running workers that monitor smart-contract state and execute maintenance transactions safely.

Use this before adding protocol-specific logic. The template gives you a production-ready baseline for runtime behavior, strategy isolation, testing, and CI/CD.

---

## What This Template Includes

- Strategy-based keeper runtime in `src/` (protocol-agnostic core + pluggable strategies)
- Strict environment parsing with safe defaults (`src/config.js`)
- Graceful shutdown and cycle-level failure isolation (`src/keeper-runner.js`)
- Dry-run mode and max-actions safety caps
- Starter strategies:
  - `noop` for smoke checks
  - `contract-task-template` for real on-chain work
- Basic unit tests with Node test runner (`test/`)
- GitHub workflows for CI, security checks, and release artifacts

---

## Repository Layout

```text
.
├── src/
│   ├── index.js
│   ├── config.js
│   ├── keeper-runner.js
│   ├── logger.js
│   └── strategies/
│       ├── index.js
│       ├── noop.strategy.js
│       └── contract-task.strategy.js
├── test/
├── .env.example
└── .github/workflows/
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- RPC endpoint for your target EVM network
- Keeper wallet funded with native gas token

### 1. Install Dependencies

```bash
npm ci
```

### 2. Create Environment File

```bash
cp .env.example .env
```

Then set your RPC endpoint in `.env`:

```env
RPC_URL=https://mainnet.base.org
```

### 3. Select Strategy

Default strategy is `noop` (safe, no transactions).

To build a real keeper:

1. Edit `src/strategies/contract-task.strategy.js`
2. Replace template ABI
3. Implement:
   - `getWorkItems(...)`
   - `executeWorkItem(...)`
4. Set `KEEPER_STRATEGY=contract-task-template` in `.env`

### 4. Run

```bash
# one cycle only
npm run start:once

# continuous loop
npm run start

# no transactions, log-only execution
npm run start:dry-run
```

---

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `KEEPER_STRATEGY` | No | Strategy key (`noop` or `contract-task-template`) |
| `RPC_URL` | Yes | EVM JSON-RPC endpoint |
| `EXPECTED_CHAIN_ID` | No | Safety check against wrong network |
| `PRIVATE_KEY` | For tx strategies | Keeper signer private key |
| `CONTRACT_ADDRESS` | For contract strategies | Target contract address |
| `TX_CONFIRMATIONS` | No | Required confirmations per transaction (default `1`) |
| `MAX_ACTIONS_PER_CYCLE` | No | Per-cycle execution cap (default `25`) |
| `KEEPER_INTERVAL_MS` | No | Poll interval in milliseconds (default `15000`) |
| `DRY_RUN` | No | `true` to skip tx submission |
| `LOG_LEVEL` | No | `debug`, `info`, `warn`, `error` |

---

## Public Free RPC Endpoints

Use these public endpoints as starter options for local development and testing. For production keepers, use your own provider with SLA and monitoring.

| Network | Chain ID | Public RPC |
| --- | --- | --- |
| Base Mainnet | `8453` | `https://mainnet.base.org` |
| Base Sepolia | `84532` | `https://sepolia.base.org` |
| BNB Smart Chain Mainnet | `56` | `https://bsc-dataseed.bnbchain.org` |
| BNB Smart Chain Testnet | `97` | `https://bsc-testnet-dataseed.bnbchain.org` |
| Polygon PoS Mainnet | `137` | `https://polygon-bor-rpc.publicnode.com` |
| Polygon Amoy | `80002` | `https://polygon-amoy-bor-rpc.publicnode.com` |

---

## Keeper Design Guidelines

When adapting this template for a project keeper:

1. Keep the runner generic. Put protocol logic only inside strategy modules.
2. Make `getWorkItems()` deterministic and cheap (view calls only).
3. Make `executeWorkItem()` idempotent when possible.
4. Keep `MAX_ACTIONS_PER_CYCLE` conservative to avoid gas spikes.
5. Add tests for selection logic and failure paths before shipping.
6. Start with `DRY_RUN=true` in staging or testnet.

---

## CI and Automation

The template includes:

- `ci.yml`: install + test on pushes and PRs
- `security-audit.yml`: dependency review and npm audit
- `release-artifacts.yml`: tag-based artifact packaging

---

## Versioning

- Use semantic versioning in `VERSION`
- Create tags like `v1.2.3` for release artifact publishing

---

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a PR.

---

## License

This project is licensed under GNU GPL v3.0. See [LICENSE](LICENSE).

---

© 2026 The Stable Order.
