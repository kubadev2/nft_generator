import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { type Address } from 'viem';
import { getChainInfo } from '@/lib/chains';

interface FetchedContract {
  contractAddress: Address;
  collectionName?: string;
  createdAt: number;
  chainId: number;
}

export default function MyContractsPage() {
  const { address, isConnected } = useAccount();
  const [userContracts, setUserContracts] = useState<FetchedContract[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContracts = async () => {
      if (!isConnected || !address) {
        setUserContracts([]);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/contracts/get?deployerAddress=${address}`);
        if (!response.ok) throw new Error('Błąd pobierania danych');
        const data = await response.json();
        setUserContracts(data);
      } catch (e) {
        setError('Nie udało się pobrać kontraktów.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchContracts();
  }, [isConnected, address]);

  return (
    <main style={styles.main}>
      <div style={styles.header}>
        <h1 style={styles.title}>Moje Wdrożone Kontrakty</h1>
        <ConnectButton />
      </div>
      <div style={styles.container}>
        {!isConnected ? (<p>Połącz portfel, aby zobaczyć swoje kontrakty.</p>) : (
          <div style={styles.results}>
            {isLoading && <p>Ładowanie kontraktów...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!isLoading && !error && (
              userContracts.length > 0 ? (
                <>
                  <h3>Twoje wdrożone kontrakty:</h3>
                  <div style={{ listStyle: 'none', padding: 0 }}>
                    {userContracts.map(record => {
                      const chainInfo = getChainInfo(record.chainId);
                      return (
                        <Link key={record.contractAddress} href={`/manage/${record.contractAddress}`} style={styles.link}>
                          <div>
                            <div style={styles.cardHeader}>
                              <strong style={{ fontSize: '1.2rem' }}>
                                {record.collectionName ?? record.contractAddress}
                              </strong>
                              <span style={styles.chainTag}>{chainInfo.name}</span>
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#888', marginTop: '0.5rem' }}>
                              <p style={styles.address}>Adres: {record.contractAddress}</p>
                              <p style={{ margin: 0 }}>Wdrożono: {new Date(record.createdAt).toLocaleString()}</p>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </>
              ) : (<p>Nie znaleziono żadnych kontraktów wdrożonych z tego adresu.</p>)
            )}
          </div>
        )}
      </div>
      <Link href="/" style={styles.backLink}>Powrót do strony głównej</Link>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
    main: { fontFamily: 'sans-serif', padding: '2rem' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    title: { margin: 0 },
    container: { maxWidth: '700px', margin: '2rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
    results: { textAlign: 'left' },
    link: { display: 'block', color: 'inherit', textDecoration: 'none', marginBottom: '1rem', border: '1px solid #444', padding: '1rem', borderRadius: '8px', transition: 'background-color 0.2s ease' },
    address: { margin: 0, wordBreak: 'break-all' },
    backLink: { display: 'block', textAlign: 'center', marginTop: '2rem', color: '#0070f3' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    chainTag: { backgroundColor: '#333', color: '#fff', padding: '0.25rem 0.5rem', borderRadius: '12px', fontSize: '0.8rem' },
};