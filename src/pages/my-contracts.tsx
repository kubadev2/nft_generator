import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { type Address } from 'viem';

interface FetchedContract {
  contractAddress: Address;
  createdAt: number;
}

const shortenAddress = (addr: string) => `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;

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
        console.error(e);
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
        {!isConnected ? (
          <p>Połącz portfel, aby zobaczyć swoje kontrakty.</p>
        ) : (
          <div style={styles.results}>
            {isLoading && <p>Ładowanie kontraktów...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!isLoading && !error && (
              userContracts.length > 0 ? (
                <>
                  <h3>Twoje wdrożone kontrakty:</h3>
                  <ul>
                    {userContracts.map(record => (
                      <li key={record.contractAddress}>
                        <Link href={`/manage/${record.contractAddress}`} style={styles.link}>
                          {shortenAddress(record.contractAddress)}
                        </Link>
                        <span style={{ marginLeft: '1rem', color: '#666' }}>
                          (Wdrożono: {new Date(record.createdAt).toLocaleString()})
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p>Nie znaleziono żadnych kontraktów wdrożonych z tego adresu.</p>
              )
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
    link: { color: '#0070f3', textDecoration: 'none', fontWeight: 'bold' },
    backLink: { display: 'block', textAlign: 'center', marginTop: '2rem', color: '#0070f3' }
};