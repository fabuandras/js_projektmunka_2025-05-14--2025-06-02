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
                        <div class="flex-grow-1 me-3 overflow-hidden">
                            <div class="text-truncate">${termek.nev}</div>
                            <div class="fw-semibold">${this.#formatAr(termek.ar * termek.db)} Ft</div>
                        </div>
                        <div class="d-flex align-items-center flex-shrink-0">
                            <button class="btn btn-sm btn-secondary" data-action="decrease" data-index="${index}">−</button>
                            <span class="mx-2">${termek.db} db</span>
                            <button class="btn btn-sm btn-secondary" data-action="increase" data-index="${index}">+</button>
                            <button class="btn btn-sm btn-danger ms-2" data-action="remove" data-index="${index}">❌</button>
                        </div>
                    </li>
                `)
                .join("");

            this.#kosarElem.querySelectorAll("button[data-action]").forEach((gomb) => {
                gomb.addEventListener("click", (e) => {
                    const index = parseInt(e.target.dataset.index);
                    const action = e.target.dataset.action;

                    if (action === "remove") {
                        this.torles(index);
                    } else if (action === "increase") {
                        this.noveles(index);
                    } else if (action === "decrease") {
                        this.csokkentes(index);
                    }
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

    noveles(index) {
        this.#kosarLista[index].db++;
        this.megjelenit();
    }

    csokkentes(index) {
        if (this.#kosarLista[index].db > 1) {
            this.#kosarLista[index].db--;
        } else {
            this.torles(index);
        }
        this.megjelenit();
    }

    #formatAr(szam) {
        return szam.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
}
