// 📌 Navigation entre les pages
function changerPage() {
    var page = document.getElementById("menu").value;
    if (page) {
        window.location.href = page;
    }
}

// 📌 Simulateur de combat Pokémon
function lancerCombat() {
    document.getElementById("resultatCombat").style.display = "table";
    document.getElementById("attaquePikachu").innerText = "Tonnerre, Queue de Fer";
    document.getElementById("attaqueDracaufeu").innerText = "Lance-Flammes, Vol";
    document.getElementById("pvPikachu").innerText = "80";
    document.getElementById("pvDracaufeu").innerText = "90";
}

// 📌 Accessibilité
document.getElementById("zoomText").addEventListener('change', function () {
    document.body.classList.toggle('zoom-text', this.checked);
});

document.getElementById("Dyslexique").addEventListener('change', function () {
    document.body.classList.toggle('dyslexie', this.checked);
});

document.getElementById("contraste").addEventListener('change', function () {
    document.body.classList.toggle('contraste', this.checked);
});
