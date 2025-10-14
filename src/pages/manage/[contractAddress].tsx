// src/pages/manage/[contractAddress].tsx

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { DynamicNFTAbi } from '@/utils/DynamicNFTAbi';
import { type Address } from 'viem';
import Link from 'next/link';

export default function ManageContract() {
  const router = useRouter();
  const { contractAddress } = router.query;
  const { isConnected } = useAccount();

  const [mintTo, setMintTo] = useState<Address | ''>('');
  const [quantity, setQuantity] = useState('1');

  const { data: hash, error, isPending, writeContract } = useWriteContract();
  
  // ZMIANA: Opcja 'enabled' jest teraz wewnątrz obiektu 'query'
  const { data: totalSupply } = useReadContract({
    address: contractAddress as Address,
    abi: DynamicNFTAbi,
    functionName: 'nextTokenId',
    query: {
      enabled: !!contractAddress, 
    },
  });

  const handleMint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contractAddress || !mintTo) return;
    writeContract({
      address: contractAddress as Address,
      abi: DynamicNFTAbi,
      functionName: 'mint',
      args: [mintTo, BigInt(quantity)],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  
  if (!contractAddress) return <p>Ładowanie...</p>;

  return (
    <main style={styles.main}>
      <div style={styles.header}>
        <h1 style={styles.title}>Zarządzaj Kontraktem</h1>
        <ConnectButton />
      </div>
      <div style={styles.container}>
        <p>Adres kontraktu: <strong>{contractAddress}</strong></p>
        <p>Wymintowano do tej pory: <strong>{totalSupply?.toString() ?? '...'}</strong></p>
        <hr style={{margin: '2rem 0'}} />
        <h2 style={styles.subtitle}>Wymintuj nowe tokeny</h2>
        {isConnected ? (
          <form onSubmit={handleMint} style={styles.form}>
            <label htmlFor="mintTo" style={styles.label}>Adres (dla kogo mintować)</label>
            <input id="mintTo" type="text" value={mintTo} onChange={(e) => setMintTo(e.target.value as Address)} placeholder="0x..." style={styles.input} required />
            <label htmlFor="quantity" style={styles.label}>Ilość</label>
            <input id="quantity" type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} style={styles.input} required />
            <button type="submit" style={styles.button} disabled={isPending || isConfirming}>
              {isPending ? 'Czekam na podpis...' : isConfirming ? 'Potwierdzanie...' : 'Mintuj'}
            </button>
          </form>
        ) : (
          <p>Połącz portfel właściciela, aby zarządzać kontraktem.</p>
        )}
        <div style={styles.status}>
          {hash && <p>Hash transakcji: <a href={`https://sepolia.etherscan.io/tx/${hash}`} target='_blank' rel='noopener noreferrer'>{hash}</a></p>}
          {isConfirming && <p>Potwierdzanie transakcji...</p>}
          {isConfirmed && <p style={{color: 'green'}}>✅ Sukces! Tokeny zostały wymintowane.</p>}
          {error && <p style={{ color: 'red' }}>Błąd: {error.message}</p>}
        </div>
      </div>
      <Link href="/" style={styles.backLink}>Powrót do strony głównej</Link>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  main: { fontFamily: 'sans-serif', padding: '2rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
  title: { margin: 0 },
  container: { maxWidth: '500px', margin: '2rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  subtitle: { marginTop: 0, textAlign: 'center' },
  label: { fontWeight: 'bold' },
  input: { padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' },
  button: { padding: '0.75rem', border: 'none', borderRadius: '4px', backgroundColor: '#0070f3', color: 'white', fontSize: '1rem', cursor: 'pointer' },
  status: { marginTop: '2rem', textAlign: 'center', wordBreak: 'break-all' },
  backLink: { display: 'block', textAlign: 'center', marginTop: '2rem', color: '#0070f3' }
};