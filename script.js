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

// 📌 Mode dyslexie (changement de police)
document.getElementById("Dyslexique").addEventListener('change', function () {
    if (this.checked) {
        document.body.style.fontFamily = "Comic Sans MS, sans-serif";
    } else {
        document.body.style.fontFamily = "";
    }
});

// 📌 Mode zoom texte (Cercle qui suit la souris et agrandit le texte)
var zoomCheckbox = document.getElementById("zoomText");
var zoomCircle = document.createElement("div");
zoomCircle.id = "zoomCircle";
document.body.appendChild(zoomCircle);

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
document.querySelectorAll('h1, h2, h3, h4, ul, p').forEach(texte => {
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
