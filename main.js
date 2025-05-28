import Termekek from "./Termekek.js";
import TERMEKLISTA from "./termekLista.js";
import Kosar from "./Kosar.js";
import { urlapBetoltes, urlapInit } from "./Velemeny.js";
import { adatbekeroMegjelenit } from "./Adatbekero.js";
import { megjelenitKezdolap } from "./Kezdolap.js";  // ide importálod


// ...



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

KEZDOLAPGOMB.addEventListener("click", () => {
  megjelenitKezdolap();
});

TERMEKEKGOMB.addEventListener("click", () => {
  TAROLO.innerHTML = `
    <article class="col-lg-9 row" id="termekekTarolo"></article>
    <aside class="col-lg-3" id="kosarTarolo"></aside>
  `;

  const termekTarolo = document.getElementById("termekekTarolo");
  const kosarTarolo = document.getElementById("kosarTarolo");

  termekek.megjelenit(termekTarolo); // ezt meg kell támogatni
  new Kosar(kosarTarolo);
});

URLAPGOMB.addEventListener("click", () => {
  urlapBetoltes(TAROLO);
  urlapInit(TAROLO, velemenyek, megjelenitKezdolap);
});

ADATURLAPGOMB.addEventListener("click", () => {
  adatbekeroMegjelenit(TAROLO);
});
KEZDOLAPGOMB.addEventListener("click", () => {
  megjelenitKezdolap(velemenyek);
});

URLAPGOMB.addEventListener("click", () => {
  urlapBetoltes(TAROLO);
  urlapInit(TAROLO, velemenyek, () => megjelenitKezdolap(velemenyek));
});

// Alapértelmezett indulás: kezdőlap megjelenítése
megjelenitKezdolap(velemenyek);

// Alapértelmezett indulás: kezdőlap megjelenítése
megjelenitKezdolap();
