/* /---------------------------------------------------\
  | IMPICCATO                                           |
  | Idea e progetto originale: Prof.ssa Laura Console   |
  | Adattamento mobile: Prof. Federico Flecchia         |
  |                                                     |
  | App realizzata presso l'ITC Bonelli di Cuneo        |
  | Anno scolastico 2018-19 | Classe 4^A SIA            |
   \---------------------------------------------------/
 */

/** numero massimo tentativi */
var N_TENTATIVI = 10;

/** indica che la partita è in corso */
var giocando = false;

/** ora di inizio della partita */
var oraInizio = null;

/** Parola estratta (oppure scelta dall'utente) */
var parolaScelta = "";

/** Numero tentativi rimasti */
var tentativiRimasti = 10;

/** Numero errori commessi */
var errori = 0;

/** Lettere scelte dall'utente */
var lettereScelte = "";

/** Suono da riprodurre in caso di lettera indovinata */
var successSound = new Audio('suoni/success.wav');

/** Suono da riprodurre in caso di lettera errata */
var errorSound = new Audio('suoni/error.wav');

/**
 * Chiede all'utente di inserire la parola da indovinare
 */
function scegliParolaUtente() {
	var convalida = false;

	do {
		// chiedo la parola all'utente
		var parola = prompt("Digita la parola che dovrà essere indovinata (max. 30 caratteri, senza accenti)");

		if(parola==null) {continue;}
		
		if(parola.length > 30) {
			alert('La parola non può essere più lunga di 30 caratteri');
			continue;
		}
		

		// converto la parola in maiuscole
		parola = parola.toUpperCase();
		// ora controllo che la parola contenga al suo interno solo lettere latine
		// per farlo, creo una 'espressione regolare'
		var re = new RegExp("^([A-Za-z]*)$");
		// testo che la parola contenga almeno un carattere e sia
		// compatibile con l'espressione regolare
		var convalida = parola.length > 0 && re.test(parola);

		if (convalida == false) {
			alert("Digitare una parola con sole lettere latine, senza spazi, accenti o caratteri speciali");
		}

	} while (convalida == false);

	parolaScelta = parola;
	sessionStorage.setItem('parolaDaIndovinare', parolaScelta);
	return parolaScelta;

}

/**
 * Genera una parola casuale dall'elenco
 * @return string parola scelta
 */
function scegliParolaRandom() {
	// genero un numero casuale da 0 alla lunghezza dell'array contenente le parole
	var casuale = Math.round(Math.random() * (paroleRandom.length - 1));
	// estraggo la parola scelta che ha come indice il numero estratto
	parolaScelta = paroleRandom[casuale];

	sessionStorage.setItem('parolaDaIndovinare', parolaScelta);

	return parolaScelta;
}

/**
 * Gestisce la selezione di una lettera da parte dell'utente
 */
function scegliLettera(lettera) {

	//la partita non è in corso, non faccio nulla
	if (giocando == false) {
		// la parola return causa l'uscita dalla funzione e la restituzione di
		// un valore, in questo caso false
		return false;
	}

	if (lettereScelte.indexOf(lettera) >= 0) {
		//l'utente ha già scelto la lettera, non faccio nulla
		return false;
	}

	// aggiunge al bottone una classe CSS
	document.getElementById('lettera' + lettera).classList.add('scelta');

	// diventa true se la lettera viene trovata almeno una volta
	var indovinato = false;

	// per ogni lettera della parola, cerco quella selezionata
	for (var i = 0; i < parolaScelta.length; i++) {
		if (parolaScelta[i] == lettera) {
			indovinato = true;
		}
	}
	// aggiungo la lettera all'elenco delle lettere scelte
	lettereScelte += lettera;
		

	if (indovinato == true) {
		controllaParola();
		//riproduco il suono di lettera indovinata
		successSound.play();
	} else {
		//incremento il contatore degli errori
		errori++;
		//e decremento quello dei tentativi
		tentativiRimasti--;

		// cambio l'immagine
		document.getElementById('imp').setAttribute('src', "immagini/imp" + errori + ".gif");
		
		// cambio l'etichetta del numero di tentativi
		document.getElementById('n_tentativi').innerText = tentativiRimasti;

		//faccio vibrare il telefono per 1 secondo
		vibraTelefono(1);

		//riproduco il suono di errore
		errorSound.play();

		//se il numero di tentativi rimasti scende a zero
		if (tentativiRimasti == 0) {
			//inserisco la parola scelta nel sessionStorage
			sessionStorage.setItem('parolaScelta', parolaScelta);
			//inserisco il numero degli errori
			sessionStorage.setItem('numeroErrori', errori);

			// calcolo il tempo di gioco (differenza tra ora inizio e ora attuale)
			var tempoGioco = oraInizio.getTime() - new Date('now').getTime();
			//valorizzo il sessionStorage con il tempo di gioco
			sessionStorage.setItem('tempoGioco', tempoGioco);

			// navigo alla pagina di partita persa
			window.location = "perdi.html";
		}
	}

	// rigenero la stringa della parola con asterischi
	var str_asterischi = asterischi();
	document.getElementById('parolaEstratta').value = str_asterischi;

	return false;
}

/**
 * Controlla la parola da indovinare rispetto alle lettere inserite
 * @return {boolean}
 */
function controllaParola() {
	var parolaDaIndovinare = parolaScelta;

	for (var i = 0; i < lettereScelte.length; i++) {
		var lettera = lettereScelte[i];
		//se trovo la lettera nella parola da indovinare
		if (parolaDaIndovinare.indexOf(lettera) >= 0) {
			//la rimuovo, sostituendola con un carattere vuoto
			parolaDaIndovinare = parolaDaIndovinare.replace(new RegExp(lettera, "gi"), '');
		}
		console.log(parolaDaIndovinare);
	}

	//se non ci sono più lettere, l'utente ha vinto
	if (parolaDaIndovinare.length == 0) {
		giocando = false;
		window.location = "vinci.html";
	}
}

/**
 * Genera in output le lettere da usare nel gioco
 */
function generaLettere() {
	// Ciclo per i da 65 a 90 (le lettere maiuscole A-Z della tabella ASCII)
	for (i = 65; i <= 90; i++) {
		// Creo la lettera dal suo codice ASCII
		var res = String.fromCharCode(i);
		// il parametro 'char' va con apice singolo '
		document.write('<button class="lettera" id="lettera' + res + '" onclick="scegliLettera(\'' + res + '\')">' + res + '</button>');
	}


}

/**
 * Genera gli asterischi sulla parola da indovinare
 * @return string
 */
function asterischi() {
	var stringa = '';
	for (var i = 0; i < parolaScelta.length; i++) {
		var lettera = parolaScelta[i];
		if (lettereScelte.indexOf(lettera) >= 0) {
			stringa += lettera;
		} else {
			stringa += '*';
		}
	}

	document.getElementById('parolaEstratta').value = stringa;

	return stringa;
}

/**
 * Se l'app viene eseguita in un telefono,
 * (tramite piattaforma Cordova),
 * fa vibrare il dispositivo
 *
 * @param {Number} secondi durata della vibrazione, in secondi
 * @return boolean true se il dispositivo supporta la vibrazione
 */
function vibraTelefono(secondi) {
	//controllo se esiste la funzione per far vibrare il dispositivo
	if (undefined !== navigator.vibrate) {
		navigator.vibrate(secondi);
		return true;
	} else {
		// se la funzione non è supportata, non faccio nulla
		// (a parte mostrare un errore in console)
		console.error("Vibrazione non supportata dal dispositivo corrente");
		return false;
	}
}

/**
 * Inizia una nuova partita con una parola casuale
 */
function inizia() {
	//azzero il Session Storage
	sessionStorage.clear();

	// se nell'url della pagina è presente l'hash #parola_manuale
	if (window.location.hash == '#parola_scelta') {
		// faccio scegliere la parola all'utente
		scegliParolaUtente();
	} else {
		// altrimenti, seleziono una parola casuale dall'elenco
		scegliParolaRandom();
	}
	
	// avvio una nuova partita
	giocando = true;
	
	// ripristino il numero di tentativi rimasti
	tentativiRimasti = N_TENTATIVI;
	
	// azzero il contatore degli errori
	errori = 0;
	
	//imposto l'ora di inizio della partita
	oraInizio = new Date('now');
	
	// scrivo la parola nella casella, con gli asterischi
	asterischi();
}
