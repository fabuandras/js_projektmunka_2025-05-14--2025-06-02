const TAROLO = document.getElementById("tarolo");

export function megjelenitKezdolap(velemenyek = []) {
  TAROLO.innerHTML = `
    <article class="col-lg-12 kezdolap-article">
      <section class="mb-5">
        <h2>Rólunk</h2>
        <p>Üzletünk a minőségi, kézzel készített fa ajándéktárgyak szakértője. Kizárólag természetes alapanyagokból, körültekintően válogatott faanyagokból dolgozunk, hogy minden termékünk egyedi, tartós és esztétikus legyen.</p>
        <p>Minden nálunk kapható darab kézműves mesterek keze munkáját dicséri, akik nagy gondossággal és precizitással alkotják meg az egyszerre elegáns és időtálló ajándékokat. Termékkínálatunkban találhatók dísztárgyak, használati tárgyak, egyedi gravírozott ajándékok, melyek kiváló választások személyes vagy üzleti ajándékozáshoz.</p>
        <p>Elkötelezettek vagyunk a fenntartható gazdálkodás és a környezetbarát megoldások mellett, így a nálunk vásárolt termékek nemcsak szépek, hanem felelősségteljes választások is. Munkatársaink szívesen segítenek személyre szabott ajándékok tervezésében és kiválasztásában, hogy vásárlóink számára valóban különleges és maradandó élményt nyújtsunk.</p>
      </section>

      <section class="mb-5">
        <h2>Történetünk</h2>
        <p>Cégünk alapításakor az volt a célunk, hogy a fa természetes szépségét és melegségét kézzel készített, egyedi ajándéktárgyakban ötvözzük. Hiszünk abban, hogy egy gondosan megmunkált fa ajándék nem csupán tárgy, hanem érték, amely személyes üzenetet hordoz, és maradandó emlékeket teremt.</p>
        <p>Minden termékünk mesterségbeli tudásról és elhivatottságról tanúskodik. Munkatársaink gondosan válogatják az alapanyagokat, és a legapróbb részletekre is odafigyelnek a készítés során, hogy vásárlóink számára valóban különleges, időtálló darabokat kínálhassunk.</p>
        <p>Számunkra fontos, hogy a kézműves munka és a fenntarthatóság kéz a kézben járjon. Ezért törekszünk környezetbarát forrásból származó faanyagok felhasználására, és támogatjuk a helyi kézműves közösségeket.</p>
        <p>Üzletünk nem csak egy bolt, hanem egy hely, ahol a természetes anyagok és a kreativitás találkozik. Hiszünk abban, hogy az általunk készített ajándékok képesek közelebb hozni egymáshoz az embereket, és maradandó értéket képviselnek mind az ajándékozó, mind az ajándékozott számára.</p>
      </section>

      <section class="mb-5">
        <h2>Munkatársak: Csapatunk</h2>
        <p>Üzletünk sikerének kulcsa elkötelezett és szakértő munkatársainkban rejlik, akik nemcsak a fa megmunkálásának mesterei, hanem a kézműves alkotás iránti szenvedélyük is inspirálja őket.</p>

        <div class="card mb-3 d-flex flex-row align-items-center">
          <img src="kepek/Munkatars1.jpg" alt="Kovács Anna" class="munkatars-kep" />
          <div class="card-body">
            <h5 class="card-title">Kovács Anna – Művészeti vezető</h5>
            <p class="card-text">Anna több mint tíz éve foglalkozik fa megmunkálással és designnal. Kreatív látásmódjával és precizitásával biztosítja, hogy minden termékünk egyszerre legyen esztétikus és időtálló.</p>
          </div>
        </div>

        <div class="card mb-3 d-flex flex-row align-items-center">
          <img src="kepek/Munkatars2.jpg" alt="Nagy Péter" class="munkatars-kep" />
          <div class="card-body">
            <h5 class="card-title">Nagy Péter – Kézműves mester</h5>
            <p class="card-text">Péter a részletek embere, aki a legbonyolultabb gravírozási és faragási munkákat is magabiztosan végzi. Tapasztalata révén segít ügyfeleink egyedi elképzeléseinek megvalósításában.</p>
          </div>
        </div>

        <div class="card mb-3 d-flex flex-row align-items-center">
          <img src="kepek/Munkatars3.jpg" alt="Kiss Éva" class="munkatars-kep" />
          <div class="card-body">
            <h5 class="card-title">Kiss Éva – Ügyfélszolgálati szakértő</h5>
            <p class="card-text">Éva az a mosoly az üzletben, aki minden vásárlónkat személyre szabott tanáccsal lát el, és gondoskodik róla, hogy a vásárlási élmény zökkenőmentes és kellemes legyen.</p>
          </div>
        </div>

        <p>Csapatunk összhangja és szakmai hozzáértése garantálja, hogy üzletünkben a minőség és a vásárlói elégedettség mindig első helyen áll.</p>
      </section>

      <section class="mb-5">
        <h2>Vélemények</h2>
        <div id="velemenyekLista">
          ${
            velemenyek.length === 0
              ? `<p>Még nincs vélemény.</p>`
              : velemenyek
                  .map(
                    (velemeny) => `
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="card-title">${velemeny.nev} 
                  <small class="text-warning">${'★'.repeat(
                    velemeny.ertekeles
                  )}${'☆'.repeat(5 - velemeny.ertekeles)}</small>
                </h5>
                <p class="card-text">${velemeny.velemeny}</p>
                ${
                  velemeny.kepURL
                    ? `<img src="${velemeny.kepURL}" alt="Csatolt kép" class="img-fluid" style="max-height: 200px;"/>`
                    : ''
                }
              </div>
            </div>
          `
                  )
                  .join('')
          }
        </div>
      </section>
    </article>
  `;
}
