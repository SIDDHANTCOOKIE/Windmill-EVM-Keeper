import { Keeper } from "./keeper";

async function main() {
  const keeper = new Keeper();
  await keeper.start();
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
