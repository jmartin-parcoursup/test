// 📌 Changer de page via le menu déroulant
function changerPage() {
    var page = document.getElementById("menu").value;
    if (page) {
        window.location.href = page;
    }
}

// 📌 Mode contraste (Inversion des couleurs)
document.getElementById("contraste").addEventListener('change', function () {
    if (this.checked) {
        document.body.style.backgroundColor = "#000";
        document.body.style.color = "#fff";
    } else {
        document.body.style.backgroundColor = "";
        document.body.style.color = "";
    }
});

// 📌 Mode dyslexie (Changer la police)
document.getElementById("Dyslexique").addEventListener('change', function () {
    if (this.checked) {
        document.body.style.fontFamily = "Comic Sans MS, sans-serif";
    } else {
        document.body.style.fontFamily = "";
    }
});

// 📌 Mode zoom texte (Cercle autour de la souris + agrandissement du texte)
var zoomCheckbox = document.getElementById("zoomText");

// Ajouter un cercle pour l'effet de zoom
var zoomCircle = document.createElement("div");
zoomCircle.id = "zoomCursor";
zoomCircle.style.position = "absolute";
zoomCircle.style.width = "120px";
zoomCircle.style.height = "120px";
zoomCircle.style.borderRadius = "50%";
zoomCircle.style.border = "2px solid red";
zoomCircle.style.pointerEvents = "none";
zoomCircle.style.display = "none";
zoomCircle.style.background = "rgba(255, 0, 0, 0.1)";
document.body.appendChild(zoomCircle);

// 🎯 Déplacement du cercle avec la souris
document.addEventListener("mousemove", function (e) {
    if (zoomCheckbox.checked) {
        zoomCircle.style.display = "block";
        zoomCircle.style.left = e.pageX - 60 + "px";
        zoomCircle.style.top = e.pageY - 60 + "px";
    } else {
        zoomCircle.style.display = "none";
    }
});

// 🎯 Agrandissement du texte sous le cercle
document.querySelectorAll('h1, h2,label, h3, h4, ul, p').forEach(texte => {
    const tailleInitiale = parseInt(window.getComputedStyle(texte).fontSize);

    texte.addEventListener('mouseover', function () {
        if (zoomCheckbox.checked) {
            texte.style.fontSize = (tailleInitiale + 10) + 'px';
        }
    });

    texte.addEventListener('mouseout', function () {
        if (zoomCheckbox.checked) {
            texte.style.fontSize = tailleInitiale + 'px';
        }
    });
});

// 📌 Simulateur de combat Pokémon
function lancerCombat() {
    // PV des Pokémon
    var pikachuPV = 100;
    var dracaufeuPV = 100;
    var bulbasaurPV = 100;
    var salamèchePV = 100;
    var combatLog = [];

    // Liste des Pokémon et leurs attaques
    var pokemons = [
        { nom: "Pikachu", attaques: ["Tonnerre", "Queue de Fer", "Éclair"], degats: [10, 20, 15] },
        { nom: "Dracaufeu", attaques: ["Lance-Flammes", "Dracogriffe", "Flammèche"], degats: [20, 25, 30] },
        { nom: "Bulbizarre", attaques: ["Tranch'Herbe", "Vampigraine", "Mégafouet"], degats: [15, 10, 20] },
        { nom: "Salamèche", attaques: ["Flammèche", "Crocs Feu", "Flame Burst"], degats: [15, 20, 25] }
    ];

    // Sélection des Pokémon à combattre
    var pokemon1 = pokemons[Math.floor(Math.random() * pokemons.length)];
    var pokemon2 = pokemons[Math.floor(Math.random() * pokemons.length)];

    // Lancer le combat pendant 5 tours
    for (let i = 0; i < 5; i++) {
        let attaquePokemon1 = pokemon1.attaques[Math.floor(Math.random() * pokemon1.attaques.length)];
        let attaquePokemon2 = pokemon2.attaques[Math.floor(Math.random() * pokemon2.attaques.length)];

        let degatsPokemon1 = pokemon1.degats[Math.floor(Math.random() * pokemon1.degats.length)];
        let degatsPokemon2 = pokemon2.degats[Math.floor(Math.random() * pokemon2.degats.length)];

        // Calcul des PV après les attaques
        pokemon2.PV -= degatsPokemon1;
        pokemon1.PV -= degatsPokemon2;

        // Régénération des PV après chaque tour
        pokemon2.PV += 5; // Pokémon 2 récupère 5 PV après chaque tour
        pokemon1.PV += 5; // Pokémon 1 récupère 5 PV après chaque tour

        combatLog.push(
            `<tr>
                <td>${pokemon1.nom}</td>
                <td>${attaquePokemon1}</td>
                <td>${degatsPokemon1}</td>
                <td>${pokemon1.PV > 0 ? pokemon1.PV : 0}</td>
            </tr>
            <tr>
                <td>${pokemon2.nom}</td>
                <td>${attaquePokemon2}</td>
                <td>${degatsPokemon2}</td>
                <td>${pokemon2.PV > 0 ? pokemon2.PV : 0}</td>
            </tr>`
        );
    }

    // Affichage des résultats du combat
    document.getElementById("resultatCombat").innerHTML = `
        <tr>
            <th>Pokémon</th>
            <th>Attaque</th>
            <th>Dégâts</th>
            <th>PV Restants</th>
        </tr>
        ${combatLog.join("")}
    `;
}

