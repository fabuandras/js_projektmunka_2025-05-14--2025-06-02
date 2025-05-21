import Modell from "./Modell.js";

const KEZDOLAPGOMB = document.getElementById("kezdolap");
const TERMEKEKGOMB = document.getElementById("publicTermek");
const KOSARGOMB = document.getElementById("publicKosar");
const URLAPGOMB = document.getElementById("urlap");
const ADATURLAPGOMB = document.getElementById("adaturlap");
const TAROLO = document.getElementById("tarolo");
const vegpont = "http://localhost:8000/termekek";  // Használj saját API végpontot
const LISTA = [];
let modell = new Modell(LISTA);

TAROLO.innerHTML = `
  <article class="col-lg-12">
    <div class="kezdolap">Üdvözöljük a webáruházban!</div>
  </article>
`;

KEZDOLAPGOMB.addEventListener("click", () => {
  TAROLO.innerHTML = `
    <article class="col-lg-12">
      <div class="kezdolap">Üdvözöljük a webáruházban!</div>
    </article>
  `;
});

TERMEKEKGOMB.addEventListener("click", () => {
  TAROLO.innerHTML = `<article class="col-lg-9">Termékek</article><aside class="col-lg-3">Kosár</aside>`;
  modell.getAdat(vegpont, termekekMegjelenit);
});

KOSARGOMB.addEventListener("click", () => {
  TAROLO.innerHTML = `<article class="col-lg-12">Kosár tartalom</article>`;
});

URLAPGOMB.addEventListener("click", () => {
  TAROLO.innerHTML = `<article class="col-lg-12">Vélemény írása</article>`;
});

ADATURLAPGOMB.addEventListener("click", () => {
  TAROLO.innerHTML = `<article class="col-lg-12">Vásárlói adatok bekérése</article>`;
});

function termekekMegjelenit(lista) {
  TAROLO.querySelector("article").innerHTML = "";
  lista.forEach((termek) => {
    TAROLO.querySelector("article").innerHTML += `<div class="termek">${termek.name}</div>`;
  });
}
