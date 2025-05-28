export function urlapBetoltes(tarolo) {
  tarolo.innerHTML = `
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
}

export function urlapInit(tarolo, velemenyek, megjelenitKezdolap) {
  const stars = tarolo.querySelectorAll("#starRating .star");
  const ertekelesInput = tarolo.querySelector("#ertekeles");
  const form = tarolo.querySelector("#velemenyForm");

  // Csillag értékelés kezelése
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const rating = star.getAttribute("data-value");
      ertekelesInput.value = rating;

      stars.forEach((s) => {
        s.textContent = s.getAttribute("data-value") <= rating ? "★" : "☆";
      });
    });
  });

  // Űrlap beküldésének kezelése
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

    // Kép base64-be olvasása, ha van
    const fileInput = tarolo.querySelector("#kep");
    let kepURL = "";
    if (fileInput.files && fileInput.files[0]) {
      kepURL = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(fileInput.files[0]);
      });
    }

    // Új vélemény objektum összeállítása
    const ujVelemeny = {
      nev: tarolo.querySelector("#nev").value.trim(),
      ertekeles: parseInt(ertekelesInput.value),
      velemeny: tarolo.querySelector("#velemeny").value.trim(),
      kepURL,
    };

    velemenyek.push(ujVelemeny);

    alert("Köszönjük a véleményedet és az értékelést!");

    form.reset();
    stars.forEach((s) => (s.textContent = "☆"));
    ertekelesInput.value = "";

    megjelenitKezdolap();
  });
}
