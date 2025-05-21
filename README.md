# WebApp React 🎬

**WebApp React** è un'interfaccia frontend sviluppata in **React** che consente di esplorare, filtrare e recensire film. Si interfaccia con una REST API esterna (repository `webapp-express`) tramite chiamate HTTP effettuate con **Axios**.

## 🧩 Struttura del progetto

- **Client:** React
- **Server/API:** [webapp-express](https://github.com/VitaFrancesco/webapp-express)
- **Chiamate API:** tramite Axios
- **Funzionalità:**
  - Visualizzazione di una lista di film
  - Filtraggio dei film per titolo, regista o descrizione
  - Visualizzazione dettagliata del singolo film (inclusa media voti)
  - Inserimento recensione tramite form
  - Eliminazione recensioni
  - Gestione errori lato utente in caso di mancata connessione o validazioni
  - Loader per l'attesa dei risultati

## 🔗 Dipendenze principali

- React
- Axios
- React Router DOM