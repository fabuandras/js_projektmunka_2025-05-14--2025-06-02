export default class Kosar {
    #kosarElem;
    #kosarLista = [];

    constructor(szuloElem) {
        this.#kosarElem = szuloElem;
        this.megjelenit();

        // Figyelünk a kosárba eseményre
        window.addEventListener("kosarba", (event) => {
            this.hozzaad(event.detail);
        });
    }

    megjelenit() {
        this.#kosarElem.innerHTML = `
        <h3>Kosár</h3>
        <ul id="kosarLista" class="list-group"></ul>
        `;

        const listaElem = this.#kosarElem.querySelector("#kosarLista");

        if (this.#kosarLista.length === 0) {
            listaElem.innerHTML = `<li class="list-group-item">A kosár üres</li>`;
        } else {
            listaElem.innerHTML = "";

            this.#kosarLista.forEach((termek, index) => {
                listaElem.innerHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${termek.nev} - ${termek.ar} Ft
                    <button class="btn btn-sm btn-danger" data-index="${index}">❌</button>
                </li>
                `;
            });

            this.#kosarElem.querySelectorAll("button[data-index]").forEach((gomb) => {
                gomb.addEventListener("click", (e) => {
                    const index = e.target.dataset.index;
                    this.torles(index);
                });
            });
        }
    }

    hozzaad(termek) {
        this.#kosarLista.push(termek);
        this.megjelenit();
    }

    torles(index) {
        this.#kosarLista.splice(index, 1);
        this.megjelenit();
    }
}