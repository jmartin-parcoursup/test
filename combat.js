function lancerCombat() {
    // Liste des Pokémon disponibles
    const pokemons = [
        { nom: "Pikachu", attaques: ["Tonnerre", "Queue de Fer", "Éclair"], pv: 100, degatsMin: 10, degatsMax: 20 },
        { nom: "Dracaufeu", attaques: ["Lance-Flammes", "Dracogriffe", "Flammèche"], pv: 120, degatsMin: 15, degatsMax: 25 },
        { nom: "Bulbizarre", attaques: ["Fouet Lianes", "Tranch'Herbe", "Charge"], pv: 110, degatsMin: 8, degatsMax: 18 },
        { nom: "Tortank", attaques: ["Hydrocanon", "Morsure", "Surf"], pv: 130, degatsMin: 12, degatsMax: 22 }
    ];

    // Sélection aléatoire de 2 Pokémon
    let pokemon1 = pokemons[Math.floor(Math.random() * pokemons.length)];
    let pokemon2;
    do {
        pokemon2 = pokemons[Math.floor(Math.random() * pokemons.length)];
    } while (pokemon1.nom === pokemon2.nom);

    let combatLog = [];

    for (let i = 0; i < 5; i++) {
        let attaqueP1 = pokemon1.attaques[Math.floor(Math.random() * pokemon1.attaques.length)];
        let attaqueP2 = pokemon2.attaques[Math.floor(Math.random() * pokemon2.attaques.length)];

        let degatsP1 = Math.floor(Math.random() * (pokemon1.degatsMax - pokemon1.degatsMin + 1)) + pokemon1.degatsMin;
        let degatsP2 = Math.floor(Math.random() * (pokemon2.degatsMax - pokemon2.degatsMin + 1)) + pokemon2.degatsMin;

        pokemon2.pv = Math.max(pokemon2.pv - degatsP1, 0);
        pokemon1.pv = Math.max(pokemon1.pv - degatsP2, 0);

        combatLog.push(
            `<tr>
                <td>${pokemon1.nom}</td>
                <td>${attaqueP1}</td>
                <td>${degatsP1}</td>
                <td>${pokemon1.pv}</td>
            </tr>
            <tr>
                <td>${pokemon2.nom}</td>
                <td>${attaqueP2}</td>
                <td>${degatsP2}</td>
                <td>${pokemon2.pv}</td>
            </tr>`
        );

        if (pokemon1.pv === 0 || pokemon2.pv === 0) break; // Fin du combat si un Pokémon n'a plus de PV
    }

    let gagnant = pokemon1.pv > pokemon2.pv ? pokemon1.nom : pokemon2.nom;
    
    document.getElementById("resultatCombat").innerHTML = `
        <tr>
            <th>Pokémon</th>
            <th>Attaque</th>
            <th>Dégâts</th>
            <th>PV Restants</th>
        </tr>
        ${combatLog.join("")}
        <tr>
            <td colspan="4" style="text-align:center; font-weight:bold;">🏆 Vainqueur : ${gagnant} !</td>
        </tr>
    `;
}
