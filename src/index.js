import "dotenv/config";
import { ethers } from "ethers";

const CONTRACT_ABI = [
  "function getActiveOrderIds() view returns (uint256[])",
  "function getOrder(uint256 orderId) view returns (tuple(address creator,bool isBuy,uint256 amount,uint256 startPrice,int256 priceSlope,uint256 startTime,uint256 stopPrice,uint256 expiryTime,uint256 escrowedEth,bool active))",
  "function expireOrder(uint256 orderId)"
];

const RPC_URL = process.env.RPC_URL ?? "http://127.0.0.1:8545";
const PRIVATE_KEY = process.env.PRIVATE_KEY ?? "";
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS ?? "";
const INTERVAL_MS = Number(process.env.INTERVAL_MS ?? "15000");

if (!PRIVATE_KEY) {
  console.error("Missing PRIVATE_KEY in environment.");
  process.exit(1);
}

if (!CONTRACT_ADDRESS) {
  console.error("Missing CONTRACT_ADDRESS in environment.");
  process.exit(1);
}

const provider = new ethers.JsonRpcProvider(RPC_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

async function runCycle() {
  const now = Math.floor(Date.now() / 1000);
  const activeIds = await contract.getActiveOrderIds();

  if (activeIds.length === 0) {
    console.log("[keeper] no active orders");
    return;
  }

  for (const id of activeIds) {
    const order = await contract.getOrder(id);
    const isExpired = order.active && order.expiryTime > 0n && BigInt(now) >= order.expiryTime;

    if (!isExpired) continue;

    try {
      console.log(`[keeper] expiring order #${id.toString()} ...`);
      const tx = await contract.expireOrder(id);
      await tx.wait();
      console.log(`[keeper] expired order #${id.toString()} tx=${tx.hash}`);
    } catch (err) {
      const msg = err?.shortMessage ?? err?.reason ?? err?.message ?? "unknown";
      console.warn(`[keeper] failed to expire #${id.toString()} -> ${msg}`);
    }
  }
}

async function main() {
  const once = process.argv.includes("--once");

  const network = await provider.getNetwork();
  console.log(`[keeper] rpc=${RPC_URL}`);
  console.log(`[keeper] chainId=${network.chainId}`);
  console.log(`[keeper] contract=${CONTRACT_ADDRESS}`);
  console.log(`[keeper] signer=${signer.address}`);

  if (once) {
    await runCycle();
    return;
  }

  await runCycle();
  setInterval(async () => {
    try {
      await runCycle();
    } catch (err) {
      const msg = err?.shortMessage ?? err?.reason ?? err?.message ?? "unknown";
      console.warn(`[keeper] cycle error -> ${msg}`);
    }
  }, INTERVAL_MS);
}

main().catch((err) => {
  const msg = err?.shortMessage ?? err?.reason ?? err?.message ?? "unknown";
  console.error(`[keeper] fatal -> ${msg}`);
  process.exit(1);
});
