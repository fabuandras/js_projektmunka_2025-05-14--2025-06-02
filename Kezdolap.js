const TAROLO = document.getElementById("tarolo");

export default class Kezdolap {
  #tarolo;
  #velemenyek;

  constructor(tarolo = TAROLO, velemenyek = []) {
    this.#tarolo = tarolo;
    this.#velemenyek = velemenyek;
  }

  setVelemenyek(velemenyek) {
    this.#velemenyek = velemenyek;
  }

  megjelenit() {
    this.#tarolo.innerHTML = `

    <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="text-center">
            <h1 class="display-5 fw-bold gradient-text">Üdvözöllek az oldalon!</h1>
            <p class="fs-3">Kellemes időtöltést kívánunk!</p>

            <!-- Gombok -->
            <div class="d-flex justify-content-center gap-3 mt-4">
                <a class="btn btn-dark btn-style btn-dark-custom" href="#kapcsolat">Kapcsolat</a>
                <a class="btn btn-light btn-style btn-light-custom" href="#velemenyek">Vélemények</a>
            </div>

            <!-- GitHub ikon -->
            <div class="github-icon mt-3">
                <i class="bi bi-github"></i>
            </div>
        </div>
    </div>
      <article>
      <h1 class="gradient-title pt-5">Rólunk</h1>

        <div class="about-card">
  <h2>Rólunk</h2>
  <p>
    Üzletünk a minőségi, kézzel készített fa ajándéktárgyak szakértője.
    Kizárólag természetes alapanyagokból, körültekintően válogatott faanyagokból dolgozunk,
    hogy minden termékünk egyedi, tartós és esztétikus legyen.
  </p>
  <p>
    Minden nálunk kapható darab kézműves mesterek keze munkáját dicséri, akik nagy gondossággal
    és precizitással alkotják meg az egyszerre elegáns és időtálló ajándékokat. 
    Termékkínálatunkban találhatók dísztárgyak, használati tárgyak, egyedi gravírozott ajándékok, 
    melyek kiváló választások személyes vagy üzleti ajándékozáshoz.
  </p>
  <p>
    Elkötelezettek vagyunk a fenntartható gazdálkodás és a környezetbarát megoldások mellett,
    így a nálunk vásárolt termékek nemcsak szépek, hanem felelősségteljes választások is.
    Munkatársaink szívesen segítenek személyre szabott ajándékok tervezésében és kiválasztásában,
    hogy vásárlóink számára valóban különleges és maradandó élményt nyújtsunk.
  </p>
</div>

<h1 class="gradient-title pt-5">Csapatunk</h1>
        <section class="team-section">
  <h2>Munkatársak: Csapatunk</h2>
  <p class="intro">Üzletünk sikerének kulcsa elkötelezett és szakértő munkatársainkban rejlik, akik nemcsak a fa megmunkálásának mesterei, hanem a kézműves alkotás iránti szenvedélyük is inspirálja őket.</p>

  <div class="team-card">
    <img src="kepek/Munkatars1.png" alt="Kovács Anna" />
    <div class="card-body">
      <h5 class="card-title">Kovács Anna – Művészeti vezető</h5>
      <p class="card-text">Anna több mint tíz éve foglalkozik fa megmunkálással és designnal. Kreatív látásmódjával és precizitásával biztosítja, hogy minden termékünk egyszerre legyen esztétikus és időtálló.</p>
    </div>
  </div>

  <div class="team-card">
    <img src="kepek/Munkatars2.png" alt="Nagy Péter" />
    <div class="card-body">
      <h5 class="card-title">Nagy Péter – Kézműves mester</h5>
      <p class="card-text">Péter a részletek embere, aki a legbonyolultabb gravírozási és faragási munkákat is magabiztosan végzi. Tapasztalata révén segít ügyfeleink egyedi elképzeléseinek megvalósításában.</p>
    </div>
  </div>

  <div class="team-card">
    <img src="kepek/Munkatars3.png" alt="Kiss Éva" />
    <div class="card-body">
      <h5 class="card-title">Kiss Éva – Ügyfélszolgálati szakértő</h5>
      <p class="card-text">Éva az a mosoly az üzletben, aki minden vásárlónkat személyre szabott tanáccsal lát el, és gondoskodik róla, hogy a vásárlási élmény zökkenőmentes és kellemes legyen.</p>
    </div>
  </div>

  <p class="conclusion">Csapatunk összhangja és szakmai hozzáértése garantálja, hogy üzletünkben a minőség és a vásárlói elégedettség mindig első helyen áll.</p>
</section>

<h1 class="gradient-title pt-5" id="velemenyek">Vélemények</h1>
        <section class="mb-5">
  <h2 style="text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif;">Vélemények</h2>
  <div id="velemenyekLista">
    ${
      this.#velemenyek.length === 0
        ? `<p>Még nincs vélemény.</p>`
        : this.#velemenyek
            .map(velemeny => `
              <div class="velemeny-card">
                <h5>${velemeny.nev} 
                  <small>${'★'.repeat(velemeny.ertekeles)}${'☆'.repeat(5 - velemeny.ertekeles)}</small>
                </h5>
                <p>${velemeny.velemeny}</p>
                ${velemeny.kepURL ? `<img src="${velemeny.kepURL}" alt="Csatolt kép"/>` : ''}
              </div>
            `)
            .join('')
    }
  </div>
</section>

<h1 class="gradient-title pt-5" id="kapcsolat">Kapcsolat</h1>
<div class="contact-card">
    <h2>Elérhetőségek</h2>

    <div class="contact-info">
      <i class="bi bi-telephone-fill"></i>
      <span>+36 20 333 1400</span>
    </div>

    <div class="contact-info">
      <i class="bi bi-envelope-fill"></i>
      <span>info@barkacsbaro.hu</span>
    </div>

    <div class="divider"></div>

    <div class="social-icons">
      <i class="bi bi-facebook"></i>
      <i class="bi bi-instagram"></i>
      <i class="bi bi-snapchat"></i>
      <i class="bi bi-youtube"></i>
    </div>
  </div>


      </article>
    `;
  }
}

const kezdo = new Kezdolap();

export function megjelenitKezdolap(velemenyek = []) {
  kezdo.setVelemenyek(velemenyek);
  kezdo.megjelenit();
}
