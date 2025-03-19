var malvoyantCheckbox = document.getElementById("MALVOYANT"); 
var daltonienCheckbox = document.getElementById("Daltonien");
var dyslexicCheckbox = document.getElementById("Dyslexique");
var contrasteCheckbox = document.getElementById("contraste");
var page = document.querySelector('body');
var cursor = document.getElementById("cursor");

// Mode myopie : Zoom sur le texte sous la souris
malvoyantCheckbox.addEventListener('change', function () {
    var textes = document.querySelectorAll('h1, h2, h3, h4, ul, p');

    document.body.addEventListener("mousemove", function(e) {
        if (malvoyantCheckbox.checked) {
            cursor.style.display = "block";
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        } else {
            cursor.style.display = "none";
        }
    });

    textes.forEach(texte => {
        const tailleInitiale = parseInt(window.getComputedStyle(texte).fontSize);

        texte.addEventListener('mouseover', function () {
            if (malvoyantCheckbox.checked) {
                texte.style.fontSize = (tailleInitiale + 10) + 'px';
            }
        });

        texte.addEventListener('mouseout', function () {
            if (malvoyantCheckbox.checked) {
                texte.style.fontSize = tailleInitiale + 'px';
            }
        });
    });
});

// Mode dyslexie : Changement de police
dyslexicCheckbox.addEventListener('change', function () {
    if (dyslexicCheckbox.checked) {
        page.classList.add('dyslexie');
    } else {
        page.classList.remove('dyslexie');
    }
});

// Mode daltonien : Changement des couleurs
daltonienCheckbox.addEventListener('change', function () {
    if (daltonienCheckbox.checked) {
        page.classList.add('daltonien');
    } else {
        page.classList.remove('daltonien');
    }
});

// Mode contraste : Inversion des couleurs
contrasteCheckbox.addEventListener('change', function () {
    if (contrasteCheckbox.checked) {
        page.classList.add('contraste');
    } else {
        page.classList.remove('contraste');
    }
});
