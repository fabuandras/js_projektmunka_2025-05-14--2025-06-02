export default class Kezdolap {
  #tarolo;
  #velemenyek;

  constructor(tarolo, velemenyek = []) {
    this.#tarolo = tarolo;
    this.#velemenyek = velemenyek;
    this.#megjelenit();
  }

  #megjelenit() {
    this.#tarolo.innerHTML = `
      <article class="col-lg-12 kezdolap-article">
        <section class="mb-5">
          <h2>Rólunk</h2>
          <p>Üzletünk a minőségi, kézzel készített fa ajándéktárgyak szakértője. Kizárólag természetes alapanyagokból, körültekintően válogatott faanyagokból dolgozunk, hogy minden termékünk egyedi, tartós és esztétikus legyen.</p>
          <p>Minden nálunk kapható darab kézműves mesterek keze munkáját dicséri, akik nagy gondossággal és precizitással alkotják meg az egyszerre elegáns és időtálló ajándékokat.</p>
          <p>Elkötelezettek vagyunk a fenntartható gazdálkodás és a környezetbarát megoldások mellett...</p>
        </section>

        <section class="mb-5">
          <h2>Történetünk</h2>
          <p>Cégünk alapításakor az volt a célunk, hogy a fa természetes szépségét és melegségét kézzel készített, egyedi ajándéktárgyakban ötvözzük...</p>
          <p>Minden termékünk mesterségbeli tudásról és elhivatottságról tanúskodik...</p>
          <p>Számunkra fontos, hogy a kézműves munka és a fenntarthatóság kéz a kézben járjon...</p>
          <p>Üzletünk nem csak egy bolt, hanem egy hely, ahol a természetes anyagok és a kreativitás találkozik...</p>
        </section>

        <section class="mb-5">
          <h2>Munkatársak: Csapatunk</h2>
          <div class="card mb-3 d-flex flex-row align-items-center">
            <img src="kepek/Munkatars1.jpg" alt="Kovács Anna" class="munkatars-kep" />
            <div class="card-body">
              <h5 class="card-title">Kovács Anna – Művészeti vezető</h5>
              <p class="card-text">Anna több mint tíz éve foglalkozik fa megmunkálással és designnal...</p>
            </div>
          </div>

          <div class="card mb-3 d-flex flex-row align-items-center">
            <img src="kepek/Munkatars2.jpg" alt="Nagy Péter" class="munkatars-kep" />
            <div class="card-body">
              <h5 class="card-title">Nagy Péter – Kézműves mester</h5>
              <p class="card-text">Péter a részletek embere, aki a legbonyolultabb gravírozási és faragási munkákat is magabiztosan végzi...</p>
            </div>
          </div>

          <div class="card mb-3 d-flex flex-row align-items-center">
            <img src="kepek/Munkatars3.jpg" alt="Kiss Éva" class="munkatars-kep" />
            <div class="card-body">
              <h5 class="card-title">Kiss Éva – Ügyfélszolgálati szakértő</h5>
              <p class="card-text">Éva az a mosoly az üzletben, aki minden vásárlónkat személyre szabott tanáccsal lát el...</p>
            </div>
          </div>

          <p>Csapatunk összhangja és szakmai hozzáértése garantálja, hogy üzletünkben a minőség és a vásárlói elégedettség mindig első helyen áll.</p>
        </section>

        <section class="mb-5">
          <h2>Vélemények</h2>
          <div id="velemenyekLista">
            ${
              this.#velemenyek.length === 0
                ? `<p>Még nincs vélemény.</p>`
                : this.#velemenyek
                    .map(
                      (velemeny) => `
              <div class="card mb-3">
                <div class="card-body">
                  <h5 class="card-title">${velemeny.nev}
                    <small class="text-warning">
                      ${'★'.repeat(velemeny.ertekeles)}${'☆'.repeat(5 - velemeny.ertekeles)}
                    </small>
                  </h5>
                  <p class="card-text">${velemeny.velemeny}</p>
                  ${
                    velemeny.kepURL
                      ? `<img src="${velemeny.kepURL}" alt="Csatolt kép" class="img-fluid" style="max-height: 200px;" />`
                      : ''
                  }
                </div>
              </div>`
                    )
                    .join('')
            }
          </div>
        </section>
      </article>
    `;
  }
}
