// Attend que le DOM soit entièrement chargé
document.addEventListener("DOMContentLoaded", function () {
  // Sélectionne l'élément d'affichage de la calculatrice
  var display = document.getElementsByName("boxinput")[0];

  // Sélectionne tous les boutons de la calculatrice
  var buttons = document.querySelectorAll(".button");

  // Ajoute un gestionnaire d'événements à chaque bouton
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Appelle la fonction "souris" avec le texte du bouton en paramètre
      souris(button.textContent);
    });
  });

  // Ajoute un gestionnaire d'événements pour les touches du clavier
  document.addEventListener("keydown", function (event) {
    // Gère différentes touches du clavier
    if (event.key === "Enter") {
      souris("=");
    } else if (event.key === "Backspace") {
      souris("AC");
    } else if (event.key === ".") {
      souris(".");
    } else if (event.key == "%") {
      souris("%");
    } else if (event.key === "Escape") {
      // Bascule entre le mode sombre et le mode clair lors de l'appui sur la touche "Escape"
      toggleDarkMode();
    } else if (event.key === "&") {
      toggleHexMode();
    } else if (event.key === "é") {
      toggleDecMode();
    } else {
      // Appelle la fonction "clavier" pour gérer les autres touches
      clavier(event.key);
    }
  });

  // Fonction pour gérer les touches du clavier
  function clavier(key) {
    // Gère les touches numériques, opérateurs et virgule
    if (/[\d\+\-\*\/\+\-\.\/.]/.test(key)) {
      // Appelle la fonction "souris" avec la touche en paramètre
      souris(key);
    }
  }

  // Fonction pour gérer les clics sur les boutons
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
      // Utilise le texte brut pour la division
      display.value += "/";
    } else if (value === "×") {
      // Utilise le texte brut pour la multiplication
      display.value += "*";
    } else if (value === "+/-") {
      // Change le signe du nombre affiché
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
    // Place le focus sur le champ de saisie pour déplacer le curseur à la fin
    display.focus();

    // Défile le champ de saisie horizontalement pour mettre le curseur à la fin
    display.scrollLeft = display.scrollWidth;
  }

  // Sélectionne des éléments supplémentaires du DOM
  const thba = document.querySelector(".thb");
  const calculatrice = document.querySelector(".calculatrice");
  const thbhex = document.querySelector(".thbhex");
  const thbdec = document.querySelector(".thbdec");

  // Variable pour le mode sombre
  let dark = true;

  // Gère le clic sur l'élément avec la classe "thb"
  thba.onclick = () => {
    // Appelle la fonction pour basculer entre le mode sombre et le mode clair
    toggleDarkMode();
  };

  // Gère le clic sur l'élément avec la classe "thbhex"
  thbhex.onclick = () => {
    // Appelle la fonction pour basculer entre les modes décimal et hexadécimal
    toggleHexMode();
  };

  // Gère le clic sur l'élément avec la classe "thbdec"
  thbdec.onclick = () => {
    // Appelle la fonction pour basculer entre les modes hexadécimal et décimal
    toggleDecMode();
  };

  // Fonction pour basculer entre le mode sombre et le mode clair
  function toggleDarkMode() {
    // Ajoute ou supprime la classe "dark" à l'élément de la calculatrice
    calculatrice.classList.toggle("dark");
    // Ajoute ou supprime la classe "actif" à l'élément avec la classe "thb"
    thba.classList.toggle("actif");
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
    var currentValue = display.value;

    // Vérifie si la calculatrice est en mode sombre
    if (dark) {
      // La calculatrice est en mode sombre, réinitialise l'affichage à zéro
      display.value = "";
      return; //si on appuye sur le bouton rien ne se passe
    }

    // Convertit la valeur actuelle en hexadécimal
    var hexValue = Number(currentValue).toString(16);

    // Met à jour l'affichage avec la valeur hexadécimale
    display.value = hexValue;
  }

  // Fonction pour basculer entre les modes hexadécimal et décimal
  function toggleDecMode() {
    // Récupère la valeur actuelle de l'affichage
    var currentValue = display.value;

    // Vérifie si la calculatrice est en mode sombre
    if (dark) {
      // La calculatrice est en mode sombre, réinitialise l'affichage à zéro
      display.value = "";
      return; //si on appuye sur le bouton rien ne se passe
    }

    // Convertit la valeur actuelle en décimal
    var decValue = parseInt(currentValue, 16);

    // Met à jour l'affichage avec la valeur décimale
    display.value = decValue;
  }
});
