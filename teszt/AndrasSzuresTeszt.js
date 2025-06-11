import Termekek from "../Termekek.js";
import TERMEKLISTA from "../termekLista.js";

const tesztElem = document.createElement("div");
document.body.appendChild(tesztElem);

const termekek = new Termekek(TERMEKLISTA, tesztElem);

szuresTeszt();

function szuresTeszt() {
    console.log(">> szuresTeszt elindult");

    // 1. Szűrés: "fa" → szinte minden termék tartalmazza
    termekek.szures("fa");
    let lista1 = termekek.getAktualisLista();
    console.assert(lista1.length === 15, "'fa' szóra nem jött vissza az összes termék");

    // 2. Szűrés: "gravírozott" → 5 termék tartalmazza
    termekek.szures("gravírozott");
    let lista2 = termekek.getAktualisLista();
    console.assert(lista2.length === 5, "'gravírozott' szóra nem 5 termék jött vissza");

    // 3. Szűrés: "diy" → 4 termék (névben nagybetűs, de a szűrés kis/nagybetű független)
    termekek.szures("diy");
    let lista3 = termekek.getAktualisLista();
    console.assert(lista3.length === 4, "'diy' szóra nem 4 termék jött vissza");

    // 4. Szűrés: "asztali névtábla" → pontos egy termék
    termekek.szures("asztali névtábla");
    let lista4 = termekek.getAktualisLista();
    console.assert(lista4.length === 1 && lista4[0].nev.includes("asztali"), "'asztali névtábla' nem hozta vissza a megfelelő elemet");

    // 5. Szűrés: "nincsilyen" → 0
    termekek.szures("nincsilyen");
    let lista5 = termekek.getAktualisLista();
    console.assert(lista5.length === 0, "'nincsilyen' szóra nem üres listát kaptunk");

    console.log("szuresTeszt sikeresen lefutott");
}
