# 🧠 Smart Contract Project

![Hardhat](https://img.shields.io/badge/Hardhat-3.0.7-yellow)
![Ethers.js](https://img.shields.io/badge/Ethers.js-6.15.0-blue)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED)
![License: MIT](https://img.shields.io/badge/License-MIT-green)

A fully containerized **Ethereum smart contract environment** built using **Hardhat** + **Ethers.js**.  
This project demonstrates how to compile, deploy, and interact with Solidity contracts — locally or in Docker — with zero installation hassles.

---

## 📘 Table of Contents

- [🚀 Features](#-features)
- [🧩 Project Structure](#-project-structure)
- [⚙️ Installation Options](#️-installation-options)
  - [🧱 Local Node.js Setup](#-option-1--local-nodejs-setup)
  - [🐋 Docker Setup](#-option-2--docker-setup-no-installation-required)
- [🧪 Example Contract: Counter.sol](#-example-contract-countersol)
- [🧰 Environment Variables](#-environment-variables)
- [🧾 Useful npm Scripts](#-useful-npm-scripts)
- [🧱 Docker Internals](#-docker-internals-for-advanced-users)
- [🧭 Troubleshooting](#-troubleshooting)
- [🧑‍💻 Contributors](#-contributors)
- [🪙 License](#-license)

---

## 🚀 Features

✅ **Hardhat + Ethers.js** integration using modern `import` syntax  
✅ **Fully Dockerized** – run anywhere, no setup needed  
✅ **Supports Solidity 0.8.20+**    
✅ **Cross-platform (Windows / macOS / Linux)**  
✅ **.env support** for private keys & RPC endpoints  

---

## 🧩 Project Structure

```
smart_contract/
│
├─ contracts/
│   └─ Counter.sol            # Solidity smart contract
│
├─ scripts/
│   ├─ deploy.js              # Deploy to network
│   ├─ interact.js            # Interact with deployed contract
│   └─ readChain.js           # Read blockchain state
│   └─ showAddress.js         # Show your wallet address
│
├─ hardhat.config.js          # Hardhat config
├─ package.json               # Dependencies
├─ Dockerfile                 # Docker build file
├─ docker-compose.yml         # Compose for easy run
├─ README.md                  # Project information
├─ test.http                  # Test our endpoint locally
├─ .env                       # Environment variables
└─ .env.example               # Example environment config
```

---

## ⚙️ Installation Options

You can run this project in **two ways** 👇

---

### 🧱 Option 1 — Local Node.js Setup

> Recommended only if you already have Node.js and npm installed.

```bash
# 1️⃣ Install dependencies
npm install

# 2️⃣ Compile contracts
npx hardhat compile
```

---

### 🐋 Option 2 — Docker Setup (No Installation Required)

> Easiest way to run — no Node.js or Hardhat needed locally.

#### Step 1 — Build the container
```bash
docker compose build
```

#### Step 2 — Run all tests
```bash
docker compose up
```

#### Step 3 — Run individual commands
```bash
# Compile contracts
docker compose run smart-contract npx hardhat compile

# Deploy to testnet
docker compose run smart-contract node scripts/deploy.js

# Interact with contract
docker compose run smart-contract node scripts/interact.js
```

---

## 🧪 Example Contract: `Counter.sol`

A minimal example that counts and accepts ETH payments.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Counter {
    uint256 public count;
    uint256 public totalReceived;

    constructor(uint256 _start) {
        count = _start;
    }

    function increment() public {
        count++;
    }

    function incrementWithPayment() public payable {
        require(msg.value > 0, "Must send ETH to use this function");
        count++;
        totalReceived += msg.value;
    }

    receive() external payable {
        totalReceived += msg.value;
    }

    function getTotalReceived() public view returns (uint256) {
        return totalReceived;
    }
}
```

---

## 🧰 Environment Variables

All sensitive info like RPC endpoints and private keys go in `.env`.

### Example `.env.example`
```bash
RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=YOUR_PRIVATE_KEY
CONTRACT_ADDRESS=0xAbCd1234Ef567890abcdef1234567890abcdef12
SAMPLE_ADDRESS=0x0000000000000000000000000000000000000000
SAMPLE_TX=0x
```

> ⚠️ Don’t commit `.env` — keep it local.  
> Instead, use `.env.example` to share environment templates.

---

## 🧾 Useful npm Scripts

| Command | Description |
|----------|-------------|
| `npm run compile` | Compile Solidity contracts |
| `npm run deploy` | Deploy the contract |
| `npm run read` | Read blockchain data |
| `npm run interact` | Interact with deployed contract |

---

## 🧱 Docker Internals (for advanced users)

| File | Purpose |
|------|----------|
| **Dockerfile** | Defines the Node.js + Hardhat build image |
| **docker-compose.yml** | Manages the container lifecycle |
| **Volumes** | Mounts your project into the container (`/app`) |
| **Commands** | Easily override commands (compile/test/deploy) |

### Example Custom Run
```bash
docker compose run smart-contract npx hardhat node
```

---

## 🧭 Troubleshooting

| Problem | Cause | Fix |
|----------|--------|-----|
| `Nothing to compile` | Contract already compiled or misplaced | Ensure `.sol` files are in `/contracts` |
| `MODULE_NOT_FOUND: hardhat/internal/cli/cli.js` | Incomplete install | Delete `node_modules` and run `npm install` |
| `Cannot find module 'ethers'` | Dependency missing | Run `npm install ethers` |
| Docker permission denied | Docker Desktop access issue | Run Docker Desktop as admin/root |

---

## 🧑‍💻 Contributors

- **Reza Rachman** — Project Owner  
- 💡 Open for contributions: fork, improve, and submit a PR!

---

## 🪙 License

MIT © 2025 — Free for personal and commercial use.
