export default class Kosar {
    #kosarElem;
    #kosarLista = [];

    constructor(szuloElem) {
        this.#kosarElem = szuloElem;
        this.megjelenit();
        window.addEventListener("kosarba", (event) => {
            this.hozzaad(event.detail);
        });
    }

    megjelenit() {
        this.#kosarElem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h3>🛒Kosár</h3>
                <button class="btn btn-sm btn-outline-secondary" id="kosar-bezaras" title="Kosár bezárása">❌</button>
            </div>
            <ul id="kosarLista" class="list-group"></ul>
            <div id="kosarOsszeg" class="mt-3 text-end fw-bold"></div>
            <button id="rendelesGomb" class="btn btn-success mt-2 w-100">Rendelés leadása</button>
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

        const bezarasGomb = this.#kosarElem.querySelector("#kosar-bezaras");
        if (bezarasGomb) {
            bezarasGomb.addEventListener("click", () => {
                document.getElementById("kosarTarolo")?.classList.remove("nyitva");
                document.getElementById("overlay")?.classList.remove("aktiv");
            });
        }
        const osszeg = this.#kosarLista.reduce((sum, t) => sum + t.ar * t.db, 0);
        this.#kosarElem.querySelector("#kosarOsszeg").textContent = `Végösszeg: ${this.#formatAr(osszeg)} Ft`;

        const rendelesGomb = this.#kosarElem.querySelector("#rendelesGomb");
        rendelesGomb.addEventListener("click", () => {
            if (this.#kosarLista.length === 0) {
                alert("❗ A kosár üres!");
            } else {
                alert("✅ Köszönjük, a rendelését rögzítettük!");
                this.#kosarLista = [];
                this.megjelenit();
            }
        });

        const szamlaloElem = document.getElementById("kosarSzamlalo");
            if (szamlaloElem) {
                const db = this.#kosarLista.reduce((osszes, t) => osszes + t.db, 0);
            if (db > 0) {
                szamlaloElem.textContent = db;
                szamlaloElem.style.display = "inline-block";
            } else {
                szamlaloElem.textContent = "";
                szamlaloElem.style.display = "none";
            }
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
    
    getKosarLista() {
        return this.#kosarLista;
    }
}
