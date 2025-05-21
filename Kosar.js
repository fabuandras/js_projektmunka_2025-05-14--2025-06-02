export default class Kosar {
    #kosarElem;
    #tartalom;
    #termekek;

    constructor(kosarElem) {
      this.#kosarElem = kosarElem; // A táblázatot tartalmazó DOM-elem
      this.#tartalom = []; // A kosár tartalma
      this.#render(); // Kezdeti megjelenítés
    }

    hozzaad(index) {
      // Termék hozzáadása a kosárhoz
      const termek = this.#termekek[index];
      this.#tartalom.push(termek);
      this.#render(); // Táblázat frissítése
    }

    torol(index) {
      // Termék törlése a kosárból
      this.#tartalom.splice(index, 1);
      this.#render(); // Táblázat frissítése
    }

    #render() {
      // Táblázat törlése
      this.#kosarElem.innerHTML = `
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Név</th>
              <th>Ár</th>
              <th>Akció</th>
            </tr>
          </thead>
          <tbody>
            ${this.#tartalom
              .map(
                (termek, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${termek.nev}</td>
                <td>${termek.ar} Ft</td>
                <td>
                  <button class="torlesBtn" data-index="${index}">Törlés</button>
                </td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <div>
          <h3>Vásárolható termékek:</h3>
          <ul>
            ${this.#termekek
              .map(
                (termek, index) => `
              <li>
                ${termek.nev} - ${termek.ar} Ft
                <button class="hozzaadBtn" data-index="${index}">Hozzáad</button>
              </li>
            `
              )
              .join("")}
          </ul>
        </div>
      `;

      // Törlés gomb eseménykezelő
      const torlesBtnList = this.#kosarElem.querySelectorAll('.torlesBtn');
      torlesBtnList.forEach(btn => {
        btn.addEventListener('click', (event) => {
          const index = event.target.getAttribute('data-index');
          this.torol(index); // Törlés az adott index alapján
        });
      });

      // Hozzáad gomb eseménykezelő
      const hozzaadBtnList = this.#kosarElem.querySelectorAll('.hozzaadBtn');
      hozzaadBtnList.forEach(btn => {
        btn.addEventListener('click', (event) => {
          const index = event.target.getAttribute('data-index');
          this.hozzaad(index); // Termék hozzáadása a kosárhoz
        });
      });
    }
}