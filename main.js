import Termekek from "./Termekek.js";
import TERMEKLISTA from "./termekLista.js";
//nav rész ------------
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

// Vélemény oldal betöltése
URLAPGOMB.addEventListener("click", () => {
  TAROLO.innerHTML = `
    <article class="col-lg-12">
      <h2>Vélemény</h2>
      <form id="velemenyForm">
        <div class="mb-3">
          <label for="nev" class="form-label">Név</label>
          <input type="text" class="form-control" id="nev" required />
        </div>
        <div class="mb-3">
          <label for="velemeny" class="form-label">Vélemény</label>
          <textarea class="form-control" id="velemeny" rows="3" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Beküld</button>
      </form>
    </article>
  `;

  document.getElementById("velemenyForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Köszönjük a véleményét!");
  });
});

ADATURLAPGOMB.addEventListener("click", () => {
  TAROLO.innerHTML = `
    <article class="col-lg-8 offset-lg-2">
      <h2 class="mt-4 mb-4">Adatbekérő űrlap</h2>
      <form id="adatForm" novalidate>
        <div class="mb-3">
          <label for="nev" class="form-label">Név</label>
          <input type="text" class="form-control" id="nev" required pattern="^[A-ZÁÉÍÓÖŐÚÜŰa-záéíóöőúüű\\s-]{2,}$" placeholder="Pl.: Kiss József" />
          <div class="invalid-feedback">Adj meg érvényes nevet (min. 2 betű).</div>
        </div>
        
        <div class="mb-3">
          <label for="szulDatum" class="form-label">Születési dátum</label>
          <input type="date" class="form-control" id="szulDatum" required max="2020-01-01" />
          <div class="invalid-feedback">Adj meg érvényes dátumot (pl. 2000-05-01, és ne legyen jövőbeli).</div>
        </div>

        <div class="mb-3">
          <label for="telefon" class="form-label">Telefonszám</label>
          <input type="tel" class="form-control" id="telefon" required pattern="^\\+?[0-9]{7,15}$" placeholder="Pl.: +36201234567 vagy 06201234567" />
          <div class="invalid-feedback">Adj meg érvényes telefonszámot (csak szám, max. 15 számjegy).</div>
        </div>

        <div class="mb-3">
          <label for="lakhely" class="form-label">Lakóhely</label>
          <input type="text" class="form-control" id="lakhely" required placeholder="Pl.: Budapest, Kossuth Lajos utca 5." />
          <div class="invalid-feedback">Lakóhely megadása kötelező.</div>
        </div>

        <div class="mb-3">
          <label for="bankkartya" class="form-label">Bankkártya szám</label>
          <input type="text" class="form-control" id="bankkartya" required pattern="^\\d{16}$" placeholder="Pl.: 1234123412341234" />
          <div class="invalid-feedback">Adj meg egy 16 számjegyű bankkártyaszámot!</div>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Email cím</label>
          <input type="email" class="form-control" id="email" required placeholder="Pl.: valaki@email.hu" />
          <div class="invalid-feedback">Adj meg érvényes email címet!</div>
        </div>

        <button type="submit" class="btn btn-success">Elküldés</button>
      </form>
    </article>
  `;

  // Bootstrap 5-ös validáció JS-ben:
  const form = document.getElementById("adatForm");
  form.addEventListener("submit", function (event) {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault(); // ide jöhet adatkezelés pl. mentés
      alert("Sikeres beküldés!");
    }
    form.classList.add("was-validated");
  });
});
