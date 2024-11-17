# DeReview 🔬

DeReview is a decentralized platform revolutionizing scientific peer review by connecting researchers with expert reviewers through blockchain technology and decentralized storage solutions.

## 🎯 Mission

To create a transparent, efficient, and incentivized peer review system that:
- Accelerates scientific progress through faster, quality peer reviews
- Fairly compensates reviewers for their expertise and time
- Ensures secure and permanent storage of research papers
- Builds verifiable academic reputation on-chain

## ✨ Key Features

### For Researchers
- Submit papers for peer review with customizable bounties
- Store research papers permanently on IPFS via Akave
- Set specific expertise requirements for reviewers
- Track review status in real-time

### For Reviewers
- Earn ETH rewards for quality reviews
- Build on-chain reputation through ReviewerSBT (Soul Bound Tokens)
- Filter papers by expertise areas
- Access papers securely through decentralized storage

## 🛠 Technology Stack

- **Frontend**: Next.js 14, TailwindCSS, shadcn/ui
- **Authentication**: Privy
- **Blockchain**: Base (Sepolia Testnet)
- **Storage**: IPFS (via Akave)
- **Identity**: Coinbase's OnchainKit
- **Wallet Management**: wagmi

## 🔗 Smart Contracts

The platform utilizes three main smart contracts:
1. **ReviewPoolFactory**: Creates and manages review pools for papers
2. **ReviewPool**: Handles individual paper reviews and bounty distribution
3. **ReviewerSBT**: Issues and manages reviewer credentials and expertise

## 🚀 Getting Started on the frontend

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
```env
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
NEXT_PUBLIC_CDP_PROJECT_ID=your_cdp_project_id
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
NEXT_PUBLIC_REVIEWER_SBT_ADDRESS=your_sbt_contract_address
NEXT_PUBLIC_REVIEW_POOL_FACTORY_ADDRESS=your_factory_contract_address
```

4. Run the development server:
```bash
npm run dev
```

## 💡 How It Works

1. **Paper Submission**
   - Researchers upload papers to IPFS
   - Create a review pool with bounty
   - Specify required reviewer expertise

2. **Review Process**
   - Qualified reviewers apply for review opportunities
   - Selected reviewers submit reviews through the platform
   - Reviews are stored on-chain with IPFS references

3. **Reward Distribution**
   - Bounties are automatically distributed upon review completion
   - Reviewers earn reputation tokens (SBTs)
   - Platform maintains transparency through blockchain

## Smart contracts

# Decentralized Paper Review System

A blockchain-based system for managing academic paper reviews using Soulbound Tokens (SBTs) for reviewer credentials and specialized review pools for paper submissions.

## Overview

This system consists of three main components:

1. **ReviewerSBT**: A Soulbound Token implementation that represents reviewer credentials
2. **ReviewPool**: Individual pools for paper reviews
3. **ReviewPoolFactory**: Factory contract for creating and managing review pools

## Core Features

### Reviewer Credentials (SBT)
- Non-transferable tokens representing reviewer expertise
- Expertise categorization through tag types
- Burn authorization system following ERC-5484 standard
- Managed by system administrators

### Review Pools
- Individual pools created for each paper submission
- Configurable number of required reviewers
- Automatic reward distribution system
- Tag-based reviewer matching
- Review storage and tracking

### Factory System
- Deterministic pool creation
- Pool tracking and management
- Address-based pool lookup

## Smart Contract Architecture

### ReviewerSBT
- ERC-5484 based implementation (Mutual consent SBT)
- Tag type management system
- Burn authorization levels:
  - Issuer Only
  - Owner Only
  - Both
  - Neither

### ReviewPool
- Initializable contract for individual review instances
- Features:
  - Reviewer slot management
  - Review submission tracking
  - Automatic reward distribution
  - Review progress monitoring

### ReviewPoolFactory
- Minimal proxy pattern for efficient pool deployment
- Deterministic addressing
- Pool tracking and lookup functionality

## Usage

### Creating a Reviewer Profile
1. System admin mints a ReviewerSBT to the reviewer's address
2. Tag types are assigned to represent expertise areas

### Submitting a Paper for Review
1. Create a new review pool through the factory
2. Specify:
   - Required number of reviewers
   - Paper URI
   - Tag types for required expertise
3. Fund the pool with review rewards

### Conducting Reviews
1. Qualified reviewers join the pool
2. Submit reviews
3. Claim rewards upon successful submission

## Development

### Prerequisites
- Foundry
- Solidity ^^0.8.0
- OpenZeppelin Contracts 5.0.2

### Deployments
- Base Sepolia
    - ReviewPoolFactory: `0xcFd626125B6876F194dAAB1a69cB53F990b2c6B6`
    - ReviewPoolFactory in Blockscout: [Link](https://base-sepolia.blockscout.com/address/0xcFd626125B6876F194dAAB1a69cB53F990b2c6B6/contracts)
    - ReviewPool: `0xA57346ab3b59BCDB725Bc4619574B4AaFeE1BCd6`
    - ReviewPool in Blockscout: [Link](https://base-sepolia.blockscout.com/address/0xA57346ab3b59BCDB725Bc4619574B4AaFeE1BCd6/contracts)
    - ReviewerSBT: `0x66f3e4454bC44Cc4f36f7A25bD215024E26d296B`
    - ReviewerSBT in Blockscout: [Link](https://base-sepolia.blockscout.com/address/0x66f3e4454bC44Cc4f36f7A25bD215024E26d296B/contracts)

- Polygon PoS
    - ReviewPoolFactory: `0xD185b5d3C6073ea2B0770fE29aC02fB5FB0A5d8D`
    - ReviewPoolFactory in Blockscout: [Link](https://polygon-amoy.blockscout.com/address/0x389157cd5E7Dee4f4ED2fD1296f84efD76f8b5C1/contracts)
    - ReviewPool: `0x897FC220361eC4f65116De2B6CB3Ff4e4fBEB2F3`
    - ReviewPool in Blockscout: [Link](https://polygon-amoy.blockscout.com/address/0xac0C516BDA6834556A0C7499280f20507eb6f59b/contracts)
    - ReviewerSBT: `0xE87c040fB671EF862c1b2B431b19A4f1599064B4`
    - ReviewerSBT in Blockscout: [Link](https://polygon-amoy.blockscout.com/address/0x7e41af17346bD0cd23998A71509DFD20938f50A1/contracts)

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for more details.

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🌟 Powered By

- Base
- Filecoin
- Privy
- Coinbase
- Blockscout
- Polygon
