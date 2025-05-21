import Termekek from "./Termekek.js";
import TERMEKLISTA from "./termekLista.js";

const KEZDOLAPGOMB = document.getElementById("kezdolap");
const TERMEKEKGOMB = document.getElementById("publicTermek");
const KOSARGOMB = document.getElementById("publicKosar");
const URLAPGOMB = document.getElementById("urlap");
const ADATURLAPGOMB = document.getElementById("adaturlap");
const TAROLO = document.getElementById("tarolo");

const LISTA = [];

const termekek = new Termekek(TERMEKLISTA, TAROLO);  // Az osztály helyes meghívása 'new' kulcsszóval

KEZDOLAPGOMB.addEventListener("click", () => {
  TAROLO.innerHTML = ` 
    <article class="col-lg-12">
      <div class="kezdolap">Üdvözöljük a webáruházban!</div>
    </article>
  `;
});

TERMEKEKGOMB.addEventListener("click", () => {
  TAROLO.innerHTML = `<article class="col-lg-9">Termékek</article><aside class="col-lg-3">Kosár</aside>`;
  termekek.megjelenit();  // Most már helyesen hívod meg a metódust
});

// Egyéb eseménykezelők...
