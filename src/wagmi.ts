// src/wagmi.ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { http, createConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} from 'wagmi/chains';


const chains = [mainnet, polygon, optimism, arbitrum, base, sepolia] as const;


const { connectors } = getDefaultWallets({
  appName: 'NFT Contract Generator App',
  projectId: 'a728b5819ee7d003535812f57f75bfb0',
});

export const config = createConfig({
  chains: chains,
  connectors,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
  },
});