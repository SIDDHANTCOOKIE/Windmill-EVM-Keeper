import dotenv from "dotenv";

dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const config = {
  rpcUrl: requireEnv("RPC_URL"),
  privateKey: requireEnv("PRIVATE_KEY"),
  pollInterval: parseInt(process.env.POLL_INTERVAL || "10000", 10)
};
