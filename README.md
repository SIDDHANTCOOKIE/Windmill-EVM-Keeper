<!-- Don't delete it -->
<div name="readme-top"></div>

<!-- Organization Logo -->
<div align="center" style="display: flex; align-items: center; justify-content: center; gap: 16px;">
  <img alt="Stability Nexus" src="public/stability.svg" width="175">
  <img src="public/todo-project-logo.svg" width="175" />
</div>

&nbsp;

<!-- Organization Name -->
<div align="center">

[![Static Badge](https://img.shields.io/badge/Stability_Nexus-/TODO-228B22?style=for-the-badge&labelColor=FFC517)](https://TODO.stability.nexus/)

<!-- Correct deployed url to be added -->

</div>

<!-- Organization/Project Social Handles -->
<p align="center">
<!-- Telegram -->
<a href="https://t.me/StabilityNexus">
<img src="https://img.shields.io/badge/Telegram-black?style=flat&logo=telegram&logoColor=white&logoSize=auto&color=24A1DE" alt="Telegram Badge"/></a>
&nbsp;&nbsp;
<!-- X (formerly Twitter) -->
<a href="https://x.com/StabilityNexus">
<img src="https://img.shields.io/twitter/follow/StabilityNexus" alt="X (formerly Twitter) Badge"/></a>
&nbsp;&nbsp;
<!-- Discord -->
<a href="https://discord.gg/YzDKeEfWtS">
<img src="https://img.shields.io/discord/995968619034984528?style=flat&logo=discord&logoColor=white&logoSize=auto&label=Discord&labelColor=5865F2&color=57F287" alt="Discord Badge"/></a>
&nbsp;&nbsp;
<!-- Blogs -->
<a href="https://viewpoints.stability.nexus/">
  <img src="https://img.shields.io/badge/Stable_Viewpoints-Articles-2ea44f?style=flat&labelColor=facc15" alt="Stable Viewpoints"></a>
&nbsp;&nbsp;
<!-- LinkedIn -->
<a href="https://www.linkedin.com/company/stability-nexus/">
  <img src="https://img.shields.io/badge/LinkedIn-black?style=flat&logo=LinkedIn&logoColor=white&logoSize=auto&color=0A66C2" alt="LinkedIn Badge"></a>
&nbsp;&nbsp;
<!-- Youtube -->
<a href="https://www.youtube.com/@StabilityNexus">
  <img src="https://img.shields.io/youtube/channel/subscribers/UCZOG4YhFQdlGaLugr_e5BKw?style=flat&logo=youtube&logoColor=white%20&logoSize=auto&labelColor=FF0000&color=FF0000" alt="Youtube Badge"></a>
</p>

---

<div align="center">
<h1>TODO: Project Name</h1>
</div>

[TODO](https://TODO.stability.nexus/) is a reusable Node.js template for building EVM keeper bots that monitor protocol state and execute automated maintenance transactions safely.

---

## Features

- **Strategy-based keeper core**: Keep protocol-specific logic isolated in `src/strategies/`.
- **Safe execution controls**: `DRY_RUN`, `MAX_ACTIONS_PER_CYCLE`, `EXPECTED_CHAIN_ID`, and confirmation controls.
- **Production-friendly runtime**: Graceful loop execution, robust error handling, and structured logs.
- **CI-ready template**: Unit tests, CI workflow, security audit workflow, and release artifact workflow included.

---

## Tech Stack

### Frontend
- N/A (headless keeper service)

### Backend
- Node.js 20+
- JavaScript (ESM)
- Ethers.js v6
- dotenv

### AI/ML (if applicable)
- N/A

### Blockchain (if applicable)
- EVM-compatible networks
- JSON-RPC providers
- Keeper signer wallet for transaction execution

---

## Project Checklist

- [x] **The protocol** (if applicable):
   - [ ] has been described and formally specified in a paper.
   - [ ] has had its main properties mathematically proven.
   - [ ] has been formally verified.
- [x] **The smart contracts** (if applicable):
   - [ ] were thoroughly reviewed by at least two knights of The Stable Order.
   - [ ] were deployed to: [Add deployment details]
- [ ] **The mobile app** (if applicable):
   - [ ] has an _About_ page containing the Stability Nexus's logo and pointing to the social media accounts of the Stability Nexus.
   - [ ] is available for download as a release in this repo.
   - [ ] is available in the relevant app stores.
- [ ] **The AI/ML components** (if applicable):
   - [ ] LLM/model selection and configuration are documented.
   - [ ] Prompts and system instructions are version-controlled.
   - [ ] Content safety and moderation mechanisms are implemented.
   - [ ] API keys and rate limits are properly managed.

---

## Repository Links

1. [Main Repository](https://github.com/StabilityNexus/TODO-EVM-Keeper)
2. [Frontend](https://github.com/StabilityNexus/TODO/tree/main/frontend) (if separate)
3. [Backend](https://github.com/StabilityNexus/TODO/tree/main/backend) (if separate)

---

## Architecture Diagram

```text
+--------------------+
|  Keeper Scheduler  |
| (interval / once)  |
+---------+----------+
          |
          v
+--------------------+        +-------------------------+
|  Strategy Selector | -----> | Protocol Strategy Logic |
| (KEEPER_STRATEGY)  |        | (getWorkItems/execute)  |
+---------+----------+        +------------+------------+
          |                                |
          v                                v
+--------------------+             +--------------------+
|   Ethers Provider  | <---------> |  Target Contract   |
+--------------------+             +--------------------+
```

---

## User Flow

```text
Start keeper -> Load config -> Validate chain -> Detect actionable items ->
(optional dry-run) -> Execute tx actions -> Wait confirmations -> Repeat
```

### Key User Journeys

1. **Template Setup**
   - Copy `.env.example` to `.env`
   - Choose strategy
   - Configure RPC and contract values

2. **Local Validation**
   - Run `npm test`
   - Run `npm run start:once`
   - Run `npm run start:dry-run`

3. **Production Loop**
   - Run `npm run start`
   - Monitor logs and tx outcomes
   - Tune cycle interval and action cap

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- EVM RPC endpoint
- Funded keeper wallet private key (for write strategies)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/StabilityNexus/TODO-EVM-Keeper.git
cd TODO-EVM-Keeper
```

#### 2. Install Dependencies

```bash
npm ci
```

#### 3. Configure Environment Variables(.env.example)

Create a `.env` file in the root directory:

```env
KEEPER_STRATEGY=noop
RPC_URL=
EXPECTED_CHAIN_ID=
PRIVATE_KEY=
CONTRACT_ADDRESS=
TX_CONFIRMATIONS=1
MAX_ACTIONS_PER_CYCLE=25
KEEPER_INTERVAL_MS=15000
DRY_RUN=false
LOG_LEVEL=info
```

Public free RPC options you can use for `RPC_URL`:

- Base Mainnet (`8453`): `https://mainnet.base.org`
- Base Sepolia (`84532`): `https://sepolia.base.org`
- BNB Smart Chain Mainnet (`56`): `https://bsc-dataseed.bnbchain.org`
- BNB Smart Chain Testnet (`97`): `https://bsc-testnet-dataseed.bnbchain.org`
- Polygon PoS Mainnet (`137`): `https://polygon-bor-rpc.publicnode.com`
- Polygon Amoy (`80002`): `https://polygon-amoy-bor-rpc.publicnode.com`

#### 4. Run the Keeper

```bash
# one cycle
npm run start:once

# continuous loop
npm run start

# no transactions, log-only
npm run start:dry-run
```

#### 5. Verify Execution

Check terminal logs for:
- network and signer initialization
- detected work items
- executed transactions (or dry-run actions)

---

## App Screenshots

Keeper runtime log examples (replace with actual screenshots or terminal captures):

|  |  |  |
|---|---|---|
| Startup logs | Dry-run cycle logs | Transaction execution logs |

---

## Contributing

Don't forget to star this repository if you find it useful.

Thank you for considering contributing to this project! Contributions are highly appreciated and welcomed. To ensure smooth collaboration, please refer to our [Contribution Guidelines](./CONTRIBUTING.md).

---

## Maintainers

TODO: Add maintainer information

- [Maintainer Name](https://github.com/username)
- [Maintainer Name](https://github.com/username)

---

## License

This project is licensed under the GNU General Public License v3.0.
See the [LICENSE](LICENSE) file for details.

---

## Thanks To All Contributors

Thanks a lot for spending your time helping TODO grow. Keep rocking.

[![Contributors](https://contrib.rocks/image?repo=StabilityNexus/TODO-EVM-Keeper)](https://github.com/StabilityNexus/TODO-EVM-Keeper/graphs/contributors)

© 2025 Stability Nexus
