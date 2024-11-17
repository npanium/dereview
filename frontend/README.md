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

## 🚀 Getting Started

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