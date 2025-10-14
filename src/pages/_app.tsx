// pages/_app.tsx
import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { config } from '@/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // <-- 1. Import

import type { AppProps } from 'next/app';
import Head from 'next/head';

// 2. Stwórz instancję klienta POZA komponentem
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    // 3. Owiń wszystko w QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <RainbowKitProvider>
          <Head>
            <title>Generator Kontraktów NFT</title>
          </Head>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}