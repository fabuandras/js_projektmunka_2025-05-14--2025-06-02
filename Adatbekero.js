import { kosar } from "./main.js";
import { megjelenitKezdolap } from "./Kezdolap.js";


export function adatbekeroMegjelenit(tarolo) {
  tarolo.innerHTML = `
    <article class="col-lg-8 offset-lg-2">
      <h2 class="mt-4 mb-4">Adatbekérő űrlap</h2>
      <form id="adatForm" novalidate>
        <div class="mb-3">
          <label for="nev" class="form-label">Név</label>
          <input
            type="text"
            class="form-control"
            id="nev"
            required
            pattern="^[A-ZÁÉÍÓÖŐÚÜŰa-záéíóöőúüű\\s-]{2,}$"
            placeholder="Pl.: Kiss József"
          />
          <div class="invalid-feedback">Adj meg érvényes nevet (min. 2 betű).</div>
        </div>

        <div class="mb-3">
          <label for="szulDatum" class="form-label">Születési dátum</label>
          <input
            type="date"
            class="form-control"
            id="szulDatum"
            required
            max="2020-01-01"
          />
          <div class="invalid-feedback">
            Adj meg érvényes dátumot (pl. 2000-05-01, és ne legyen jövőbeli).
          </div>
        </div>

        <div class="mb-3">
          <label for="telefon" class="form-label">Telefonszám</label>
          <input
            type="tel"
            class="form-control"
            id="telefon"
            required
            pattern="^\\+?[0-9]{7,15}$"
            placeholder="Pl.: +36201234567 vagy 06201234567"
          />
          <div class="invalid-feedback">
            Adj meg érvényes telefonszámot (csak szám, max. 15 számjegy).
          </div>
        </div>

        <div class="mb-3 row">
          <div class="col-md-3">
            <label for="iranyitoszam" class="form-label">Irányítószám</label>
            <input
              type="text"
              class="form-control"
              id="iranyitoszam"
              required
              pattern="^\\d{4}$"
              placeholder="Pl.: 1051"
            />
            <div class="invalid-feedback">Adj meg 4 számjegyű irányítószámot!</div>
          </div>
          <div class="col-md-3">
            <label for="varos" class="form-label">Város</label>
            <input
              type="text"
              class="form-control"
              id="varos"
              required
              placeholder="Pl.: Budapest"
            />
            <div class="invalid-feedback">Város megadása kötelező.</div>
          </div>
          <div class="col-md-4">
            <label for="utca" class="form-label">Utca</label>
            <input
              type="text"
              class="form-control"
              id="utca"
              required
              placeholder="Pl.: Kossuth Lajos utca"
            />
            <div class="invalid-feedback">Utca megadása kötelező.</div>
          </div>
          <div class="col-md-2">
            <label for="hazszam" class="form-label">Házszám</label>
            <input
              type="text"
              class="form-control"
              id="hazszam"
              required
              pattern="^\\d+[a-zA-Z]?$"
              placeholder="Pl.: 5 vagy 12A"
            />
            <div class="invalid-feedback">
              Házszám megadása kötelező (pl. 5 vagy 12A).
            </div>
          </div>
        </div>

        <h4 class="mt-4">Bankkártya adatok</h4>
        <div class="mb-3">
          <label for="kartyaTulajdonos" class="form-label">Kártyatulajdonos neve</label>
          <input
            type="text"
            class="form-control"
            id="kartyaTulajdonos"
            required
            pattern="^[A-ZÁÉÍÓÖŐÚÜŰa-záéíóöőúüű\\s]+$"
            placeholder="Pl.: Kiss József"
          />
          <div class="invalid-feedback">Adj meg érvényes nevet!</div>
        </div>
        <div class="mb-3">
          <label for="bankkartya" class="form-label">Kártyaszám</label>
          <input
            type="text"
            class="form-control"
            id="bankkartya"
            required
            pattern="^\\d{16}$"
            placeholder="Pl.: 1234123412341234"
          />
          <div class="invalid-feedback">Adj meg egy 16 számjegyű bankkártyaszámot!</div>
        </div>
        <div class="mb-3 row">
          <div class="col-md-6">
            <label for="lejartDatum" class="form-label">Lejárati dátum</label>
            <input
              type="month"
              class="form-control"
              id="lejartDatum"
              required
              min="2023-01"
              placeholder="Pl.: 2025-12"
            />
            <div class="invalid-feedback">Adj meg érvényes lejárati dátumot!</div>
          </div>
          <div class="col-md-6">
            <label for="cvv" class="form-label">CVV</label>
            <input
              type="text"
              class="form-control"
              id="cvv"
              required
              pattern="^\\d{3,4}$"
              placeholder="Pl.: 123"
            />
            <div class="invalid-feedback">Adj meg 3 vagy 4 számjegyű CVV kódot!</div>
          </div>
        </div>

        <button type="submit" class="btn btn-success mt-3" id="rendelesLeadasaGomb">Rendelés leadása</button>
      </form>
    </article>
  `;

  const form = document.getElementById("adatForm");

    form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    // Ha érvényes a form:
    alert("✅ A rendelést sikeresen leadtad!");
    kosar.kiuritKosar(); // Most már csak itt ürül
    megjelenitKezdolap(); // Kezdőlapra vissza (ha akarod)

    form.reset();
    form.classList.remove("was-validated");
  });

}
