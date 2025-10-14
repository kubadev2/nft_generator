import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

export default function Home() {
  // Hook z wagmi do sprawdzania statusu połączenia i adresu portfela
  const { isConnected, address } = useAccount();

  // Rozbudowany stan do przechowywania danych z formularza
  const [collectionName, setCollectionName] = useState('');
  const [collectionSymbol, setCollectionSymbol] = useState('');
  const [metadataUrl, setMetadataUrl] = useState('');
  const [isUnlimited, setIsUnlimited] = useState(true);
  const [maxSupply, setMaxSupply] = useState('');
  const [mintToAddress, setMintToAddress] = useState('');

  // Efekt, który automatycznie uzupełnia adres portfela po połączeniu
  useEffect(() => {
    if (isConnected && address) {
      setMintToAddress(address);
    }
  }, [isConnected, address]);

  // Tymczasowa funkcja do obsługi formularza
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      name: collectionName,
      symbol: collectionSymbol,
      metadata: metadataUrl,
      unlimited: isUnlimited,
      supply: isUnlimited ? 'Nielimitowana' : maxSupply,
      mintTo: mintToAddress,
    };
    
    console.log('Dane do wdrożenia kontraktu:', formData);
    alert(`Przygotowano do wdrożenia:\n${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <main style={styles.main}>
      <div style={styles.header}>
        <h1 style={styles.title}>Generator Kontraktów NFT</h1>
        <ConnectButton />
      </div>

      {!isConnected ? (
        <p style={styles.infoText}>Połącz portfel, aby rozpocząć.</p>
      ) : (
        <div style={styles.container}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={styles.subtitle}>Wprowadź dane kolekcji</h2>
            
            <label htmlFor="collectionName" style={styles.label}>Nazwa Kolekcji *</label>
            <input
              id="collectionName"
              type="text"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              placeholder="np. Autumn Hoodie Collection"
              style={styles.input}
              required
            />
            
            <label htmlFor="collectionSymbol" style={styles.label}>Symbol (Ticker) *</label>
            <input
              id="collectionSymbol"
              type="text"
              value={collectionSymbol}
              onChange={(e) => setCollectionSymbol(e.target.value)}
              placeholder="np. MWM"
              style={styles.input}
              required
            />
            
            <label htmlFor="metadataUrl" style={styles.label}>Link do metadanych (Base URI) *</label>
            <input
              id="metadataUrl"
              type="url"
              value={metadataUrl}
              onChange={(e) => setMetadataUrl(e.target.value)}
              placeholder="np. ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/"
              style={styles.input}
              required
            />

            <div style={styles.checkboxContainer}>
              <input
                id="isUnlimited"
                type="checkbox"
                checked={isUnlimited}
                onChange={(e) => setIsUnlimited(e.target.checked)}
                style={styles.checkbox}
              />
              <label htmlFor="isUnlimited">Kolekcja nielimitowana</label>
            </div>

            {/* To pole pojawi się tylko, jeśli checkbox jest odznaczony */}
            {!isUnlimited && (
              <>
                <label htmlFor="maxSupply" style={styles.label}>Maksymalna ilość sztuk *</label>
                <input
                  id="maxSupply"
                  type="number"
                  min="1"
                  value={maxSupply}
                  onChange={(e) => setMaxSupply(e.target.value)}
                  placeholder="np. 100"
                  style={styles.input}
                  required
                />
              </>
            )}

            <label htmlFor="mintToAddress" style={styles.label}>Adres portfela (dla kogo mintować) *</label>
            <input
              id="mintToAddress"
              type="text"
              value={mintToAddress}
              onChange={(e) => setMintToAddress(e.target.value)}
              placeholder="np. 0x..."
              style={styles.input}
              required
            />

            <button type="submit" style={styles.button}>
              Wdróż Kontrakt
            </button>
          </form>
        </div>
      )}
    </main>
  );
}

// Style CSS
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
};