import { createContractTaskTemplateStrategy } from "./contract-task.strategy.js";
import { createNoopStrategy } from "./noop.strategy.js";

const STRATEGY_FACTORIES = new Map([
  ["noop", createNoopStrategy],
  ["contract-task-template", createContractTaskTemplateStrategy]
]);

export function listStrategies() {
  return Array.from(STRATEGY_FACTORIES.keys());
}

export function createStrategy(name) {
  const normalized = name.trim().toLowerCase();
  const factory = STRATEGY_FACTORIES.get(normalized);

  if (!factory) {
    throw new Error(
      `Unknown keeper strategy "${name}". Available strategies: ${listStrategies().join(", ")}`
    );
  }

  return factory();
}
