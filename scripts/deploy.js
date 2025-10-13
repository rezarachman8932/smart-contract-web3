import 'dotenv/config';
import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';

async function main() {
  const rpc = process.env.RPC_URL;
  const pk = process.env.PRIVATE_KEY;

  if (!rpc || !pk) {
    console.error("❌ Missing RPC_URL or PRIVATE_KEY in .env");
    process.exit(1);
  }

  // Create provider & wallet
  const provider = new ethers.JsonRpcProvider(rpc);
  const wallet = new ethers.Wallet(pk, provider);

  console.log("👤 Deploying with wallet:", wallet.address);

  // Load compiled contract artifact
  const artifactPath = path.resolve(
    "artifacts/contracts/Counter.sol/Counter.json"
  );

  if (!fs.existsSync(artifactPath)) {
    console.error("❌ Could not find Counter.json. Run `npx hardhat compile` first.");
    process.exit(1);
  }

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  const abi = artifact.abi;
  const bytecode = artifact.bytecode;

  // ✅ Create ContractFactory manually (since we’re using plain ethers)
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);

  console.log("🚀 Deploying Counter contract...");
  const initialValue = 0; 
  const contract = await factory.deploy(initialValue);

  console.log("⏳ Waiting for deployment confirmation...");
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log(`✅ Contract deployed at: ${address}`);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});