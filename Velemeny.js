export default class Velemeny {
  #tarolo;
  #velemenyek;
  #megjelenitKezdolap;

  constructor(tarolo, velemenyek, megjelenitKezdolap) {
    this.#tarolo = tarolo;
    this.#velemenyek = velemenyek;
    this.#megjelenitKezdolap = megjelenitKezdolap;
    this.#megjelenit();
    this.#initEsemenyek();
  }

  #megjelenit() {
    this.#tarolo.innerHTML = `
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
              ${[1, 2, 3, 4, 5].map(i => `<span class="star" data-value="${i}" style="font-size: 1.5rem; cursor: pointer;">☆</span>`).join('')}
            </div>
            <input type="hidden" id="ertekeles" name="ertekeles" required />
            <div class="invalid-feedback">Kérjük, adj meg egy értékelést!</div>
          </div>

          <div class="mb-3">
            <label for="velemeny" class="form-label">Vélemény</label>
            <textarea class="form-control" id="velemeny" rows="3" required></textarea>
            <div class="invalid-feedback">Kérjük, írd meg a véleményedet!</div>
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

  #initEsemenyek() {
    const form = this.#tarolo.querySelector("#velemenyForm");
    const stars = this.#tarolo.querySelectorAll("#starRating .star");
    const ertekelesInput = this.#tarolo.querySelector("#ertekeles");

    stars.forEach((star) => {
      star.addEventListener("click", () => {
        const rating = star.getAttribute("data-value");
        ertekelesInput.value = rating;

        stars.forEach((s) => {
          s.textContent = s.getAttribute("data-value") <= rating ? "★" : "☆";
        });
      });
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!form.checkValidity() || !ertekelesInput.value) {
        if (!ertekelesInput.value) {
          ertekelesInput.setCustomValidity("Kérjük, válassz csillagértékelést!");
        } else {
          ertekelesInput.setCustomValidity("");
        }
        form.classList.add("was-validated");
        return;
      }

      let kepURL = "";
      const fileInput = this.#tarolo.querySelector("#kep");
      if (fileInput.files && fileInput.files[0]) {
        kepURL = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(fileInput.files[0]);
        });
      }

      const ujVelemeny = {
        nev: this.#tarolo.querySelector("#nev").value.trim(),
        ertekeles: parseInt(ertekelesInput.value),
        velemeny: this.#tarolo.querySelector("#velemeny").value.trim(),
        kepURL,
      };

      this.#velemenyek.push(ujVelemeny);

      alert("Köszönjük a véleményedet és az értékelést!");

      form.reset();
      stars.forEach((s) => (s.textContent = "☆"));
      ertekelesInput.value = "";
      this.#megjelenitKezdolap();
    });
  }
}
