/* /---------------------------------------------------\
  | IMPICCATO - MODULO STATISTICHE                      |
  | Idea e progetto originale: Prof.ssa Laura Console   |
  | Adattamento mobile: Prof. Federico Flecchia         |
  |                                                     |
  | App realizzata presso l'ITC Bonelli di Cuneo        |
  | Anno scolastico 2018-19 | Classe 4^A SIA            |
   \---------------------------------------------------/
 */


/**
 * Ottiene le partite memorizzate
 */
function getPartite() {
    var str_partite = localStorage.getItem('impiccato.partite') || "";

    if(partite.length > 0) {
        var partite = JSON.parse(str_partite);
    } else {
        var partite = [];
    }

    return partite;
}


/**
 * Ottiene il numero di partite giocate
 * @return {number} 
 */
function getNumeroPartiteGiocate() {
    var partite = getPartite();
    return partite.length;
}

/**
 * Ottiene il numero di partite vinte
 * @returns {number}
 */
function getNumeroPartiteVinte() {
    var n_vinte = 0;
    var partite = getPartite();

    for(var i = 0; i<partite.length; i++) {
        if(partite[i].vinta == true) {
            n_vinte++;
        }
    }
    return n_vinte;
}

/**
 * Ottiene il numero di partite perse
 * @returns {number}
 */
function getNumeroPartitePerse() {
    var n_perse = 0;
    var partite = getPartite();

    for(var i = 0; i<partite.length; i++) {
        if(partite[i].vinta == false) {
            n_perse++;
        }
    }
    return n_perse;
}

/**
 * Salva le informazioni sulla partita corrente 
 * nella memoria del dispositivo (per la pagina statistiche)
 * 
 * @param {string} parola parola da indovinare
 * @param {boolean} vinta indica se la partita è stata vinta
 * @param {number} errori numero di errori
 * @param {number} durata durata della partita, in secondi  
 */
function salvaPartita(parola, vinta, errori, durata) {
    //creo oggetto partita con i dati presi in input
    var partita = {
        "parola" : parola,
        "vinta" : vinta,
        "errori" : errori,
        "durata" : durata
    }

    var partite = getPartite();
    partite.push(partita);
    localStorage.setItem('impiccato.partite', JSON.stringify(partite));
}

/**
 * Azzera le statistiche sulle partite
 */
function azzeraStatPartite() {
	localStorage.removeItem('impiccato.partite');
}

