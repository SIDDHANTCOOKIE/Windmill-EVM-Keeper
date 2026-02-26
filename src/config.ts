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
export const config = {
  rpcUrl: requireEnv("RPC_URL"),
  privateKey: requireEnv("PRIVATE_KEY"),
  pollInterval: (() => {
    const raw = process.env.POLL_INTERVAL ?? "10000";
    const value = Number.parseInt(raw, 10);
    if (!Number.isFinite(value) || value <= 0) {
      throw new Error("POLL_INTERVAL must be a positive integer in milliseconds");
    }
    return value;
  })()
};
};
