// 📌 Menu déroulant pour naviguer entre les pages
function changerPage() {
    var page = document.getElementById("menu").value;
    if (page) {
        window.location.href = page;
    }
}

// 📌 Sélection des éléments
var malvoyantCheckbox = document.getElementById("MALVOYANT");
var daltonienCheckbox = document.getElementById("Daltonien");
var dyslexicCheckbox = document.getElementById("Dyslexique");
var contrasteCheckbox = document.getElementById("contraste");
var body = document.body;
var cursor = document.createElement("div");

// 📌 Ajout du cercle pour le mode myopie
cursor.id = "cursor";
cursor.style.position = "absolute";
cursor.style.width = "120px";
cursor.style.height = "120px";
cursor.style.borderRadius = "50%";
cursor.style.border = "2px solid red";
cursor.style.backgroundColor = "rgba(255, 255, 255, 0.6)";
cursor.style.pointerEvents = "none";
cursor.style.display = "none";
cursor.style.transform = "translate(-50%, -50%)";
document.body.appendChild(cursor);

// 📌 Mode Myopie : Zoom sur le texte sous la souris
malvoyantCheckbox.addEventListener('change', function () {
    var textes = document.querySelectorAll('h1, h2, h3, h4, p, ul, li');

    if (malvoyantCheckbox.checked) {
        cursor.style.display = "block";

        document.body.addEventListener("mousemove", function (e) {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });

        textes.forEach(texte => {
            const tailleInitiale = parseInt(window.getComputedStyle(texte).fontSize);

            texte.addEventListener('mouseover', function () {
                texte.style.fontSize = (tailleInitiale + 10) + 'px';
            });

            texte.addEventListener('mouseout', function () {
                texte.style.fontSize = tailleInitiale + 'px';
            });
        });
    } else {
        cursor.style.display = "none";
        textes.forEach(texte => {
            texte.style.fontSize = '';
        });
    }
});

// 📌 Mode Daltonien : Changement des couleurs pour meilleure lisibilité
daltonienCheckbox.addEventListener('change', function () {
    if (daltonienCheckbox.checked) {
        body.classList.add('daltonien');
    } else {
        body.classList.remove('daltonien');
    }
});

// 📌 Mode Dyslexie : Application de la police OpenDyslexic
dyslexicCheckbox.addEventListener('change', function () {
    if (dyslexicCheckbox.checked) {
        body.classList.add('dyslexie');
    } else {
        body.classList.remove('dyslexie');
    }
});

// 📌 Mode Contraste : Inversion des couleurs
contrasteCheckbox.addEventListener('change', function () {
    if (contrasteCheckbox.checked) {
        body.classList.add('contraste');
    } else {
        body.classList.remove('contraste');
    }
});
