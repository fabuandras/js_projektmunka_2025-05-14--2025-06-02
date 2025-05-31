import Kosar from "../Kosar.js";

const tesztElem = document.createElement("div");
document.body.appendChild(tesztElem);
const kosar = new Kosar(tesztElem);

torlesKosarItemTeszt(); //teszteli hogy jol van-e kezelve a termekek torlese
csokkenoMennyisegTeszt(); //teszteli a csokkentes metodust, csokkenti darabszamot,
// ha a darabszam 1-rol 0-ra csokkenne torli a termeket

function torlesKosarItemTeszt() {
    const termek = { id: 1, nev: "ajtodisz", ar: 1780 };
    kosar.hozzaad(termek);
    console.assert(kosar.getKosarLista().length === 1, "termek nem kerult a kosarba");
    
    kosar.torles(0);
    console.assert(kosar.getKosarLista().length === 0, "termeket nem torolte a kosarbol");
    try {
        kosar.torles(5);
        console.assert(true, "nincs hiba nem letezo elem torlesenel");
    } catch {
        console.assert(false, "van hiba nem letezo elem torlesenel");
    }
    console.log("torlesKosarItemTeszt lefutott");
}

function csokkenoMennyisegTeszt() {
    const termek = { id: 2, nev: "nevtabla", ar: 4300 };
    kosar.hozzaad(termek);
    kosar.hozzaad(termek);

    let lista = kosar.getKosarLista();
    console.assert(lista[0].db === 2, "alap mennyiseg nem 2");

    kosar.csokkentes(0);
    lista = kosar.getKosarLista();
    console.assert(lista[0].db === 1, "nem csokkent 1-re a mennyiseg");

    kosar.csokkentes(0);
    console.assert(kosar.getKosarLista().length === 0, "nem torolte az egy darabos termeket");
    console.log("csokkenoMennyisegTeszt lefutott");
}
