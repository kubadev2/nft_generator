# Generator Kontraktów NFT

Prosta, ale potężna aplikacja webowa pozwalająca użytkownikom na błyskawiczne generowanie i wdrażanie własnych smart kontraktów dla kolekcji NFT (standard ERC-721) na blockchainie Ethereum.

**[Zobacz demo na żywo](https://nft-generator-pow.netlify.app/)** 🚀

---

## ## Funkcjonalności

* **Łączenie portfela:** Prosta i bezpieczna integracja z popularnymi portfelami (MetaMask, WalletConnect, Coinbase Wallet itd.) dzięki RainbowKit.
* **Dynamiczny formularz:** Intuicyjny interfejs do konfiguracji parametrów kontraktu:
    * Nazwa kolekcji i symbol (ticker).
    * Limit podaży (lub kolekcja nielimitowana).
    * Adres do mintowania pierwszych tokenów.
    * Link do metadanych (Base URI).
* **Uniwersalny Smart Kontrakt:** Jeden inteligentny kontrakt w Solidity, który automatycznie obsługuje dwa typy metadanych:
    1.  **Unikalne NFT:** Każdy token ma inny plik metadanych (np. `1.json`, `2.json`...).
    2.  **Identyczne NFT:** Wszystkie tokeny w kolekcji korzystają z jednego pliku metadanych.
* **Zapisywanie wdrożeń:** Aplikacja automatycznie zapisuje informacje o wdrożonych kontraktach w trwałej bazie danych (Netlify Blobs), łącząc je z adresem portfela użytkownika.
* **Zarządzanie kolekcją:** Dedykowane podstrony do:
    * Przeglądania listy swoich wdrożonych kontraktów.
    * Mintowania dodatkowych tokenów po wdrożeniu kontraktu.
* **Instrukcja:** Wbudowana podstrona z poradnikiem, jak przygotować i hostować metadane na IPFS przy użyciu Pinaty.

---

## ## Technologie

* **Frontend:** Next.js, React, TypeScript
* **Web3:** RainbowKit, wagmi, viem
* **Smart Kontrakt:** Solidity, OpenZeppelin
* **Backend i Baza Danych:** Netlify Functions, Netlify Blobs
* **Hosting:** Netlify

---

## ## Uruchomienie lokalne

Aby uruchomić projekt na swoim komputerze, postępuj zgodnie z poniższymi krokami.

1.  **Sklonuj repozytorium:**
    ```bash
    git clone [https://github.com/kubadev2/nft_generator.git](https://github.com/kubadev2/nft_generator.git)
    ```

2.  **Przejdź do folderu projektu:**
    ```bash
    cd nft-generator
    ```

3.  **Zainstaluj zależności:**
    ```bash
    npm install
    ```

4.  **Skonfiguruj zmienne środowiskowe:**
    Stwórz plik `.env.local` w głównym folderze projektu i dodaj do niego swój Project ID z WalletConnect (niezbędny do działania RainbowKit).
    
    ```
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=twoj_walletconnect_project_id
    ```
    *Możesz go uzyskać za darmo na stronie [WalletConnect Cloud](https://cloud.walletconnect.com/).*

5.  **Uruchom serwer deweloperski:**
    ```bash
    npm run dev
    ```
    Aplikacja będzie dostępna pod adresem `http://localhost:3000`.

---

## ## Jak używać aplikacji?

1.  **Przygotuj metadane:** Skorzystaj ze strony `/instructions`, aby przygotować obrazki i pliki JSON, a następnie wgraj je na IPFS (np. przez Pinatę). Skopiuj link do folderu lub pliku z metadanymi.
2.  **Połącz portfel:** Wejdź na stronę główną i połącz swój portfel kryptowalutowy, upewniając się, że jesteś na sieci testowej Sepolia.
3.  **Wypełnij formularz:** Podaj nazwę kolekcji, symbol, link do metadanych (pamiętając o formacie!) i pozostałe parametry.
4.  **Wdróż kontrakt:** Kliknij przycisk i potwierdź transakcję w portfelu. Po chwili otrzymasz potwierdzenie i link do Etherscan oraz do strony zarządzania.
5.  **Zarządzaj kontraktami:** Przejdź na podstronę "Sprawdź swoje kontrakty", aby zobaczyć listę wszystkich wdrożonych przez Ciebie kolekcji. Z tego miejsca możesz przejść do panelu zarządzania i mintować kolejne tokeny.