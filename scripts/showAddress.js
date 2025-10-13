import 'dotenv/config';
import { ethers } from 'ethers';

const pk = process.env.PRIVATE_KEY;

if (!pk) {
  console.error("❌ PRIVATE_KEY missing in .env");
  process.exit(1);
}

const wallet = new ethers.Wallet(pk);
console.log("👛 Your wallet address is:", wallet.address);