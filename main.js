import Termekek from "./Termekek.js";
import TERMEKLISTA from "./termekLista.js";
import { urlapBetoltes, urlapInit } from "./Velemeny.js";
import { adatbekeroMegjelenit } from "./Adatbekero.js";


// DOM elemek
const KEZDOLAPGOMB = document.getElementById("kezdolap");
const TERMEKEKGOMB = document.getElementById("publicTermek");
const KOSARGOMB = document.getElementById("publicKosar");
const URLAPGOMB = document.getElementById("urlap");
const ADATURLAPGOMB = document.getElementById("adaturlap");
const TAROLO = document.getElementById("tarolo");

// Termékek és vélemények tárolása
const termekek = new Termekek(TERMEKLISTA, TAROLO);
const velemenyek = [];

// Kezdőlap megjelenítése
function megjelenitKezdolap() {
  TAROLO.innerHTML = `
    <article class="col-lg-12">
      <div class="kezdolap">
        <h2>Üdvözöljük a webáruházban!</h2>
        <p>Kérjük, válasszon a fenti menüpontok közül.</p>
      </div>
    </article>
  `;

  if (velemenyek.length > 0) {
    const cardContainer = document.createElement("div");
    cardContainer.className = "velemeny-kartyak row mt-4";

    velemenyek.forEach(({ nev, ertekeles, velemeny, kepURL }) => {
      const stars = "★".repeat(ertekeles) + "☆".repeat(5 - ertekeles);
      const kepHtml = kepURL
        ? `<img src="${kepURL}" alt="Kép a véleményhez" class="img-fluid rounded mb-2" style="max-height: 200px;">`
        : "";
      const card = document.createElement("div");
      card.className = "card col-md-4 mb-3";
      card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${nev}</h5>
          <h6 class="card-subtitle mb-2 text-warning">${stars}</h6>
          ${kepHtml}
          <p class="card-text">${velemeny}</p>
        </div>
      `;
      cardContainer.appendChild(card);
    });

    TAROLO.appendChild(cardContainer);
  }
}

// Eseménykezelők beállítása

KEZDOLAPGOMB.addEventListener("click", () => {
  megjelenitKezdolap();
});

TERMEKEKGOMB.addEventListener("click", () => {
  TAROLO.innerHTML = `<article class="col-lg-9">Termékek</article><aside class="col-lg-3">Kosár</aside>`;
  termekek.megjelenit();
});

URLAPGOMB.addEventListener("click", () => {
  urlapBetoltes(TAROLO);
  urlapInit(TAROLO, velemenyek, megjelenitKezdolap);
});

ADATURLAPGOMB.addEventListener("click", () => {
  adatbekeroMegjelenit(TAROLO);
});

// Alapértelmezett indulás: kezdőlap megjelenítése
megjelenitKezdolap();
