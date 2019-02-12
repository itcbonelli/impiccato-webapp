# L'impiccato

Progetto web realizzato all'ITC F.A. Bonelli di Cuneo
Classe 4^A SIA - A.S. 2018-2019
Proff. Federico Flecchia e Laura Console

## Introduzione

In questo progetto si realizza una web-app per il popolare gioco dell'impiccato.
Scopo del gioco è indovinare una parola entro un numero di tentativi, lettera per lettera. Ad ogni errore viene disegnato un segmento della figura dell'impiccato.
E' possibile scegliere se giocare con una parola casuale (estratta da un elenco con più di 500 sostantivi in italiano), oppure con una parola inserita manualmente dai propri amici.
Il gioco termina se l'utente indovina la parola, oppure al decimo errore commesso.

Questo progetto nasce in ambito didattico, pertanto l'autore ha cercato di commentare e documentare il più possibile.

## Struttura del progetto

- 📁 **docs**: contiene altri file di documentazione del progetto
- 📁 **immagini**: immagini utilizzate nelle pagine web
- 📁 **script**: file di codice in JavaScript contenenti la logica del gioco
- 📁 **suoni**: file audio per gli effetti sonori del gioco
- 📄 **config.xml**: file di manifesto per la conversione in app per Android/iOS mediante Cordova/PhoneGap
- 📄 **gioco.html**: file principale del gioco
- 📄 **index.html**: pagina iniziale che propone all'utente di effettuare una scelta
- 📄 **vinci.html**: pagina mostrata all'utente se vince la partita
- 📄 **perdi.html**: pagina mostrata all'utente se perde la partita
- 📸 **icon.png**: icona per l'app e favicon
- 📸 **splash.png**: schermata iniziale dell'app
- 📄 **manifest.json**: file di manifesto per l'installazione del sito come PWA (progressive web-app, gestita dal browser).

## Conversione in app
E' possibile convertire il progetto web in un'app per smartphone e tablet utilizzando la tecnologia Cordova/PhoneGap.
Il servizio on-line PhoneGap Build permette di ottenere i pacchetti app senza dover installare gli strumenti di sviluppo sul proprio PC.
