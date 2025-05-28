import Termek from "./Termek.js";

export default class Termekek {
    #termekekLista = [];
    #szElem;
    constructor(termekekLista, szElem) {
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
}
