import Termekek from "./Termekek.js";
import TERMEKLISTA from "./termekLista.js";
import Kosar from "./Kosar.js";
import AdatbekeroŰrlap from "./Adatbekero.js";
import { megjelenitKezdolap } from "./Kezdolap.js";
import Velemeny from "./Velemeny.js";  // javított import név és fájlnév

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

// Kosár init
const kosarTarolo = document.getElementById("kosarTarolo");
const overlay = document.getElementById("overlay");
const kosar = new Kosar(kosarTarolo);

// Kezdőlap megjelenítése (induláskor)
megjelenitKezdolap(velemenyek);

// Események
KEZDOLAPGOMB.addEventListener("click", () => {
  megjelenitKezdolap(velemenyek);
});

TERMEKEKGOMB.addEventListener("click", () => {
  TAROLO.innerHTML = `
    <div class="row mb-3">
      <div class="col-md-4">
        <label for="rendezesSelect" class="form-label">Rendezés ár szerint:</label>
        <select id="rendezesSelect" class="form-select">
          <option value="alap">Alapértelmezett</option>
          <option value="novekvo">Ár szerint növekvő</option>
          <option value="csokkeno">Ár szerint csökkenő</option>
        </select>
      </div>
      <div class="col-md-4">
        <label for="szuroInput" class="form-label">Szűrés név alapján:</label>
        <input type="text" id="szuroInput" class="form-control" placeholder="Írj be egy terméknevet...">
      </div>
    </div>
    <article class="col-lg-12 row" id="termekekTarolo"></article>
  `;

  const termekTarolo = document.getElementById("termekekTarolo");
  termekek.megjelenit(termekTarolo);

  const rendezesSelect = document.getElementById("rendezesSelect");
  rendezesSelect.addEventListener("change", () => {
    termekek.rendez(rendezesSelect.value);
    termekek.megjelenit(termekTarolo);
  });

  const szuroInput = document.getElementById("szuroInput");
  szuroInput.addEventListener("input", () => {
    termekek.szures(szuroInput.value);
  });
});

// ** Itt javítva: Velemeny helyett VelemenyUrlap NINCS! **
URLAPGOMB.addEventListener("click", () => {
  new Velemeny(TAROLO, velemenyek, () => megjelenitKezdolap(velemenyek));
});

ADATURLAPGOMB.addEventListener("click", () => {
  new AdatbekeroŰrlap(TAROLO, kosar);
});

// Kosár gomb
KOSARGOMB.addEventListener("click", () => {
  kosarTarolo.classList.add("nyitva");
  overlay.classList.add("aktiv");
});

// Overlay kattintásra bezárás
overlay.addEventListener("click", () => {
  kosarTarolo.classList.remove("nyitva");
  overlay.classList.remove("aktiv");
});

const bezarasGomb = document.querySelector('.kosar-bezaras');
if (bezarasGomb) {
  bezarasGomb.addEventListener('click', () => {
    document.querySelector('.kosar-aside')?.classList.remove('nyitva');
    document.querySelector('.overlay')?.classList.remove('aktiv');
  });
}

const kosarGomb = document.getElementById("kosarGomb");
if (kosarGomb) {
  kosarGomb.addEventListener("click", () => {
    document.getElementById("kosarTarolo")?.classList.add("nyitva");
    document.getElementById("overlay")?.classList.add("aktiv");
  });
}

// (opcionális) Kosár számláló frissítéshez
let kosarDarab = 0;
function frissitKosarSzamlalo(darab) {
  const szamlaloElem = document.getElementById("kosarSzamlalo");
  if (szamlaloElem) {
    szamlaloElem.textContent = darab > 0 ? darab : "";
    szamlaloElem.style.display = darab > 0 ? "inline-block" : "none";
  }
}

window.addEventListener("kosarba", (event) => {
  kosarDarab++;
  frissitKosarSzamlalo(kosarDarab);
});

export { kosar };
