# Step Hero
### Componenti
- Mattia Danese (VR502999)
- Loris Hoxhaj (VR500402)
### Obiettivi
L'obiettivo principale di questa applicazione è quello di monitorare i passi giornalieri regsitrati da un utente , e in base a questi dati e all'obiettivo di passi giornaliero inserito  dall'utente mostra l'andatamento  tramite dei  grafici giornalieri, settimali e mensili.
Inoltre l'app ha un altro obiettivo, ovvero la generazione di schede personalizzate in base al livello e al gruppo muscolare scelto dall'utente.


### Limiti attuali
I limiti dell'applicazione è il fatto di prelevare i dati tramite file.csv(per i passi, distanza in km, calorie) e tramite un file.json per gli esercizi e non attraverso un database, e che l'applicazione è per un utente unico in quanto non ci sono sessioni utenti.


### Scelte progettuali
- Il livello per la generazioni della schede lo sceglie l'utente e non viene calcolato in base ai dati delle sue performance
- Le notifiche compaiono per ricordare il raggiungimento dell'obbiettivo solo per quanto riguarda i passi mancanti e giornalmente
- Si può scegliere solo un livello e solo un gruppo muscolare  alla volta per la generazione delle schede.


### Struttura del progetto
StepApp/
- public/ -> Cartella dove vengono inseriti file statici accessibili direttamente dal browser.
- src/ -> Directory principale contenente il codice sorgente dell'applicazione.
  - components/ -> Cartella per i componenti riutilizzabili dell'interfaccia utente React.
  - data/ -> Cartella dove è presente il file statico degli esercizi.
  - img/ -> Cartella per le immagini e altri asset grafici.
  - lib/ -> Directory per librerie o utility personalizzate.
  - pages/ -> Cartella per i componenti React che rappresentano le diverse "pagine" o sezioni dell'applicazione.
  - index.css -> File CSS globale per stili di base o importazioni.
  - main.tsx -> Punto di ingresso principale dell'applicazione React con TypeScript.

### Pagine dell' applicazione
- **/** : (Dashboard.tsx) pagina principale dove viene mostrato un campo per la scelta dell'obiettivo giornaliero di passi e i grafici
- **/training-cards** : (TrainingCards.tsx) pagina dove in base alle scelte dell'utente viene generata una scheda personalizzata in formato .pdf
- **/analytics** : (Analytics.tsx) pagina dove vengono mostrate tutte le attività dell'utente
- **/contact-us** : (Contacts.tsx) pagina dove ci sono le nostre informazioni

### Tecnologie utilizzate
- **Vite** : tool di sviluppo front-end per ridurre i tempi di compilazione
- **React e Typescript** : linguaggi di programmazione per lo sviluppo delle interfacce
- **Tailwind CSS** : framework CSS per stilizzare le interfacce in modo rapido
- **Papaparse** : libreria javascript per il parsing di file.csv
- **recharts** : libreria react per costruire grafici
- **react-router**: librearia react per il routing(ovvero gestire la navigazione tra le pagine dell'applicazione)
- **ESLint con globals** : strumento per l'analisi statica del codice js/ts , serve per individuare errori sintattici nel codici
- **axios** : libreria per richieste HTTP, noi l'abbiamo utilizzato per leggere i file.csv
- **jspdf** : libreria per generare file.pdf
- **react-datapicker** : componente di calendario e selettore 
- **framer-motion e motion** : librerie per creare animazioni e transizioni
- **date-fns** : libreria per la manipolazione e formattazione delle date
- **lucide-react** : libreria di icone fornite come componenti React



