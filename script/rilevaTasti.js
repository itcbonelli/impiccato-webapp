/* *
 * In questo script facciamo in modo che le lettere possano essere selezionate anche 
 * tramite la tastiera del computer
 */

/**
 * Gestisce la pressione dei tasti sulla tastiera
 * @param {Object} e informazioni sull'evento
 */
function tastoPremuto(e) {
    
    //rilevo il codice del tasto (viene passato come parametro 'e')
    var codiceTasto = e.which;
    
    //controllo che il codice del carattere ricada tra le lettere latine
    if (codiceTasto >= 65 && codiceTasto <= 90 || codiceTasto >= 97 && codiceTasto <= 122) {
        
        //trasformo il codice del tasto premuto nella lettera corrispondente
        var lettera = String.fromCharCode(codiceTasto);
        
        //converto la lettera in maiuscola
        lettera = lettera.toUpperCase();
        
        //richiamo la funzione scegliLettera con la lettera rilevata
        scegliLettera(lettera);
    }
    
}

//Associo l'evento alla funzione.
document.addEventListener('keyup', tastoPremuto);

/*
Nota: gli eventi della tastiera sono:
- onkeydown: viene scatenato quando il tasto viene pigiato, prima che venga sollevato il dito dalla tastiera
- onkeyup: viene scatenato quando il tasto viene rilasciato. E' quello da preferire, perchè normalmente gli eventi da
    tastiera vengono registrati al rilascio dei tasti (fatta eccezione per alcuni giochi);
*/