import Modell from "./Modell.js";
// Importálás a Termekek.js fájlhoz, ha szükséges
// import {  } from "./Termekek.js";

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
  TAROLO.innerHTML = ` 
    <article class="col-lg-12">
      <h2>Vélemény írása</h2>
      <form id="velemenyForm">
        <div class="mb-3">
          <label for="velemenyNev" class="form-label">Név</label>
          <input type="text" class="form-control" id="velemenyNev" required />
        </div>
        <div class="mb-3">
          <label for="velemenyEmail" class="form-label">Email</label>
          <input type="email" class="form-control" id="velemenyEmail" required />
        </div>
        <div class="mb-3">
          <label for="velemenySzoveg" class="form-label">Vélemény</label>
          <textarea class="form-control" id="velemenySzoveg" rows="4" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Küldés</button>
      </form>
    </article>
  `;
  
  const velemenyForm = document.getElementById("velemenyForm");
  velemenyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nev = document.getElementById("velemenyNev").value;
    const email = document.getElementById("velemenyEmail").value;
    const szoveg = document.getElementById("velemenySzoveg").value;
    
    console.log("Vélemény beküldve:", nev, email, szoveg);
    // Itt küldheted el az adatokat a backend API-ra vagy tárolhatod őket
  });
});

// Vásárlói adatbekérő űrlap létrehozása
ADATURLAPGOMB.addEventListener("click", () => {
  TAROLO.innerHTML = `
    <article class="col-lg-12">
      <h2>Vásárlói adatok</h2>
      <form id="adatBekeroForm">
        <div class="mb-3">
          <label for="vasarloNev" class="form-label">Név</label>
          <input type="text" class="form-control" id="vasarloNev" required />
        </div>
        <div class="mb-3">
          <label for="vasarloCim" class="form-label">Cím</label>
          <input type="text" class="form-control" id="vasarloCim" required />
        </div>
        <div class="mb-3">
          <label for="vasarloTelefon" class="form-label">Telefonszám</label>
          <input type="tel" class="form-control" id="vasarloTelefon" required />
        </div>
        <div class="mb-3">
          <label for="vasarloEmail" class="form-label">Email</label>
          <input type="email" class="form-control" id="vasarloEmail" required />
        </div>
        <button type="submit" class="btn btn-primary">Küldés</button>
      </form>
    </article>
  `;
  
  const adatBekeroForm = document.getElementById("adatBekeroForm");
  adatBekeroForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nev = document.getElementById("vasarloNev").value;
    const cim = document.getElementById("vasarloCim").value;
    const telefon = document.getElementById("vasarloTelefon").value;
    const email = document.getElementById("vasarloEmail").value;
    
    console.log("Vásárlói adatok beküldve:", nev, cim, telefon, email);
    // Itt küldheted el az adatokat a backend API-ra vagy tárolhatod őket
  });
});

// Funkció a termékek megjelenítéséhez
function termekekMegjelenit(lista) {
  TAROLO.querySelector("article").innerHTML = "";
  lista.forEach((termek) => {
    TAROLO.querySelector("article").innerHTML += `
      <div class="termek">
        <h4>${termek.name}</h4>
        <p>${termek.description}</p>
        <p>Ár: ${termek.price} Ft</p>
      </div>
    `;
  });
}
