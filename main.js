import Termekek from "./Termekek.js";
import TERMEKLISTA from "./termekLista.js";
//nav rész ------------
const KEZDOLAPGOMB = document.getElementById("kezdolap");
const TERMEKEKGOMB = document.getElementById("publicTermek");
const KOSARGOMB = document.getElementById("publicKosar");
const URLAPGOMB = document.getElementById("urlap");
const ADATURLAPGOMB = document.getElementById("adaturlap");
const TAROLO = document.getElementById("tarolo");

const termekek = new Termekek(TERMEKLISTA, TAROLO);  // Az osztály helyes meghívása 'new' kulcsszóval

const velemenyek = []; // Véleményeket tároló tömb

// Kezdőlap megjelenítő függvény, kiegészítve véleményekkel
function megjelenitKezdolap() {
  TAROLO.innerHTML = ` 
    <article class="col-lg-12">
      <div class="kezdolap">
        <h2>Üdvözöljük a webáruházban!</h2>
        <p>Kérjük, válasszon a fenti menüpontok közül.</p>
      </div>
    </article>
  `;

  if (velemenyek.length > 0) {
    const cardContainer = document.createElement("div");
    cardContainer.className = "velemeny-kartyak row mt-4";

    velemenyek.forEach(({ nev, ertekeles, velemeny, kepURL }) => {
      const stars = "★".repeat(ertekeles) + "☆".repeat(5 - ertekeles);
      const kepHtml = kepURL
        ? `<img src="${kepURL}" alt="Kép a véleményhez" class="img-fluid rounded mb-2" style="max-height: 200px;">`
        : "";
      const card = document.createElement("div");
      card.className = "card col-md-4 mb-3";
      card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${nev}</h5>
          <h6 class="card-subtitle mb-2 text-warning">${stars}</h6>
          ${kepHtml}
          <p class="card-text">${velemeny}</p>
        </div>
      `;
      cardContainer.appendChild(card);
    });

    TAROLO.appendChild(cardContainer);
  }
}

KEZDOLAPGOMB.addEventListener("click", () => {
  megjelenitKezdolap();
});

TERMEKEKGOMB.addEventListener("click", () => {
  TAROLO.innerHTML = `<article class="col-lg-9">Termékek</article><aside class="col-lg-3">Kosár</aside>`;
  termekek.megjelenit();
});

URLAPGOMB.addEventListener("click", () => {
  TAROLO.innerHTML = `
    <article class="col-lg-12">
      <h2>Vélemény</h2>
      <form id="velemenyForm" novalidate>
        <div class="mb-3">
          <label for="nev" class="form-label">Név</label>
          <input type="text" class="form-control" id="nev" required placeholder="Pl.: Kiss József" />
          <div class="invalid-feedback">Kérjük, add meg a neved!</div>
        </div>

        <div class="mb-3">
          <label class="form-label">Értékelés</label>
          <div id="starRating" class="mb-2">
            <span class="star" data-value="1" style="font-size: 1.5rem; cursor: pointer;">☆</span>
            <span class="star" data-value="2" style="font-size: 1.5rem; cursor: pointer;">☆</span>
            <span class="star" data-value="3" style="font-size: 1.5rem; cursor: pointer;">☆</span>
            <span class="star" data-value="4" style="font-size: 1.5rem; cursor: pointer;">☆</span>
            <span class="star" data-value="5" style="font-size: 1.5rem; cursor: pointer;">☆</span>
          </div>
          <input type="hidden" id="ertekeles" name="ertekeles" required />
          <div class="invalid-feedback">Kérjük, adj meg egy értékelést!</div>
        </div>

        <div class="mb-3">
          <label for="velemeny" class="form-label">Vélemény</label>
          <textarea class="form-control" id="velemeny" rows="3" required></textarea>
          <div class="invalid-feedback">Kérjük, írd meg a véleményed!</div>
        </div>

        <div class="mb-3">
          <label for="kep" class="form-label">Kép csatolása (opcionális)</label>
          <input type="file" class="form-control" id="kep" accept="image/*" />
        </div>

        <button type="submit" class="btn btn-primary">Posztol</button>
      </form>
    </article>
  `;

  // Csillagértékelés logika
  const stars = document.querySelectorAll("#starRating .star");
  const ertekelesInput = document.getElementById("ertekeles");

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const rating = star.getAttribute("data-value");
      ertekelesInput.value = rating;

      stars.forEach((s) => {
        s.textContent = s.getAttribute("data-value") <= rating ? "★" : "☆";
      });
    });
  });

  const form = document.getElementById("velemenyForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.checkValidity() || !ertekelesInput.value) {
      e.stopPropagation();
      if (!ertekelesInput.value) {
        ertekelesInput.setCustomValidity("Kérjük, válassz csillagértékelést!");
      } else {
        ertekelesInput.setCustomValidity("");
      }
      form.classList.add("was-validated");
      return;
    }

    // Kép base64-be olvasása
    const fileInput = document.getElementById("kep");
    let kepURL = "";
    if (fileInput.files && fileInput.files[0]) {
      kepURL = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(fileInput.files[0]);
      });
    }

    // Új vélemény objektum
    const ujVelemeny = {
      nev: document.getElementById("nev").value.trim(),
      ertekeles: parseInt(ertekelesInput.value),
      velemeny: document.getElementById("velemeny").value.trim(),
      kepURL,
    };

    velemenyek.push(ujVelemeny);

    alert("Köszönjük a véleményedet és az értékelést!");

    form.reset();
    stars.forEach((s) => (s.textContent = "☆"));
    ertekelesInput.value = "";

    // Vissza a kezdőlapra a véleményekkel együtt
    megjelenitKezdolap();
  });
});

ADATURLAPGOMB.addEventListener("click", () => {
  TAROLO.innerHTML = `
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
            <label for="cvc" class="form-label">CVC szám</label>
            <input
              type="text"
              class="form-control"
              id="cvc"
              required
              pattern="^\\d{3,4}$"
              placeholder="Pl.: 123"
            />
            <div class="invalid-feedback">Adj meg 3 vagy 4 számjegyű CVC kódot!</div>
          </div>
        </div>

        <button type="submit" class="btn btn-success">Elküldés</button>
      </form>
    </article>
  `;

  const form = document.getElementById("adatForm");
  form.addEventListener("submit", function (event) {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      alert("Sikeres beküldés!");
      // Itt lehet adatfeldolgozás, pl. küldés szerverre
    }
    form.classList.add("was-validated");
  });
});

// Alapértelmezett indítás: kezdőlap megjelenítése
megjenelitKezdolap();
