# Institutional Review dApp

A decentralized application (dApp) for reviewing institutions built on the Ethereum blockchain using React.js and Solidity.

## Features

- **Institution Management**: Add and manage institutions with detailed information
- **Review System**: Submit and view reviews with star ratings
- **Blockchain Integration**: All data stored on the blockchain for transparency
- **Wallet Connection**: MetaMask integration for Web3 authentication
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Search & Filter**: Advanced filtering by category and search functionality

## Tech Stack

- **Frontend**: React.js, TypeScript, Tailwind CSS
- **Blockchain**: Ethereum, Solidity
- **Web3**: ethers.js, MetaMask
- **Icons**: Lucide React

## Smart Contract

The smart contract (`InstitutionalReview.sol`) includes:

- Institution registration and management
- Review submission with rating system
- Data retrieval functions
- Owner permissions and access control
- Rating calculations and aggregations

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Deploy Smart Contract**
   - Deploy the `InstitutionalReview.sol` contract to your preferred Ethereum network
   - Update the `CONTRACT_ADDRESS` in `src/hooks/useWeb3.ts`

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Connect Wallet**
   - Install MetaMask browser extension
   - Connect your wallet to interact with the dApp

## Contract Functions

### Institution Management
- `addInstitution()`: Register a new institution
- `getAllInstitutions()`: Get all institutions
- `getInstitution()`: Get specific institution details
- `toggleInstitutionStatus()`: Enable/disable institution

### Review Management
- `addReview()`: Submit a review for an institution
- `getReview()`: Get specific review details
- `getInstitutionReviews()`: Get all reviews for an institution
- `getUserReviews()`: Get all reviews by a user
- `getAverageRating()`: Calculate average rating for an institution

## Architecture

```
src/
├── components/          # React components
│   ├── Header.tsx
│   ├── InstitutionCard.tsx
│   ├── ReviewCard.tsx
│   ├── AddInstitutionModal.tsx
│   ├── AddReviewModal.tsx
│   ├── ReviewsModal.tsx
│   └── SearchAndFilter.tsx
├── hooks/              # Custom React hooks
│   └── useWeb3.ts
├── types/              # TypeScript definitions
│   ├── index.ts
│   └── global.d.ts
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.