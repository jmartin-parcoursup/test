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
    
    tableBody.innerHTML = ""; // On vide le tableau

    actionLog.forEach(action => {
        let row = tableBody.insertRow();
        
        row.insertCell(0).textContent = action.attacker;
        row.insertCell(1).textContent = action.action;
        row.insertCell(2).textContent = action.value;
        row.insertCell(3).textContent = action.defender;
        row.insertCell(4).textContent = action.remainingHP;
    });
}

// Fonction pour simuler une action
function simulerAction(actionLog) {
    let attacker = Math.random() > 0.5 ? pokemon1 : pokemon2;
    let defender = attacker === pokemon1 ? pokemon2 : pokemon1;

    let actionType = Math.random() > 0.5 ? "attaque" : "soin";
    let value = Math.floor(Math.random() * 20) + 10;

    if (actionType === "attaque") {
        defender.hp = Math.max(0, defender.hp - value);
    } else {
        attacker.hp = Math.min(100, attacker.hp + value);
    }

    actionLog.push({
        attacker: attacker.name,
        action: actionType === "attaque" ? "Attaque" : "Soin",
        value: value,
        defender: defender.name,
        remainingHP: defender.hp
    });
}

// Fonction principale de combat
function lancerCombat() {
    pokemon1.hp = 100;
    pokemon2.hp = 100;

    let actionLog = [];
    while (pokemon1.hp > 0 && pokemon2.hp > 0) {
        simulerAction(actionLog);
    }

    updateCombatTable(actionLog);

    let gagnant = pokemon1.hp > 0 ? pokemon1.name : pokemon2.name;
    document.getElementById("resultatCombat").getElementsByTagName("tbody")[0].innerHTML += 
        `<tr><td colspan="5">Le combat est terminé ! Le gagnant est ${gagnant} !</td></tr>`;
}

// ================== ZOOM CERCLE ==================
document.addEventListener("mousemove", function (event) {
    let zoomCircle = document.getElementById("zoomCircle");
    zoomCircle.style.left = event.pageX - 60 + "px";
    zoomCircle.style.top = event.pageY - 60 + "px";
});

document.getElementById("zoomText").addEventListener("change", function () {
    let zoomCircle = document.getElementById("zoomCircle");
    zoomCircle.style.display = this.checked ? "block" : "none";
});
