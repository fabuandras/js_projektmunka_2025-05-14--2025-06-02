export default class Kosar {
    #kosarElem;
    #kosarLista = [];

    constructor(szuloElem) {
        this.#kosarElem = szuloElem;
        this.megjelenit();

        // Figyeljük a "kosarba" eseményt
        window.addEventListener("kosarba", (event) => {
            this.hozzaad(event.detail);
        });
    }

    megjelenit() {
        this.#kosarElem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h3>🛒 Kosár</h3>
                <button class="btn btn-sm btn-outline-secondary" id="kosar-bezaras" title="Kosár bezárása">❌</button>
            </div>
            <ul id="kosarLista" class="list-group"></ul>
        `;

        const listaElem = this.#kosarElem.querySelector("#kosarLista");

        if (this.#kosarLista.length === 0) {
            listaElem.innerHTML = `<li class="list-group-item">A kosár üres</li>`;
        } else {
            listaElem.innerHTML = this.#kosarLista
                .map((termek, index) => `
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        ${termek.nev} – ${termek.db} db – ${termek.ar * termek.db} Ft
                        <button class="btn btn-sm btn-danger" data-index="${index}">❌</button>
                    </li>
                `)
                .join("");

            this.#kosarElem.querySelectorAll("button[data-index]").forEach((gomb) => {
                gomb.addEventListener("click", (e) => {
                    const index = parseInt(e.target.dataset.index);
                    this.torles(index);
                });
            });
        }

        // Bezáró gomb eseménykezelő
        const bezarasGomb = this.#kosarElem.querySelector("#kosar-bezaras");
        if (bezarasGomb) {
            bezarasGomb.addEventListener("click", () => {
                document.getElementById("kosarTarolo")?.classList.remove("nyitva");
                document.getElementById("overlay")?.classList.remove("aktiv");
            });
        }
    }

    hozzaad(termek) {
        const letezoIndex = this.#kosarLista.findIndex(t => t.id === termek.id);
        if (letezoIndex > -1) {
            this.#kosarLista[letezoIndex].db++;
        } else {
            this.#kosarLista.push({ ...termek, db: 1 });
        }
        this.megjelenit();
    }

    torles(index) {
        this.#kosarLista.splice(index, 1);
        this.megjelenit();
    }
}
