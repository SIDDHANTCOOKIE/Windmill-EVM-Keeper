# Windmill EVM Keeper MVP

Lightweight keeper for Windmill MVP contracts.

## Scope

This keeper only handles **liveness cleanup**:

- polls active orders
- checks `expiryTime`
- calls `expireOrder(orderId)` when an order has expired

It does **not** compute prices off-chain and does **not** capture surplus.

## Prerequisites

- Node.js 20+
- RPC endpoint
- funded keeper private key on target chain
- deployed `AuctionOrderBookPrototype` contract address

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure env:

```bash
cp .env.example .env
```

Fill values in `.env`:

- `RPC_URL`
- `PRIVATE_KEY`
- `CONTRACT_ADDRESS`
- `INTERVAL_MS` (optional)

## Run

Continuous loop:

```bash
npm start
```

Run one cycle only:

```bash
npm run start:once
```

## Notes

- This keeper is intentionally minimal for MVP demonstration.
- Matching between buy/sell order pairs is not implemented here yet.
