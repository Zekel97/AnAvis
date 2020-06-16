# Progetto AnAvis

Il sistema progettato si pone come obiettivo principale quello di agevolare l'associazione AVIS nella gestione delle donazioni, digitalizzandone l'intero processo lavorativo, in particolare la prenotazione online da parte del donatore. Il tutto consente di eliminare le inefficienze riguardanti la gestione analogica dei documenti.
Il sistema è usufruibile, oltre che dai donatori, da tutti i lavoratori all'interno di ogni singola sede (impiegati, analisti e medici).
Ogni sede è rappresentabile come a sé stante ed ha a proprio carico la gestione del relativo personale.

## Situazione attuale
Allo stato attuale il donatore, per eseguire la donazione, deve prenotare per via telefonica oppure presentarsi senza prenotazione, nella sede Avis di appartenenza il giorno stesso in cui intende donare.
Una volta giunto in sede, per avviare il processo di donazione, il donatore è obbligato a compilare un modulo che attesta le proprie condizioni di salute. Successivamente viene effettuato un colloquio con uno dei medici presenti in sede per valutare definitivamente se le condizioni del donatore siano idonee o meno alla donazione. Dopo il colloquio, se la possibilità è stata conferita al donatore, avviene la donazione vera e propria.
Una volta effettuata la donazione, il sangue viene immagazzinato all'interno della sede e viene poi analizzato dal personale qualificato, nello specifico dagli analisti.
Il referto della donazione è visionabile da parte del donatore, previa richiesta, e solo in un momento successivo.

## Dopo l'introduzione del sistema
Tramite l'introduzione del sistema il donatore è in grado di effettuare la propria prenotazione online presso la propria sede di appartenenza, scegliendo la data e l'orario in base alle proprie preferenze. Il processo di prenotazione include anche la compilazione del relativo modulo online.
Nonostante il sistema conferisca la possibilità di prenotare online, il donatore potrà comunque presentarsi in sede senza alcuna prenotazione, facendosi registrare dall'impiegato Avis relativo alla sede di appartenenza.
I medici potranno visualizzare le prenotazioni odierne con i relativi moduli e avviare in maniera definitiva una donazione dopo il colloquio preliminare.
Alla stessa maniera, gli analisti potranno visualizzare le donazioni ancora aperte e chiuderle caricando il referto risultante dall'analisi. Da quel momento, il referto sarà automaticamente visualizzabile da parte del donatore nel relativo spazio dedicato.

## Tecnologie utilizzate
L'intero progetto si basa interamente su *JavaScript ES6*, ed è stato implementato utilizzando lo stack *MERN (MongoDB, Express, React.js, Node.js)*.
- *MongoDB*: utilizzato per la memorizzazione dei dati, assieme al relativo cloud database service *MondoDB Atlas* e al relativo framework ODM *Mongoose*;
- *React.js*: framework utilizzato per lo sviluppo del frontend;
- *Express*: framework utilizzato per lo sviluppo del backend;
- *Node.js*: runtime di JavaScript basato su JavaScript V8 di Google Chrome.

## Lista delle iterazioni e relativi casi d'uso
| Iterazione | Data inizio | Data fine | Casi d'uso |
|------------|-------------|-----------|------------|
|     1      |   06/04/20          |   20/04/20         |  Prenota Donazione, Crea Donazione Manuale, Avvia Donazione, Visualizza Prenotazioni Odierne, Visualizza Prenotazioni Future                                           |
|     2      |   20/04/20          |   04/05/20         |   Registra Donatore Non Prenotato, Carica Referto, Visualizza Donazioni Aperte, Visualizza Prenotazioni                                              |
|     3      |   04/05/20          |   18/05/20         |   Richiede Donazione, Gestisce Donatore, Gestisce Impiegato Avis, Gestisce Medico, Gestisce Analista, Gestisce Sede Avis                                            |
|     4      |   18/05/20          |   01/06/20         |  Login, Logout, Promemoria Donazione, Verifica Possibilità Donazione                                           |
|     5      |   01/06/20          |   15/06/20         |  Visualizza Prenotazioni Attive, Visualizza Storico Referti Donazione, Controlla Statistiche, Modifica Mail Utenti, Reset Password Utenti, Visualizza Utenti                                            |

## Come avviare il sistema
Il sistema è disponibile come applicazione web. Per eseguire il codice sorgente è necessario digitare -in ordine- i seguenti comandi:

```
git clone https://github.com/Zekel97/AnAvis
npm i     *
npm start
cd ./Frontend
npm i     *
npm start
```


\*Il comando è necessario per il download dei *node_modules*, solo durante il primo utilizzo del sistema.
