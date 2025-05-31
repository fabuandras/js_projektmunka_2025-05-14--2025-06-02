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
  TAROLO.innerHTML = `<article class="col-lg-12 row" id="termekekTarolo"></article>`;
  const termekTarolo = document.getElementById("termekekTarolo");
  termekek.megjelenit(termekTarolo);
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

// Kosár init
const kosarTarolo = document.getElementById("kosarTarolo");
const overlay = document.getElementById("overlay");
const kosar = new Kosar(kosarTarolo);

// Kosár gomb esemény
KOSARGOMB.addEventListener("click", () => {
  kosarTarolo.classList.add("nyitva");
  overlay.classList.add("aktiv");
});

// Overlay kattintásra kosár bezárása
overlay.addEventListener("click", () => {
  kosarTarolo.classList.remove("nyitva");
  overlay.classList.remove("aktiv");
});

document.querySelector('.kosar-bezaras').addEventListener('click', () => {
  document.querySelector('.kosar-aside').classList.remove('nyitva');
  document.querySelector('.overlay').classList.remove('aktiv');
});

document.getElementById("kosarGomb").addEventListener("click", () => {
    document.getElementById("kosarTarolo").classList.add("nyitva");
    document.getElementById("overlay")?.classList.add("aktiv");
});
