/**
 * Attend que le DOM soit entièrement chargé
 *
 * @event DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", function() {
    // Déclarations de variables
    /**
     * Sélectionne l'élément d'affichage de la calculatrice
     * @type {HTMLInputElement}
     */
    let display = document.getElementsByName("boxinput")[0];

    /**
     * Sélectionne tous les boutons de la calculatrice
     * @type {NodeList}
     */
    let buttons = document.querySelectorAll(".button");

    // Variable pour le mode sombre
    let dark = true;

    // Sélectionne des éléments supplémentaires du DOM
    const power = document.querySelector(".power");
    const calculatrice = document.querySelector(".calculatrice");
    const calhex = document.querySelector(".calhex");
    const caldec = document.querySelector(".caldec");

    /**
     * Fonction pour gérer les clics sur les boutons
     *
     * @param {string} value - La valeur du bouton cliqué
     */
    function souris(value) {
        // Empêche les actions lorsque la calculatrice est en mode sombre
        if (dark) {
            return;
        }

        // Gère différentes valeurs des boutons
        if (value === "=") {
            // Évalue l'expression mathématique
            try {
                if (display.value !== "") {
                    // Vérifie la division par zéro
                    if (display.value.includes("/0")) {
                        display.value = "";
                    } else {
                        // Remplace toutes les virgules par des points dans la valeur de l'affichage
                        // puis évalue l'expression résultante et met à jour la valeur de l'affichage.
                        display.value = eval(display.value.replace(/,/g, "."));
                    }
                }
            } catch (error) {
                display.value = "Erreur";
            }
        } else if (value === "AC") {
            // Réinitialise l'affichage
            display.value = "";
        } else if (value === "÷") {
            // Utilise le bouton / pour la division
            display.value += "/";
        } else if (value === "×") {
            // Utilise le bouton * pour la multiplication
            display.value += "*";
        } else if (value === "±") {
            // Change le signe du nombre affiché
            display.value += "+/*";
            if (display.value !== "") {
                display.value = parseFloat(display.value) * -1;
            }
        } else if (value === "%") {
            // Convertit le nombre en pourcentage
            if (display.value !== "") {
                display.value = parseFloat(display.value) / 100;
            }
        } else {
            // Ajoute la valeur du bouton à l'affichage
            display.value += value;
        }

        // Défile le champ de saisie horizontalement pour mettre le curseur à la fin
        display.scrollLeft = display.scrollWidth;
    }

    /**
     * Fonction pour gérer les touches du clavier
     *
     * @param {string} key - La touche pressée
     */
    function clavier(key) {
        // Gère les touches numériques, opérateurs et virgule
        if (/[\d+\-*/.]/.test(key)) {
            // Appelle la fonction "souris" avec la touche en paramètre
            souris(key);
        }
    }

    // Fonction pour basculer entre le mode sombre et le mode clair
    function toggleDarkMode() {
        // Ajoute ou supprime la classe "dark" à l'élément de la calculatrice
        calculatrice.classList.toggle("dark");

        // Ajoute ou supprime la classe "actif" à l'élément avec la classe "power"
        power.classList.toggle("actif");

        // Inverse la valeur de la variable dark
        dark = !dark;

        // Si la calculatrice est en mode sombre, réinitialise l'affichage à zéro
        if (dark) {
            display.value = "";
        }
    }

    // Fonction pour basculer entre les modes décimal et hexadécimal
    function toggleHexMode() {
        // Récupère la valeur actuelle de l'affichage
        let currentValue = display.value;

        // Vérifie si la calculatrice est en mode sombre
        if (dark) {
            // La calculatrice est en mode sombre, réinitialise l'affichage à zéro
            display.value = "";

            // Si on appuie sur le bouton, rien ne se passe (mode sombre)
            return;
        }

        // Convertit la valeur actuelle en hexadécimal
        let hexValue = Number(currentValue).toString(16);

        // Met à jour l'affichage avec la valeur hexadécimale
        display.value = hexValue;
    }

    // Fonction pour basculer entre les modes hexadécimal et décimal
    function toggleDecMode() {
        // Récupère la valeur actuelle de l'affichage
        let currentValue = display.value;

        // Vérifie si la calculatrice est en mode sombre
        if (dark) {
            // La calculatrice est en mode sombre, réinitialise l'affichage à zéro
            display.value = "";

            // Si on appuie sur le bouton, rien ne se passe (mode sombre)
            return;
        }

        // Convertit la valeur actuelle en décimal
        let decValue = parseInt(currentValue, 16);

        // Met à jour l'affichage avec la valeur décimale
        display.value = decValue;
    }

    // Gestionnaire pour chaque bouton de la calculatrice
    buttons.forEach(function(button) {
        /**
         * Gestionnaire pour le clic sur un bouton de la calculatrice
         *
         * @event click
         */
        button.addEventListener("click", function() {
            souris(button.textContent);
        });
    });

    /**
     * Gestionnaire de touche clavier
     *
     * @event keydown
     * @param {KeyboardEvent} event - L'événement clavier
     */
    document.addEventListener("keydown", function(event) {
        // Les différentes touches claviers
        if (event.key === "Enter") {
            // Touche enter = '='
            souris("=");
        } else if (event.key === "Delete") {
            // Touche del = 'AC'
            souris("AC");
        } else if (event.key === ".") {
            // Touche . = '.'
            souris(".");
        } else if (event.key == "%") {
            // Touche % = '%'
            souris("%");
        } else if (event.key === "Escape") {
            // Touche echape = on off
            toggleDarkMode();
        } else if (event.key === "&") {
            // Touche & = Bouton Hexadecimal
            toggleHexMode();
        } else if (event.key === "é") {
            // Touche é = Bouton décimal
            toggleDecMode();
        } else if (event.key === "Backspace") {
            // Touche Backspace = supprimer le dernier chiffre
            let currentText = display.value;
            display.value = currentText.slice(0, -1);
        } else {
            // Appelle la fonction "clavier" pour gérer les autres touches
            clavier(event.key);
        }
    });

    // Gère le clic sur l'élément avec la classe "power"
    power.addEventListener("click", function Darkmode() {
        toggleDarkMode();
    });

    // Gère le clic sur l'élément avec la classe "calhex"
    calhex.addEventListener("click", function HexMode() {
        toggleHexMode();
    });

    // Gère le clic sur l'élément avec la classe "caldec"
    caldec.addEventListener("click", function DecMode() {
        toggleDecMode();
    });
});