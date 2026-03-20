import test from "node:test";
import assert from "node:assert/strict";
import { KeeperRunner } from "../src/keeper-runner.js";

function createLogger() {
  return {
    debug() {},
    info() {},
    warn() {},
    error() {}
  };
}

function createBaseConfig(overrides = {}) {
  return {
    once: true,
    dryRun: false,
    strategyName: "test",
    rpcUrl: "http://127.0.0.1:8545",
    expectedChainId: null,
    privateKey: "",
    contractAddress: "",
    intervalMs: 1000,
    maxActionsPerCycle: 10,
    txConfirmations: 1,
    logLevel: "info",
    ...overrides
  };
}

function createProvider(chainId = 1n) {
  return {
    async getNetwork() {
      return { chainId };
    }
  };
}

test("runCycle respects MAX_ACTIONS_PER_CYCLE", async () => {
  const executed = [];

  const strategy = {
    name: "max-actions-test",
    requiresSigner: false,
    requiresContract: false,
    abi: [],
    async getWorkItems() {
      return [{ id: 1 }, { id: 2 }, { id: 3 }];
    },
    async executeWorkItem({ item }) {
      executed.push(item.id);
      return {
        hash: `0x${item.id}`,
        async wait() {
          return { status: 1 };
        }
      };
    },
    describeWorkItem(item) {
      return `id=${item.id}`;
    }
  };

  const runner = new KeeperRunner({
    config: createBaseConfig({ maxActionsPerCycle: 2 }),
    provider: createProvider(),
    signer: null,
    contract: null,
    strategy,
    logger: createLogger()
  });

  await runner.runCycle();
  assert.deepEqual(executed, [1, 2]);
});

test("runCycle skips execution in DRY_RUN mode", async () => {
  const strategy = {
    name: "dry-run-test",
    requiresSigner: false,
    requiresContract: false,
    abi: [],
    async getWorkItems() {
      return [{ id: 1 }];
    },
    async executeWorkItem() {
      throw new Error("Should not execute in dry run");
    },
    describeWorkItem(item) {
      return `id=${item.id}`;
    }
  };

  const runner = new KeeperRunner({
    config: createBaseConfig({ dryRun: true }),
    provider: createProvider(),
    signer: null,
    contract: null,
    strategy,
    logger: createLogger()
  });

  await runner.runCycle();
});

test("logStartup fails on chain-id mismatch", async () => {
  const strategy = {
    name: "chain-id-test",
    requiresSigner: false,
    requiresContract: false,
    abi: [],
    async getWorkItems() {
      return [];
    },
    async executeWorkItem() {
      return null;
    }
  };

  const runner = new KeeperRunner({
    config: createBaseConfig({ expectedChainId: 8453n }),
    provider: createProvider(1n),
    signer: null,
    contract: null,
    strategy,
    logger: createLogger()
  });

  await assert.rejects(() => runner.logStartup(), /Chain ID mismatch/);
});
