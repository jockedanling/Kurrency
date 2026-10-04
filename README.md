# Kurrency

Valutaomvandlare för Iphone byggd i React Native (Expo). Appen hämtar dagsaktuella växelkurser från FrankfurterAPI och räknar om belopp mellan valutor. 
Detta är en laboration i kursen SUM200, HT26.

# Funktioner
- **Omvandla**: Välj från- och till valuta, skriv belopp på egen sifferkanppsats och bytt håll med en knapp. Aktuell kurs visas under resultatet.
- **Kurser**: Vad varje valuta kostar i kronor med falggor, valutanman och sökfält. Dra nedåt för att uppdatera.
- **Senast uppdaterad**: Datum för kurserna direkt från API:et.
- **Laddning och fel**: Laddningsindikator, och en felvy om API:et inte svarar.

  ## Kom igång
  Krav: Node.js och appen [Expo Go] på en Iphone

  ```bash
  git clone https://github.com/jockedanling/Kurrency.git
  cd Kurrency
  npm install
  npx expo start
  ```

  Skanna QR-koden med Iphonens kamera. Telefonen och datorn måste vara på samma Wi-Fi. Fungerar det inte, start med `npx expo start --tunnel`.

  ## API
  Appen använder Frankfuter API v2 (https://frankfurter.dev/). Det är gratis och och kräver ingen nyckel.
  Endpoint:
  `GET /v2/currencies` - Valutalistan och valutanamn
  `GET /v2/rates?base=sek` - Kurslistan
  `GET /v2/rate/{från}/{till}` - Kursen i omvandlaren

  Alla anrop finns i `src/api/frankfurter.js`. Där görs API-svaren om till appens eget format, så att skärmarna aldrig använder API:et direkt.
  Själva omräkningen görs i appen `src/utils/convert.js` eftersom inte API:et har en endpoint som gör omräkningen.
  Kurserna publiceras **en gång per bankdag**, så de ändras inte under dagen.

  ## Vem har gjort vad
  Joakim Danling har ansvarat för:
  - Designsystem och komponenter
  - Omvandlarskärmen och sifferknappsatsen
  - Laddnings- och fellägen i indexvyn <br>
  
  Erik Lans har ansvarat för:
  - API-klient, datamappning och omräkning
  - Kurslistan med sök och flaggor
  - Laddnings- och fellägen i kursvyn
 
    ## Vidareutveckling
  - Graf över ett valutapar den senaste månaden
  - Favoritvalutor som sparas mellan appstater
  - Mörkt tema
  
