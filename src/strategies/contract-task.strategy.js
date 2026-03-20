const TEMPLATE_ABI = [
  "function getActionableIds() view returns (uint256[])",
  "function performAction(uint256 id)"
];

export function createContractTaskTemplateStrategy() {
  return {
    name: "contract-task-template",
    requiresSigner: true,
    requiresContract: true,
    abi: TEMPLATE_ABI,

    async getWorkItems({ logger }) {
      logger.debug(
        "contract-task-template strategy is loaded. Implement getWorkItems() for your protocol."
      );

      // TODO: Replace this with protocol-specific detection logic.
      // Example:
      // const ids = await contract.getActionableIds();
      // return ids.map((id) => ({ id }));
      return [];
    },

    async executeWorkItem() {
      throw new Error(
        "contract-task-template executeWorkItem() is not implemented. Replace this method with your project-specific transaction logic."
      );
    },

    describeWorkItem(item) {
      if (item?.id !== undefined) {
        return `id=${item.id.toString()}`;
      }

      return "unidentified-item";
    }
  };
}
