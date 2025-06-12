import Termek from "../Termek.js";

function kosarbaEsemenyTeszt() {
    console.log(">> kosarbaEsemenyTeszt elindult");

    const tesztDiv = document.createElement("div");
    document.body.appendChild(tesztDiv);

    const mintaTermek = {
        id: 99,
        kep: "kepek/termekek/fa_teasdoboz_egyedi_gravirozassal.png",
        nev: "Teszt termék",
        ar: 1234,
        leiras: "Ez egy teszt termék leírása"
    };

    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject("❌ Nem érkezett esemény időben");
        }, 2000);

        window.addEventListener("kosarbaTESZT", function handler(e) {
            clearTimeout(timeout);
            window.removeEventListener("kosarbaTESZT", handler);

            const termekAdat = e.detail;
            console.assert(termekAdat.nev === "Teszt termék", "❌ Hibás terméknév");
            console.assert(termekAdat.ar === 1234, "❌ Hibás ár");
            console.log("✅ kosarbaEsemenyTeszt sikeresen lefutott");
            resolve();
        });

        // Létrehozzuk a terméket, teszthez egyedi eseménynévvel
        const termek = new Termek(mintaTermek, tesztDiv, 0, "kosarbaTESZT");

        // Gombkattintás szimulálása kis késleltetéssel
        setTimeout(() => {
            const gomb = document.getElementById("kosarba0");
            console.assert(gomb !== null, "❌ Kosárba gomb nem található");
            gomb.click();
        }, 0);
    }).catch(e => console.error(e));
}

kosarbaEsemenyTeszt();
