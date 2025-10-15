import { mainnet, sepolia, polygon, optimism, arbitrum, base } from 'wagmi/chains';

export const chainConfig: Record<number, { name: string; explorerUrl: string }> = {
  [mainnet.id]: { name: 'Ethereum', explorerUrl: 'https://etherscan.io' },
  [sepolia.id]: { name: 'Sepolia', explorerUrl: 'https://sepolia.etherscan.io' },
  [polygon.id]: { name: 'Polygon', explorerUrl: 'https://polygonscan.com' },
  [optimism.id]: { name: 'Optimism', explorerUrl: 'https://optimistic.etherscan.io' },
  [arbitrum.id]: { name: 'Arbitrum', explorerUrl: 'https://arbiscan.io' },
  [base.id]: { name: 'Base', explorerUrl: 'https://basescan.org' },
};

export const getChainInfo = (chainId: number | undefined) => {
  if (!chainId || !chainConfig[chainId]) {
    return { name: 'Nieznana Sieć', explorerUrl: 'https://etherscan.io' };
  }
  return chainConfig[chainId];
};