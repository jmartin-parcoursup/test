// Variables des Pokémon
let pokemon1 = {
    name: "Pikachu",
    hp: 100,
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
};

let pokemon2 = {
    name: "Charmander",
    hp: 100,
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
};

// Fonction pour mettre à jour le tableau du combat
function updateCombatTable(pokemon1_hp, pokemon2_hp, actionLog) {
    let tableBody = document.getElementById("resultatCombat");
    tableBody.innerHTML = `
        <tr>
            <th>Pokémon</th>
            <th>Action</th>
            <th>Dégâts / Soin</th>
            <th>PV Restants</th>
        </tr>
        ${actionLog.join("")}
    `;
}

// Fonction pour simuler une action (attaque, soin, etc.)
function simulerAction() {
    let actionLog = [];
    let actions = ['attaque', 'soin'];
    let cible = Math.random() > 0.5 ? 'pokemon1' : 'pokemon2';
    let action = actions[Math.floor(Math.random() * actions.length)];

    // Calcul des dégâts ou du soin
    let valeur = action === 'attaque' ? Math.floor(Math.random() * 30) + 10 : Math.floor(Math.random() * 20) + 10;

    if (action === 'attaque') {
        if (cible === 'pokemon1') {
            pokemon1.hp = Math.max(0, pokemon1.hp - valeur);
            actionLog.push(`
                <tr>
                    <td>${pokemon2.name}</td>
                    <td>Attaque</td>
                    <td>${valeur}</td>
                    <td>${pokemon1.hp}</td>
                </tr>
            `);
        } else {
            pokemon2.hp = Math.max(0, pokemon2.hp - valeur);
            actionLog.push(`
                <tr>
                    <td>${pokemon1.name}</td>
                    <td>Attaque</td>
                    <td>${valeur}</td>
                    <td>${pokemon2.hp}</td>
                </tr>
            `);
        }
    } else if (action === 'soin') {
        if (cible === 'pokemon1') {
            pokemon1.hp = Math.min(100, pokemon1.hp + valeur);
            actionLog.push(`
                <tr>
                    <td>${pokemon1.name}</td>
                    <td>Soin</td>
                    <td>${valeur}</td>
                    <td>${pokemon1.hp}</td>
                </tr>
            `);
        } else {
            pokemon2.hp = Math.min(100, pokemon2.hp + valeur);
            actionLog.push(`
                <tr>
                    <td>${pokemon2.name}</td>
                    <td>Soin</td>
                    <td>${valeur}</td>
                    <td>${pokemon2.hp}</td>
                </tr>
            `);
        }
    }

    // Mise à jour du tableau avec les nouvelles actions
    updateCombatTable(pokemon1.hp, pokemon2.hp, actionLog);
}

// Fonction pour lancer le combat
function lancerCombat() {
    let combatInterval = setInterval(() => {
        simulerAction();

        // Arrêter le combat si un Pokémon est à 0 PV
        if (pokemon1.hp === 0 || pokemon2.hp === 0) {
            clearInterval(combatInterval);
            let gagnant = pokemon1.hp > 0 ? pokemon1.name : pokemon2.name;
            let messageFin = `<tr><td colspan="4">Le combat est terminé ! Le gagnant est ${gagnant} !</td></tr>`;
            let tableBody = document.getElementById("resultatCombat");
            tableBody.innerHTML += messageFin;
        }
    }, 2000); // Intervalle entre les actions (2 secondes)
}
