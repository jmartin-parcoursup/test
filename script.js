// Navigation via le menu déroulant
function changerPage() {
    let menu = document.getElementById("menu");
    let page = menu.value;
    if (page) {
        window.location.href = page;
    }
}

// Combat Pokémon amélioré
function lancerCombat() {
    let pokemons = ["Pikachu", "Dracaufeu", "Bulbizarre", "Salamèche", "Carapuce"];
    let attaques = ["Charge", "Lance-Flammes", "Éclair", "Tranch'Herbe", "Hydrocanon"];

    let p1 = {
        nom: pokemons[Math.floor(Math.random() * pokemons.length)],
        pv: 100
    };

    let p2 = {
        nom: pokemons[Math.floor(Math.random() * pokemons.length)],
        pv: 100
    };

    let log = document.getElementById("combat-log");
    log.innerHTML = "";

    for (let tour = 1; p1.pv > 0 && p2.pv > 0; tour++) {
        let attaque1 = attaques[Math.floor(Math.random() * attaques.length)];
        let attaque2 = attaques[Math.floor(Math.random() * attaques.length)];
        let degats1 = Math.floor(Math.random() * 20) + 10;
        let degats2 = Math.floor(Math.random() * 20) + 10;

        p1.pv -= degats2;
        p2.pv -= degats1;

        // Régénération de 5 PV à la fin du tour
        if (p1.pv > 0) p1.pv += 5;
        if (p2.pv > 0) p2.pv += 5;

        let row = `
            <tr>
                <td>${tour}</td>
                <td>${p1.nom} (${p1.pv} PV)</td>
                <td>${attaque1} (-${degats1} PV)</td>
                <td>${p2.nom} (${p2.pv} PV)</td>
                <td>${attaque2} (-${degats2} PV)</td>
            </tr>
        `;

        log.innerHTML += row;
    }

    let gagnant = p1.pv > 0 ? p1.nom : p2.nom;
    log.innerHTML += `<tr><td colspan="5"><strong>Gagnant : ${gagnant} !</strong></td></tr>`;
}

// Mode myopie : zoom avec un cercle autour de la souris
let zoomEnabled = false;
let zoomCircle = document.getElementById("zoom-circle");

function toggleMyopie() {
    zoomEnabled = !zoomEnabled;
    zoomCircle.style.display = zoomEnabled ? "block" : "none";
}

document.addEventListener("mousemove", function (e) {
    if (zoomEnabled) {
        zoomCircle.style.left = `${e.pageX - 50}px`;
        zoomCircle.style.top = `${e.pageY - 50}px`;
    }
});

// Mode daltonisme
function toggleDaltonisme() {
    document.body.classList.toggle("daltonisme");
}

// Mode dyslexie
function toggleDyslexie() {
    document.body.classList.toggle("dyslexie");
}
