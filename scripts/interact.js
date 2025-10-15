import 'dotenv/config';
import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const rpc = process.env.RPC_URL;
  const pk = process.env.PRIVATE_KEY;
  const contractAddress = process.env.CONTRACT_ADDRESS;

  if (!rpc || !pk || !contractAddress) {
    console.error("Set RPC_URL, PRIVATE_KEY, and CONTRACT_ADDRESS in .env");
    process.exit(1);
  }

  const provider = new ethers.JsonRpcProvider(rpc);
  const wallet = new ethers.Wallet(pk, provider);

  // Load artifact
  const artifactPath = path.join(__dirname, "..", "artifacts", "contracts", "Counter.sol", "Counter.json");
  if (!fs.existsSync(artifactPath)) {
    console.error("Contract artifact not found. Run `npx hardhat compile` first.");
    process.exit(1);
  }

  const artifact = JSON.parse(fs.readFileSync(artifactPath));
  const abi = artifact.abi;
  const contract = new ethers.Contract(contractAddress, abi, wallet);

  // 1. Read-only call
  const current = await contract.count();
  console.log("Current count:", current.toString());

  // 2. Send transaction (state change)
  const tx = await contract.incrementWithPayment({value: ethers.parseEther("0.01")});
  console.log("Sent tx hash:", tx.hash);
  const receipt = await tx.wait();
  console.log("Tx confirmed in block", receipt.blockNumber);
  const newCount = await contract.count();
  console.log("New count:", newCount.toString());

  // 3. Total Received
  const totalReceived = await contract.getTotalReceived();
  console.log("Total Received:",  totalReceived.toString());

  // 4. Call decrement function
  const tx2 = await contract.decrement(1);
  console.log("Total Reduced:",  tx2);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});