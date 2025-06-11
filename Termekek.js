import Termek from "./Termek.js";


export default class Termekek {
    #eredetiLista = [];
    #termekekLista = [];
    #szElem;
    constructor(termekekLista, szElem) {
        this.#eredetiLista = termekekLista.map(t => ({ ...t }));
        this.#termekekLista = termekekLista;
        this.#szElem = szElem;
        this.megjelenit();
        this.kosarbaEsemeny();
    }
    megjelenit(ujElem) {
    if (ujElem) {
        this.#szElem = ujElem;
    }
    this.#szElem.innerHTML = "";
    this.#termekekLista.forEach((adat, index) => {
        new Termek(adat, this.#szElem, index);
    });
}
    kosarbaEsemeny() {
        window.addEventListener("kosarba", (event) => {
            const termek = event.detail;
            console.log("Kosárba került:", termek);
        });
    }

    rendez(irany) {
        if (irany === "novekvo") {
            this.#termekekLista.sort((a, b) => a.ar - b.ar);
        } else if (irany === "csokkeno") {
            this.#termekekLista.sort((a, b) => b.ar - a.ar);
        } else if (irany === "alap") {
            // Visszaállítjuk az eredeti állapotot
            this.#termekekLista = this.#eredetiLista.map(t => ({ ...t }));
        }
        this.megjelenit();
    }

    szures(szoveg) {
        const szuroSzoveg = szoveg.toLowerCase();
        this.#termekekLista = this.#eredetiLista.filter(termek =>
            termek.nev.toLowerCase().includes(szuroSzoveg)
        );
        this.megjelenit();
    }

    getAktualisLista() {
        return this.#termekekLista;
    }
}