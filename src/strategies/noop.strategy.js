export function createNoopStrategy() {
  return {
    name: "noop",
    requiresSigner: false,
    requiresContract: false,
    abi: [],
    async getWorkItems() {
      return [];
    },
    async executeWorkItem() {
      return null;
    },
    describeWorkItem() {
      return "noop";
    }
  };
}
