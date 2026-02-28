import { ethers } from "ethers";
import { config } from "./config";

export class Keeper {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(config.rpcUrl);
    this.wallet = new ethers.Wallet(config.privateKey, this.provider);
  }

  public async start(): Promise<void> {
    console.log(" Keeper started...");
    // Mask the address: show only first 6 and last 4 characters
    const maskedAddress = `${this.wallet.address.substring(0, 6)}...${this.wallet.address.substring(38)}`;
    console.log("Connected wallet:", maskedAddress);
    
    while (true) {
      try {
        await this.check();
      } catch (error) {
        console.error("Error during keeper execution:", error);
      }
      await new Promise<void>((resolve) => setTimeout(resolve, config.pollInterval));
    }
  }

  private async check(): Promise<void> {
    const blockNumber = await this.provider.getBlockNumber();
    console.log(` Current block: ${blockNumber}`);

    // Future logic:
    // - Listen to contract events
    // - Check on-chain condition
    // - Send transaction if required
  }
}
