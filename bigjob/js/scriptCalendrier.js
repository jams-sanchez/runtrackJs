users = JSON.parse(sessionStorage.getItem("users"));
let demandes = JSON.parse(sessionStorage.getItem("demandes"));

// elements
const avant = document.getElementById("avant");
const apres = document.getElementById("apres");
const calendrier = document.getElementById("jour");
const moisNom = document.getElementById("moisNom");
const listeJours = document.getElementById("jour-nom");
const choixBtn = document.getElementById("choix-date");

// empêche le bouton d'actualiser la page
if (choixBtn) {
  choixBtn.addEventListener("submit", (e) => e.preventDefault());
}

// variable const
const jourActuel = new Date();
const mois = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

const jours = [
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
  "dimanche",
];

// variables let
let moisPage;
let clic = 0;
let fullDateSelected;

// console.log(jourActuel);

// CREATION CALENDRIER
const getJoursDansMois = (month, year) => {
  return new Date(year, month, 0).getDate();
};

const createCalendrier = (month, year) => {
  calendrier.innerHTML = "";
  moisNom.innerHTML = "";
  listeJours.innerHTML = "";

  let date = 1;
  const joursDansMois = getJoursDansMois(month + 1, year);

  // affichage du mois
  moisNom.innerHTML = mois[month];

  // affichage des noms des jours
  jours.forEach((jour) => {
    let jourText = document.createElement("th");
    jourText.innerHTML = jour.slice(0, 3);
    listeJours.appendChild(jourText);
  });

  // remplissage de la grille de jour
  for (let i = 0; i < 6; i++) {
    let semaine = document.createElement("tr");

    for (let j = 1; j < 8; j++) {
      if (
        (i === 0 && j < new Date(year, month, 1).getDay()) ||
        date > joursDansMois
      ) {
        let jourNum = document.createElement("td");
        semaine.appendChild(jourNum);
      } else {
        let jourNum = document.createElement("td");
        jourNum.style.borderRadius = "100%";
        jourNum.innerHTML = date;
        jourNum.style.cursor = "pointer";

        // style

        if (
          j == 6 ||
          j == 7 ||
          (date <= jourActuel.getDate() && month === jourActuel.getMonth()) ||
          month < jourActuel.getMonth()
        ) {
          jourNum.style.opacity = "0.4";
          jourNum.style.cursor = "default";
        }

        if (date === jourActuel.getDate() && month === jourActuel.getMonth()) {
          jourNum.style.backgroundColor = "blue";
          jourNum.style.opacity = "1";
        }

        semaine.appendChild(jourNum);
        date++;
      }
    }

    moisPage = mois.indexOf(moisNom.innerHTML);
    calendrier.appendChild(semaine);
  }
};

// METHODE: gestion événements
const getJourSemaine = (day, month) => {
  const anneeActuelle = new Date().getFullYear();
  const fullDate = new Date(anneeActuelle, month, day);
  const jourIndex = (fullDate.getDay() + 6) % 7;
  return jours[jourIndex];
};

const getFullDate = (day, month) => {
  return `${day}-${month + 1}-2025`;
};

const ajoutDemande = (eleve, date) => {
  let newDemande = new Demande(eleve, date);
  demandes.push(newDemande);
  sessionStorage.setItem("demandes", JSON.stringify(demandes));
};

const verifDate = (demandeDate) => {
  let count = 0;
  if (demandes) {
    demandes.forEach((demande) => {
      if (demande.eleve === sessionStorage.getItem("email")) {
        if (demandeDate === demande.date) {
          count++;
        }
      }
    });
  }

  if (count > 0) {
    return true;
  } else {
    return false;
  }
};

const afficheDate = () => {
  if (demandes) {
    let dateCase = document.getElementsByTagName("td");

    demandes.forEach((demande) => {
      if (demande.eleve === sessionStorage.getItem("email")) {
        let recupDate = demande.date.split("-");
        let date = [];
        recupDate.forEach((item) => date.push(parseInt(item)));
        if (moisPage === date[1] - 1) {
          if (demande.statut === "en attente") {
            Array.from(dateCase).forEach((td) => {
              if (td.textContent === date[0].toString()) {
                td.style.backgroundColor = "#ffa60081";
                td.style.cursor = "default";
              }
            });
          } else if (demande.statut === "annulé") {
            Array.from(dateCase).forEach((td) => {
              if (td.textContent === date[0].toString()) {
                td.style.backgroundColor = "#d13c3cc2";
                td.style.cursor = "default";
              }
            });
          } else {
            Array.from(dateCase).forEach((td) => {
              if (td.textContent === date[0].toString()) {
                td.style.backgroundColor = "#0fb900bb";
                td.style.cursor = "default";
              }
            });
          }
        }
      }
    });
  }
};

// GESTION CLIQUE: clique mois avant
avant.addEventListener("click", () => {
  clic--;

  const newMois = jourActuel.getMonth() + clic;
  if (newMois === 0) {
    avant.style.visibility = "hidden";
    createCalendrier(newMois, jourActuel.getFullYear());
  } else {
    apres.style.visibility = "visible";
    createCalendrier(newMois, jourActuel.getFullYear());
  }
  afficheDate();
});

// GESTION CLIQUE: clique mois apres
apres.addEventListener("click", () => {
  clic++;

  const newMois = jourActuel.getMonth() + clic;
  if (newMois === 11) {
    apres.style.visibility = "hidden";
    createCalendrier(newMois, jourActuel.getFullYear());
  } else {
    avant.style.visibility = "visible";
    createCalendrier(newMois, jourActuel.getFullYear());
  }
  afficheDate();
});

// EVENEMENT: choix date
let dateClique;
calendrier.addEventListener("click", (e) => {
  let select = e.target;
  let selectDate = parseInt(select.innerHTML);
  let jourSelect = getJourSemaine(selectDate, moisPage);

  // gestion des jours weekend ou jours passé
  if (select.innerHTML !== "") {
    if (dateClique) {
      dateClique.style.backgroundColor = "";
      dateClique.style.color = "white";
    }

    if (
      (selectDate <= jourActuel.getDate() &&
        moisPage === jourActuel.getMonth()) ||
      moisPage < jourActuel.getMonth() ||
      jourSelect === "samedi" ||
      jourSelect === "dimanche"
    ) {
      // => definir message d'erreur <=
      fullDateSelected = "";
      choixBtn.style.visibility = "hidden";
      console.log("Date passé ou weekend");
    } else {
      fullDateSelected = getFullDate(selectDate, moisPage);
      const dateExiste = verifDate(fullDateSelected);

      if (!dateExiste) {
        choixBtn.style.visibility = "visible";
        select.style.backgroundColor = "white";
        select.style.color = "black";
        dateClique = select;
      } else {
        // message info : affiche statut de la demande
      }
    }
  }
});

// EVENEMENT : ajout demande de date
choixBtn.addEventListener("click", () => {
  const demandeEleve = sessionStorage.getItem("email");

  const dateExiste = verifDate(fullDateSelected);
  if (!dateExiste) {
    ajoutDemande(demandeEleve, fullDateSelected);
    afficheDate();
    dateClique.style.color = "white";
    dateClique = "";
  } else {
    console.log("essayer une autre date");
  }
});

// console.log(jours[jourActuel.getDay() - 1]);
// console.log(moisNom.innerHTML);

createCalendrier(jourActuel.getMonth(), jourActuel.getFullYear());
afficheDate();
