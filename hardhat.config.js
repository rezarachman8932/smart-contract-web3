import 'dotenv/config';

const { RPC_URL, PRIVATE_KEY } = process.env;

export default {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      type: "edr-simulated"
    },
    sepolia: {
      type: "http",
      url: RPC_URL || "",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    }
  }
};