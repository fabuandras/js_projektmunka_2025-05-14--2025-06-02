import TERMEKLISTA from "./termekLista.js";
export default class Termek {
    #adat;
    #szElem;
    #index;
    constructor(adat, szElem, index) {
        this.#adat = adat;
        this.#szElem = szElem;
        this.#index = index;
        this.megjelenit();
    }
    megjelenit() {
        const termekKartya = document.createElement("div");
        termekKartya.classList.add("termekKartya");
        termekKartya.innerHTML = `
            <div class="card m-2" style="width: 18rem;">
                <img src="${this.#adat.kep}" class="card-img-top" alt="${this.#adat.nev}" />
                <div class="card-body">
                    <h5 class="card-title">${this.#adat.nev}</h5>
                    <p class="fw-bold">${this.#adat.ar} Ft</p>
                    <p class="card-text">${this.#adat.leiras}</p>
                    <button id="kosarba${this.#index}">Kosárba</button>
                </div>
            </div>
        `;
        this.#szElem.appendChild(termekKartya);
        this.#kosarbaGombEsemeny();
    }
    #kosarbaGombEsemeny() {
        const kosarGomb = document.getElementById(`kosarba${this.#index}`);
        kosarGomb.addEventListener("click", () => {
            console.log(`${this.#adat.nev} hozzáadta a kosarához! :)`);
            const esemeny = new CustomEvent("kosarba", {
                detail: this.#adat,
            });
            window.dispatchEvent(esemeny);
        });
    }
}
