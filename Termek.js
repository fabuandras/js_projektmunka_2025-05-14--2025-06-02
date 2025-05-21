import TERMEKLISTA from "./termekLista.js";
export default class Termek {
    #adat = {};
    #szElem;
    #index;
    constructor(adat, szElem, index) {
        this.#adat = adat;
        this.#szElem = szElem;
        this.#index = index;
        this.megjelenit();
    }
    megjelenit() {
        const html = `
                    <div class="card m-2" style="width: 18rem;">
                    <img src="${this.#adat.kep}" class="card-img-top" alt="${this.#adat.nev}" />
                        <div class="card-body">
                            <h5 class="card-title">${this.#adat.nev}</h5>
                            <p class="fw-bold">${this.#adat.ar} Ft</p>
                            <p class="card-text">${this.#adat.leiras}</p>
                            <a href="#" class="btn btn-primary kosarba" id="kosarba${this.#index}">Kosárba</a>
                        </div>
                    </div>`
        this.#szElem.insertAdjacentHTML("beforeend", html);
        this.#kosarbaGombEsemeny();
    }
    #kosarbaGombEsemeny() {
        const kosarGomb = document.getElementById("kosarba${this.#index}");
        if (kosarGomb) {
        kosarGomb.addEventListener("click", () => {
            console.log(`${this.#adat.nev} hozzáadta a kosarához!:)`);
            const esemeny = new CustomEvent("kosarba", {
                detail: this.#adat,
            });
            window.dispatchEvent(esemeny);  
        });
        } else {
            console.error(`Nem található gomb: kosarba${this.#index}`);
        }
    }
}