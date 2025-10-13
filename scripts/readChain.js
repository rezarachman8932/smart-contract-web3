import 'dotenv/config';
import { ethers } from 'ethers';

async function main() {
  const rpc = process.env.RPC_URL;
  if (!rpc) {
    console.error("Set RPC_URL in .env");
    process.exit(1);
  }
  const provider = new ethers.JsonRpcProvider(rpc);

  // 1. Get balance of an address
  const sampleAddress = process.env.SAMPLE_ADDRESS;
  const bal = await provider.getBalance(sampleAddress);
  console.log("Balance (wei):", bal.toString());
  console.log("Balance (ETH):", Number(ethers.formatEther(bal)));

  // 2. Latest block
  const block = await provider.getBlock("latest");
  console.log("Latest block number:", block.number);
  console.log("Timestamp:", new Date(block.timestamp * 1000).toISOString());

  // 3. Fetch an example transaction by hash (if provided)
  const txHash = process.env.SAMPLE_TX;
  if (txHash) {
    const tx = await provider.getTransaction(txHash);
    console.log("Transaction:", tx);
  } else {
    console.log("No SAMPLE_TX in .env — skipping tx fetch");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});