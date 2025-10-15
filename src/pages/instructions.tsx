/* eslint-disable react/no-unescaped-entities */

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

export default function InstructionsPage() {
  return (
    <main style={styles.main}>
      <div style={styles.header}>
        <h1 style={styles.title}>Przykłady Metadanych NFT</h1>
        <ConnectButton />
      </div>

      <div style={styles.container}>
        <section>
          <h2>Przypadek 1: Kolekcja z różnymi NFT</h2>
          <p>Użyj tej metody, gdy każdy NFT w kolekcji jest unikalny (ma inny obrazek lub cechy). Przygotuj osobny plik JSON dla każdego tokenu (`1.json`, `2.json` itd.).</p>
          <h4>Przykład pliku `1.json`:</h4>
          <div style={styles.codeBlock}>
            {`{
  "name": "Cyber Droid #1",
  "description": "Unikalny droid zwiadowczy z serii X.",
  "image": "ipfs://CID_FOLDERU_Z_OBRAZKAMI/1.png",
  "attributes": [
    {
      "trait_type": "Pancerz",
      "value": "Lekki"
    },
    {
      "trait_type": "Oczy",
      "value": "Noktowizor"
    }
  ]
}`}
          </div>
          
          <h4>Format linku do wklejenia w formularzu:</h4>
          <p>Link musi być adresem do **folderu** z plikami JSON i kończyć się ukośnikiem `/`.</p>
          <p style={styles.codeExample}>ipfs://CID_FOLDERU_Z_PLIKAMI_JSON/</p>
        </section>

        <hr style={styles.hr} />
        <section>
          <h2>Przypadek 2: Kolekcja z identycznymi NFT</h2>
          <p>Użyj tej metody, gdy wszystkie NFT w kolekcji są takie same. Potrzebujesz tylko jednego pliku metadanych.</p>
          <h4>Przykład pliku `metadata.json`:</h4>
          <div style={styles.codeBlock}>
            {`{
  "name": "Złota Moneta",
  "description": "Moneta kolekcjonerska dla wszystkich uczestników.",
  "image": "ipfs://CID_POJEDYNCZEGO_OBRAZKA/image.png",
  "attributes": [
    {
      "trait_type": "Materiał",
      "value": "Złoto"
    },
    {
      "trait_type": "Rzadkość",
      "value": "Powszechna"
    }
  ]
}`}
          </div>

          <h4>Format linku do wklejenia w formularzu:</h4>
          <p>Link musi być adresem bezpośrednio do **jednego pliku** JSON i nie może kończyć się ukośnikiem.</p>
          <p style={styles.codeExample}>ipfs://CID_POJEDYNCZEGO_PLIKU_JSON</p>
        </section>

        <hr style={styles.hr} />
        <section>
          <h2>Hosting plików na IPFS (np. Pinata)</h2>
          <ol>
            <li>Wgraj na Pinatę folder z obrazkami (`1.png`, `2.png`...). Skopiuj jego CID.</li>
            <li>Zaktualizuj pole "image" w swoich plikach JSON, wklejając CID obrazków.</li>
            <li>Wgraj na Pinatę folder (lub pojedynczy plik) z metadanymi JSON.</li>
            <li>Skopiuj ostateczny CID metadanych i użyj go w formularzu zgodnie z powyższymi przykładami.</li>
          </ol>
        </section>
      </div>
      <Link href="/" style={styles.backLink}>Powrót do strony głównej</Link>
    </main>
  );
}

// Style
const styles: { [key: string]: React.CSSProperties } = {
    main: { fontFamily: 'sans-serif', padding: '2rem' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    title: { margin: 0 },
    container: { maxWidth: '800px', margin: '2rem auto', padding: '2rem', border: '1px solid #444', borderRadius: '8px' },
    hr: { margin: '2.5rem 0', border: 'none', borderTop: '1px solid #444' },
    codeBlock: {
      backgroundColor: '#2d2d2d',
      color: '#f1f1f1',
      padding: '1rem',
      borderRadius: '8px',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
      fontSize: '0.9rem',
      fontFamily: 'monospace',
      border: '1px solid #555'
    },
    codeExample: {
      backgroundColor: '#2d2d2d',
      color: '#f1f1f1',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      display: 'inline-block',
      fontFamily: 'monospace',
      border: '1px solid #555'
    },
    backLink: { display: 'block', textAlign: 'center', marginTop: '2rem', color: '#0070f3' }
};