import Termekek from "./Termekek.js";
import TERMEKLISTA from "./termekLista.js";
import { urlapBetoltes, urlapInit } from "./Velemeny.js";
import { adatbekeroMegjelenit } from "./Adatbekero.js";
import { megjelenitKezdolap } from "./Kezdolap.js";  // ide importálod

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
