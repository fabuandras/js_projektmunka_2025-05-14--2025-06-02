import { megjelenitKezdolap } from "./Kezdolap.js";

export default class AdatbekeroUrlap {
  #tarolo;
  #kosar;

  constructor(tarolo, kosar) {
    this.#tarolo = tarolo;
    this.#kosar = kosar;
    this.#megjelenit();
  }

  #megjelenit() {
    this.#tarolo.innerHTML = `
      <h1 class="gradient-title" style="margin-top: 200px;">Adatbekérő</h1>
      <article class="col-lg-8 offset-lg-2">
        <h2 class="mt-4 mb-4">Adatbekerő űrlap</h2>
        <form id="adatForm" novalidate>
          <!-- NÉV -->
          <div class="mb-3">
            <label for="nev" class="form-label">Név:</label>
            <input type="text" class="form-control" id="nev" required pattern="^[A-Za-z\\s-]{2,}$" placeholder="Pl.: Kiss József"/>
            <div class="invalid-feedback">Adj meg érvényes nevet (min. 2 betű).</div>
          </div>
          <!-- DÁTUM -->
          <div class="mb-3">
            <label for="szulDatum" class="form-label">Születési dátum:</label>
            <input type="date" class="form-control" id="szulDatum" required max="2020-01-01"/>
            <div class="invalid-feedback">Adj meg érvényes dátumot.</div>
          </div>
          <!-- TELEFON -->
          <div class="mb-3">
            <label for="telefon" class="form-label">Telefonszám:</label>
            <input type="tel" class="form-control" id="telefon" required pattern="^\\+?[0-9]{7,15}$" placeholder="Pl.: +36 201 23 4567"/>
            <div class="invalid-feedback">Adj meg érvényes telefonszámot.</div>
          </div>
          <!-- CÍM -->
          <div class="mb-3 row">
            <div class="col-md-3">
              <label for="iranyitoszam" class="form-label">Irányítószám:</label>
              <input type="text" class="form-control" id="iranyitoszam" required pattern="^\\d{4}$"/>
              <div class="invalid-feedback">4 számjegy kell.</div>
            </div>
            <div class="col-md-3">
              <label for="varos" class="form-label">Város:</label>
              <input type="text" class="form-control" id="varos" required/>
            </div>
            <div class="col-md-4">
              <label for="utca" class="form-label">Utca:</label>
              <input type="text" class="form-control" id="utca" required/>
            </div>
            <div class="col-md-2">
              <label for="hazszam" class="form-label">Házszám:</label>
              <input type="text" class="form-control" id="hazszam" required pattern="^\\d+[a-zA-Z]?$"/>
            </div>
          </div>
          <!-- KÁRTYA -->
          <h4 class="mt-4">Bankkártya adatok</h4>
          <div class="mb-3">
            <label for="kartyaTulajdonos" class="form-label">Kártya tulajdonos neve:</label>
            <input type="text" class="form-control" id="kartyaTulajdonos" required pattern="^[A-Za-z\\s]+$"/>
          </div>
          <div class="mb-3">
            <label for="bankkartya" class="form-label">Kártyaszám:</label>
            <input type="text" class="form-control" id="bankkartya" required pattern="^\\d{16}$"/>
          </div>
          <div class="mb-3 row">
            <div class="col-md-6">
              <label for="lejartDatum" class="form-label">Lejárati dátum:</label>
              <input type="month" class="form-control" id="lejartDatum" required min="2023-01"/>
            </div>
            <div class="col-md-6">
              <label for="cvv" class="form-label">CVV:</label>
              <input type="text" class="form-control" id="cvv" required pattern="^\\d{3,4}$"/>
            </div>
          </div>

          <button type="submit" class="btn btn-success mt-3" id="rendelesLeadasaGomb">Rendelés leadása</button>
        </form>
      </article>
    `;

    this.#urlapEsemenyek();
  }

  #urlapEsemenyek() {
    const form = document.getElementById("adatForm");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      alert("✅ Rendeles sikeresen leadva!");
      this.#kosar.kiuritKosar();
      megjelenitKezdolap();

      form.reset();
      form.classList.remove("was-validated");
    });
  }
}
