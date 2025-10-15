import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

export default function InstructionsPage() {
  return (
    <main style={styles.main}>
      <div style={styles.header}>
        <h1 style={styles.title}>Instrukcja Tworzenia Metadanych NFT</h1>
        <ConnectButton />
      </div>

      <div style={styles.container}>
        <section>
          <h2>Czym są metadane?</h2>
          <p>Metadane to informacje opisujące Twoje NFT, takie jak nazwa, opis, obrazek i cechy (atrybuty). Są one zapisane w plikach JSON i przechowywane poza blockchainem, najczęściej w zdecentralizowanym systemie plików IPFS.</p>
        </section>

        <hr style={styles.hr} />

        <section>
          <h2>Struktura pliku JSON</h2>
          <p>Każdy plik metadanych to prosty plik tekstowy w formacie JSON. Poniżej znajduje się szablon, który możesz skopiować i dostosować:</p>
          <pre style={styles.codeBlock}>
            {`{
  "name": "Nazwa Twojego NFT #1",
  "description": "Opis Twojego NFT, jego historia lub cechy.",
  "image": "ipfs://CID_FOLDERU_Z_OBRAZKAMI/1.png",
  "attributes": [
    {
      "trait_type": "Tło",
      "value": "Czerwone"
    },
    {
      "trait_type": "Oczy",
      "value": "Laserowe"
    },
    {
      "trait_type": "Poziom Mocy",
      "value": 100,
      "display_type": "number"
    }
  ]
}`}
          </pre>
          <ul>
            <li><strong>name</strong>: Nazwa NFT (często z numerem ID).</li>
            <li><strong>description</strong>: Dłuższy opis.</li>
            <li><strong>image</strong>: Link do pliku z obrazkiem.</li>
            <li><strong>attributes</strong>: Lista cech, które będą widoczne na platformach takich jak OpenSea.</li>
          </ul>
        </section>

        <hr style={styles.hr} />

        <section>
          <h2>Krok po Kroku: Przygotowanie i Hosting na IPFS</h2>
          <p>Użyjemy serwisu <a href="https://pinata.cloud" target="_blank" rel="noopener noreferrer">Pinata</a> do łatwego hostingu plików na IPFS.</p>
          <ol>
            <li><strong>Załóż darmowe konto</strong> na <a href="https://pinata.cloud" target="_blank" rel="noopener noreferrer">Pinata</a>.</li>
            <li><strong>Przygotuj obrazki:</strong> Stwórz na komputerze folder i umieść w nim wszystkie swoje obrazki, nazywając je kolejno: `1.png`, `2.png`, `3.png` itd.</li>
            <li><strong>Wgraj folder z obrazkami na Pinatę:</strong> Otrzymasz unikalny identyfikator (CID) tego folderu. Skopiuj go.</li>
            <li><strong>Przygotuj pliki JSON:</strong> Stwórz drugi folder na pliki z metadanymi. Dla każdego obrazka stwórz odpowiadający mu plik JSON (`1.json`, `2.json` itd.). W każdym pliku JSON zaktualizuj pole `"image"`, wklejając skopiowany CID, np. `"image": "ipfs://TWOJ_CID_OBRAZKOW/1.png"`.</li>
            <li><strong>Wgraj folder z plikami JSON na Pinatę:</strong> Otrzymasz drugi, nowy CID – tym razem dla folderu z metadanymi.</li>
          </ol>
        </section>

        <hr style={styles.hr} />

        <section>
          <h2>Użycie linku w Generatorze</h2>
          <p>Skopiuj CID folderu z plikami JSON. Link, który musisz wkleić w formularzu na stronie głównej, zależy od typu Twojej kolekcji:</p>
          
          <h4>1. Kolekcja z unikalnymi NFT (każdy inny)</h4>
          <p>Link musi być adresem do folderu i **musi kończyć się ukośnikiem `/`**.</p>
          <p style={styles.codeExample}>ipfs://CID_FOLDERU_Z_PLIKAMI_JSON/</p>
          
          <h4>2. Kolekcja z identycznymi NFT (wszystkie takie same)</h4>
          <p>W tym przypadku wgrywasz tylko jeden plik JSON. Link musi być adresem do tego konkretnego pliku i **nie może kończyć się ukośnikiem**.</p>
          <p style={styles.codeExample}>ipfs://CID_POJEDYNCZEGO_PLIKU_JSON</p>
          <p>Pamiętaj, aby w tym przypadku użyć wersji smart kontraktu, która nie dokleja numeru ID do linku!</p>
        </section>
        
      </div>
      <Link href="/" style={styles.backLink}>Powrót do strony głównej</Link>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
    main: { fontFamily: 'sans-serif', padding: '2rem' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    title: { margin: 0 },
    container: { maxWidth: '800px', margin: '2rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
    hr: { margin: '2rem 0', border: 'none', borderTop: '1px solid #eee' },
    codeBlock: {
      backgroundColor: '#f5f5f5',
      padding: '1rem',
      borderRadius: '8px',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
      fontSize: '0.9rem',
    },
    codeExample: {
      backgroundColor: '#f5f5f5',
      padding: '0.5rem',
      borderRadius: '4px',
      display: 'inline-block'
    },
    backLink: { display: 'block', textAlign: 'center', marginTop: '2rem', color: '#0070f3' }
};