// Variables pour les Pokémon
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

// Fonction pour mettre à jour l'affichage du tableau des résultats
function updateCombatTable(pokemon1_hp, pokemon2_hp, combatLog) {
    let tableBody = document.getElementById("resultatCombat");
    tableBody.innerHTML = `
        <tr>
            <th>Pokémon</th>
            <th>Attaque</th>
            <th>Dégâts</th>
            <th>PV Restants</th>
        </tr>
        ${combatLog.join("")}
    `;

    // Mise à jour de l'état des PV des Pokémon
    document.getElementById('pokemon1_hp').innerText = pokemon1_hp;
    document.getElementById('pokemon2_hp').innerText = pokemon2_hp;
}

// Fonction pour gérer une action du combat (attaque, soin, nerf, boost)
function actionCombat(actionType, target) {
    fetch('/action', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action_type: actionType,
            target: target
        })
    })
    .then(response => response.json())
    .then(data => {
        // Simuler les attaques et mettre à jour le tableau
        let combatLog = [];

        if (actionType === 'attack') {
            let damage = Math.floor(Math.random() * 20) + 10;
            if (target === 'pokemon1') {
                pokemon2.hp = Math.max(0, pokemon2.hp - damage);
                combatLog.push(
                    `<tr>
                        <td>${pokemon1.name}</td>
                        <td>Attaque</td>
                        <td>${damage}</td>
                        <td>${pokemon2.hp}</td>
                    </tr>`
                );
            } else {
                pokemon1.hp = Math.max(0, pokemon1.hp - damage);
                combatLog.push(
                    `<tr>
                        <td>${pokemon2.name}</td>
                        <td>Attaque</td>
                        <td>${damage}</td>
                        <td>${pokemon1.hp}</td>
                    </tr>`
                );
            }
        } else if (actionType === 'heal') {
            let heal = Math.floor(Math.random() * 20) + 10;
            if (target === 'pokemon1') {
                pokemon1.hp = Math.min(100, pokemon1.hp + heal);
                combatLog.push(
                    `<tr>
                        <td>${pokemon1.name}</td>
                        <td>Soin</td>
                        <td>${heal}</td>
                        <td>${pokemon1.hp}</td>
                    </tr>`
                );
            } else {
                pokemon2.hp = Math.min(100, pokemon2.hp + heal);
                combatLog.push(
                    `<tr>
                        <td>${pokemon2.name}</td>
                        <td>Soin</td>
                        <td>${heal}</td>
                        <td>${pokemon2.hp}</td>
                    </tr>`
                );
            }
        } else if (actionType === 'nerf') {
            let nerf = Math.floor(Math.random() * 15) + 5;
            if (target === 'pokemon1') {
                pokemon1.hp = Math.max(0, pokemon1.hp - nerf);
                combatLog.push(
                    `<tr>
                        <td>${pokemon2.name}</td>
                        <td>Nerf</td>
                        <td>${nerf}</td>
                        <td>${pokemon1.hp}</td>
                    </tr>`
                );
            } else {
                pokemon2.hp = Math.max(0, pokemon2.hp - nerf);
                combatLog.push(
                    `<tr>
                        <td>${pokemon1.name}</td>
                        <td>Nerf</td>
                        <td>${nerf}</td>
                        <td>${pokemon2.hp}</td>
                    </tr>`
                );
            }
        } else if (actionType === 'boost') {
            let boost = Math.floor(Math.random() * 15) + 5;
            if (target === 'pokemon1') {
                pokemon1.hp = Math.min(100, pokemon1.hp + boost);
                combatLog.push(
                    `<tr>
                        <td>${pokemon1.name}</td>
                        <td>Boost</td>
                        <td>${boost}</td>
                        <td>${pokemon1.hp}</td>
                    </tr>`
                );
            } else {
                pokemon2.hp = Math.min(100, pokemon2.hp + boost);
                combatLog.push(
                    `<tr>
                        <td>${pokemon2.name}</td>
                        <td>Boost</td>
                        <td>${boost}</td>
                        <td>${pokemon2.hp}</td>
                    </tr>`
                );
            }
        }

        // Mise à jour du tableau de combat avec les résultats
        updateCombatTable(pokemon1.hp, pokemon2.hp, combatLog);
    })
    .catch(error => console.error('Erreur:', error));
}

// Fonction pour démarrer le combat
function startCombat() {
    // Variables de combat et tableau des actions
    let combatLog = [];

    let actions = ['attack', 'heal', 'nerf', 'boost'];
    let targets = ['pokemon1', 'pokemon2'];

    // Simulation de combat
    let interval = setInterval(() => {
        let action = actions[Math.floor(Math.random() * actions.length)];
        let target = targets[Math.floor(Math.random() * targets.length)];

        actionCombat(action, target);

        // Terminer le combat si l'un des Pokémon a 0 PV
        if (pokemon1.hp === 0 || pokemon2.hp === 0) {
            clearInterval(interval);
            let winner = pokemon1.hp > 0 ? pokemon1.name : pokemon2.name;
            combatLog.push(
                `<tr>
                    <td colspan="4">Combat terminé ! Le gagnant est ${winner} !</td>
                </tr>`
            );
            updateCombatTable(pokemon1.hp, pokemon2.hp, combatLog);
        }
    }, 2000);
}

// Démarre le combat au chargement de la page
startCombat();
