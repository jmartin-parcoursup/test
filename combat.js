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

// Fonction pour mettre à jour le tableau avec les actions du combat
function updateCombatTable(actionLog) {
    let tableBody = document.getElementById("resultatCombat").getElementsByTagName("tbody")[0];
    
    // On vide le tableau à chaque mise à jour
    tableBody.innerHTML = "";

    actionLog.forEach(action => {
        let row = tableBody.insertRow();
        
        // Pokémon
        let cell1 = row.insertCell(0);
        cell1.textContent = action.pokemon;

        // Action
        let cell2 = row.insertCell(1);
        cell2.textContent = action.action;

        // Dégâts/Soin
        let cell3 = row.insertCell(2);
        cell3.textContent = action.value;

        // PV restants
        let cell4 = row.insertCell(3);
        cell4.textContent = action.pvRestants;
    });
}

// Fonction pour simuler une action (attaque ou soin)
function simulerAction(actionLog) {
    let actions = ['attaque', 'soin'];
    let cible = Math.random() > 0.5 ? 'pokemon1' : 'pokemon2';
    let action = actions[Math.floor(Math.random() * actions.length)];

    // Calcul des dégâts ou du soin
    let valeur = action === 'attaque' ? Math.floor(Math.random() * 30) + 10 : Math.floor(Math.random() * 20) + 10;
    let actionDetail = {
        pokemon: '',
        action: action === 'attaque' ? 'Attaque' : 'Soin',
        value: valeur,
        pvRestants: 0
    };

    if (action === 'attaque') {
        if (cible === 'pokemon1') {
            pokemon1.hp = Math.max(0, pokemon1.hp - valeur);
            actionDetail.pokemon = pokemon2.name;
            actionDetail.pvRestants = pokemon1.hp;
        } else {
            pokemon2.hp = Math.max(0, pokemon2.hp - valeur);
            actionDetail.pokemon = pokemon1.name;
            actionDetail.pvRestants = pokemon2.hp;
        }
    } else if (action === 'soin') {
        if (cible === 'pokemon1') {
            pokemon1.hp = Math.min(100, pokemon1.hp + valeur);
            actionDetail.pokemon = pokemon1.name;
            actionDetail.pvRestants = pokemon1.hp;
        } else {
            pokemon2.hp = Math.min(100, pokemon2.hp + valeur);
            actionDetail.pokemon = pokemon2.name;
            actionDetail.pvRestants = pokemon2.hp;
        }
    }

    actionLog.push(actionDetail);

    // Mise à jour du tableau avec les actions du combat
    updateCombatTable(actionLog);
}

// Fonction pour lancer le combat
function lancerCombat() {
    let actionLog = [];
    let combatInterval = setInterval(() => {
        simulerAction(actionLog);

        // Arrêter le combat si un Pokémon est à 0 PV
        if (pokemon1.hp === 0 || pokemon2.hp === 0) {
            clearInterval(combatInterval);
            let gagnant = pokemon1.hp > 0 ? pokemon1.name : pokemon2.name;
            let messageFin = `<tr><td colspan="4">Le combat est terminé ! Le gagnant est ${gagnant} !</td></tr>`;
            let tableBody = document.getElementById("resultatCombat").getElementsByTagName("tbody")[0];
            tableBody.innerHTML += messageFin;
        }
    }, 2000); // Intervalle entre les actions (2 secondes)
}
