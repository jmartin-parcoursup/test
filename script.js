// 📌 Changer de page via le menu déroulant
function changerPage() {
    var page = document.getElementById("menu").value;
    if (page) {
        window.location.href = page;
    }
}

// 📌 Mode contraste
document.getElementById("contraste").addEventListener('change', function () {
    if (this.checked) {
        document.body.style.backgroundColor = "#000";
        document.body.style.color = "#fff";
    } else {
        document.body.style.backgroundColor = "";
        document.body.style.color = "";
    }
});

// 📌 Mode dyslexie
document.getElementById("Dyslexique").addEventListener('change', function () {
    if (this.checked) {
        document.body.style.fontFamily = "Comic Sans MS, sans-serif";
    } else {
        document.body.style.fontFamily = "";
    }
});

// 📌 Mode zoom texte (Cercle qui suit la souris et agrandit le texte)
var zoomCircle = document.createElement("div");
zoomCircle.style.position = "absolute";
zoomCircle.style.width = "100px";
zoomCircle.style.height = "100px";
zoomCircle.style.borderRadius = "50%";
zoomCircle.style.border = "2px solid red";
zoomCircle.style.pointerEvents = "none";
zoomCircle.style.display = "none";
document.body.appendChild(zoomCircle);

document.getElementById("zoomText").addEventListener('change', function () {
    if (this.checked) {
        zoomCircle.style.display = "block";
    } else {
        zoomCircle.style.display = "none";
    }
});

document.addEventListener("mousemove", function (e) {
    if (document.getElementById("zoomText").checked) {
        zoomCircle.style.left = e.pageX - 50 + "px";
        zoomCircle.style.top = e.pageY - 50 + "px";
    }
});

// 📌 Simulateur de combat Pokémon
function lancerCombat() {
    var pikachuPV = 100;
    var dracaufeuPV = 100;
    var combatLog = [];

    for (let i = 0; i < 5; i++) {
        let attaquePikachu = ["Tonnerre", "Queue de Fer", "Éclair"][Math.floor(Math.random() * 3)];
        let attaqueDracaufeu = ["Lance-Flammes", "Dracogriffe", "Flammèche"][Math.floor(Math.random() * 3)];

        let degatsPikachu = Math.floor(Math.random() * 20) + 10;
        let degatsDracaufeu = Math.floor(Math.random() * 25) + 15;

        dracaufeuPV -= degatsPikachu;
        pikachuPV -= degatsDracaufeu;

        combatLog.push(
            `<tr>
                <td>Pikachu</td>
                <td>${attaquePikachu}</td>
                <td>${degatsPikachu}</td>
                <td>${pikachuPV > 0 ? pikachuPV : 0}</td>
            </tr>
            <tr>
                <td>Dracaufeu</td>
                <td>${attaqueDracaufeu}</td>
                <td>${degatsDracaufeu}</td>
                <td>${dracaufeuPV > 0 ? dracaufeuPV : 0}</td>
            </tr>`
        );
    }

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
