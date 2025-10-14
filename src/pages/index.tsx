import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';
import { useAccount, useDeployContract, useWaitForTransactionReceipt } from 'wagmi';
import { DynamicNFTAbi } from '../utils/DynamicNFTAbi';
import { DynamicNFTBytecode } from '../utils/DynamicNFTBytecode';
import { type Address } from 'viem';
import Link from 'next/link';

export default function Home() {
  const { isConnected, address } = useAccount();
  const [collectionName, setCollectionName] = useState('');
  const [collectionSymbol, setCollectionSymbol] = useState('');
  const [metadataUrl, setMetadataUrl] = useState('');
  const [isUnlimited, setIsUnlimited] = useState(true);
  const [maxSupply, setMaxSupply] = useState('');
  const [mintToAddress, setMintToAddress] = useState<Address | ''>('');
  const [initialMintAmount, setInitialMintAmount] = useState('1');

  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);
  useEffect(() => { if (isConnected && address) { setMintToAddress(address); } }, [isConnected, address]);

  const { data: hash, error, isPending, deployContract } = useDeployContract();
  
  // ZMIANA W TEJ LINII
  const { isLoading: isConfirming, isSuccess: isConfirmed, data: receipt } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    const saveDeployedContract = async () => {
      // Tutaj używamy już isConfirmed, ale pobieramy je jako isSuccess
      if (isConfirmed && receipt?.contractAddress && address) {
        try {
          await fetch('/api/contracts/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contractAddress: receipt.contractAddress,
              deployerAddress: address,
            }),
          });
          console.log('Zapisano kontrakt w bazie danych!');
        } catch (error) {
          console.error('Błąd zapisu kontraktu:', error);
        }
      }
    };
    saveDeployedContract();
  }, [isConfirmed, receipt, address]); // Zmieniamy też zależność na isConfirmed

  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !mintToAddress) return;
    const maxSupplyValue = isUnlimited ? 0n : BigInt(maxSupply);
    const args = [
      collectionName,
      collectionSymbol,
      metadataUrl,
      maxSupplyValue,
      address,
      mintToAddress as Address,
      BigInt(initialMintAmount)
    ] as const;
    deployContract({ abi: DynamicNFTAbi, bytecode: DynamicNFTBytecode, args });
  };

  return (
    <main style={styles.main}>
      <div style={styles.header}>
        <h1 style={styles.title}>Generator Kontraktów NFT</h1>
        <ConnectButton />
      </div>

      {isClient && isConnected && (
         <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Link href="/my-contracts" style={{ color: '#0070f3' }}>
              Nie pamiętasz adresu? Znajdź swoje kontrakty
            </Link>
         </div>
      )}

      {isClient && (
        <>
          {!isConnected ? (
            <p style={styles.infoText}>Połącz portfel, aby rozpocząć.</p>
          ) : (
            <div style={styles.container}>
              <form onSubmit={handleDeploy} style={styles.form}>
                <label htmlFor="collectionName" style={styles.label}>Nazwa Kolekcji *</label>
                <input id="collectionName" type="text" value={collectionName} onChange={(e) => setCollectionName(e.target.value)} placeholder="np. Moje Kolekcja" style={styles.input} required/>
                <label htmlFor="collectionSymbol" style={styles.label}>Symbol (Ticker) *</label>
                <input id="collectionSymbol" type="text" value={collectionSymbol} onChange={(e) => setCollectionSymbol(e.target.value)} placeholder="np. MKT" style={styles.input} required/>
                <label htmlFor="metadataUrl" style={styles.label}>Link do metadanych (Base URI) *</label>
                <input id="metadataUrl" type="url" value={metadataUrl} onChange={(e) => setMetadataUrl(e.target.value)} placeholder="np. ipfs://..." style={styles.input} required/>
                <div style={styles.checkboxContainer}>
                  <input id="isUnlimited" type="checkbox" checked={isUnlimited} onChange={(e) => setIsUnlimited(e.target.checked)} style={styles.checkbox}/>
                  <label htmlFor="isUnlimited">Kolekcja nielimitowana</label>
                </div>
                {!isUnlimited && (
                  <>
                    <label htmlFor="maxSupply" style={styles.label}>Maksymalna ilość sztuk *</label>
                    <input id="maxSupply" type="number" min="1" value={maxSupply} onChange={(e) => setMaxSupply(e.target.value)} placeholder="np. 10000" style={styles.input} required/>
                  </>
                )}
                <label htmlFor="mintToAddress" style={styles.label}>Adres portfela (dla kogo mintować) *</label>
                <input id="mintToAddress" type="text" value={mintToAddress} onChange={(e) => setMintToAddress(e.target.value as Address)} placeholder="np. 0x..." style={styles.input} required/>
                <label htmlFor="initialMintAmount" style={styles.label}>Ile sztuk wymintować na start? *</label>
                <input id="initialMintAmount" type="number" min="1" value={initialMintAmount} onChange={(e) => setInitialMintAmount(e.target.value)} style={styles.input} required/>
                <button type="submit" style={styles.button} disabled={isPending || isConfirming}>
                  {isPending ? 'Czekam na podpis...' : isConfirming ? 'Wdrażanie...' : 'Wdróż Kontrakt'}
                </button>
              </form>
              <div style={styles.status}>
                {hash && <p>Hash transakcji: <a href={`https://sepolia.etherscan.io/tx/${hash}`} target="_blank" rel="noopener noreferrer">{hash}</a></p>}
                {isConfirming && <p>Oczekiwanie na potwierdzenie...</p>}
                {isConfirmed && receipt && (
                  <div>
                    <p style={{ color: 'green' }}>✅ Sukces! Kontrakt wdrożony.</p>
                    <p>Adres kontraktu: <strong>{receipt.contractAddress}</strong></p>
                    <a href={`https://sepolia.etherscan.io/address/${receipt.contractAddress}`} target="_blank" rel="noopener noreferrer">Zobacz na Etherscan</a>
                    <br />
                    <Link href={`/manage/${receipt.contractAddress}`} style={{ color: '#0070f3', fontWeight: 'bold', marginTop: '1rem', display: 'inline-block' }}>
                      Zarządzaj swoim kontraktem
                    </Link>
                  </div>
                )}
                {error && <p style={{ color: 'red' }}>Błąd: {error.message}</p>}
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  main: { fontFamily: 'sans-serif', padding: '2rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
  title: { margin: 0 },
  infoText: { textAlign: 'center', fontSize: '1.2rem', color: '#555' },
  container: { maxWidth: '500px', margin: '0 auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  subtitle: { marginTop: 0, textAlign: 'center' },
  label: { fontWeight: 'bold' },
  input: { padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' },
  checkboxContainer: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  checkbox: { width: '16px', height: '16px' },
  button: { padding: '0.75rem', border: 'none', borderRadius: '4px', backgroundColor: '#0070f3', color: 'white', fontSize: '1rem', cursor: 'pointer', transition: 'background-color 0.2s' },
  status: { marginTop: '2rem', textAlign: 'center', wordBreak: 'break-all' },
};