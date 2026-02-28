import test from "node:test";
import assert from "node:assert/strict";
import { loadConfig, parseBoolean, parseInteger } from "../src/config.js";

test("parseBoolean handles true and false values", () => {
  assert.equal(parseBoolean("true", false), true);
  assert.equal(parseBoolean("0", true), false);
});

test("parseBoolean throws on invalid value", () => {
  assert.throws(() => parseBoolean("sometimes", true), /Invalid boolean value/);
});

test("parseInteger validates integer and minimum", () => {
  assert.equal(
    parseInteger("42", 10, { min: 1, variable: "TEST_INTEGER" }),
    42
  );
  assert.throws(
    () => parseInteger("0", 10, { min: 1, variable: "TEST_INTEGER" }),
    /greater than or equal/
  );
});

test("loadConfig reads defaults", () => {
  const config = loadConfig({ env: {}, argv: [] });
  assert.equal(config.strategyName, "noop");
  assert.equal(config.once, false);
  assert.equal(config.dryRun, false);
  assert.equal(config.intervalMs, 15000);
  assert.equal(config.maxActionsPerCycle, 25);
});

test("loadConfig supports cli overrides", () => {
  const config = loadConfig({
    env: {
      KEEPER_STRATEGY: "noop",
      DRY_RUN: "false",
      KEEPER_INTERVAL_MS: "15000"
    },
    argv: ["--once", "--dry-run", "--strategy=contract-task-template", "--interval-ms=9000"]
  });

  assert.equal(config.once, true);
  assert.equal(config.dryRun, true);
  assert.equal(config.strategyName, "contract-task-template");
  assert.equal(config.intervalMs, 9000);
});
