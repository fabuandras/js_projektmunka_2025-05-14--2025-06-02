export default class Kosar {
    #kosarElem;
    #kosarLista = [];
    constructor(kosarElem) {
        this.#kosarElem = kosarElem;
        this.megjelenit();
    }
    hozzaad(termek) {
        this.#kosarLista.push(termek);
        this.megjelenit();
    }
    megjelenit() {
        this.#kosarElem.innerHTML = "<h3>Kosár tartalma:</h3>";
        if (this.#kosarLista.length === 0) {
            this.#kosarElem.innerHTML += "<p>A kosár üres.</p>";
            return;
        }
        const lista = document.createElement("ul");
        lista.classList.add("list-group");
        this.#kosarLista.forEach((termek, index) => {
            const elem = document.createElement("li");
            elem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
            elem.innerHTML = `
                ${termek.nev} - ${termek.ar} Ft
                <button class="btn btn-sm btn-danger" data-index="${index}">🗑</button>
            `;
            lista.appendChild(elem);
        });
        this.#kosarElem.appendChild(lista);
        this.#torlesEsemeny();
    }
    #torlesEsemeny() {
        const torlesGombok = this.#kosarElem.querySelectorAll("button[data-index]");
        torlesGombok.forEach(gomb => {
            gomb.addEventListener("click", () => {
                const index = gomb.dataset.index;
                this.#kosarLista.splice(index, 1);
                this.megjelenit();
            });
        });
    }
    torles() {
        this.#kosarLista = [];
        this.megjelenit();
    }
}
