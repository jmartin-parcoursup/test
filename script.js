// Navigation via le menu déroulant
function changerPage() {
    let menu = document.getElementById("menu");
    let page = menu.value;
    if (page) {
        window.location.href = page;
    }
}

// Combat Pokémon simulé
function lancerCombat() {
    let pokemons = ["Pikachu", "Dracaufeu", "Bulbizarre", "Salamèche", "Carapuce"];
    let p1 = pokemons[Math.floor(Math.random() * pokemons.length)];
    let p2 = pokemons[Math.floor(Math.random() * pokemons.length)];
    let gagnant = Math.random() < 0.5 ? p1 : p2;
    document.getElementById("resultat").innerText = `${p1} VS ${p2} ➜ Gagnant : ${gagnant}`;
}

// Modes d'accessibilité
function toggleMyopie() {
    document.body.classList.toggle("myopie");
}

function toggleDaltonisme() {
    document.body.classList.toggle("daltonisme");
}

function toggleDyslexie() {
    document.body.classList.toggle("dyslexie");
}
