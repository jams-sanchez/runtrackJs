users = JSON.parse(sessionStorage.getItem("users"));
let demandes = JSON.parse(sessionStorage.getItem("demandes"));

// SAUVEGARDE: Infos du membre connecté en session
// const emailConnecte = sessionStorage.getItem("email");
// const nomConnecte = sessionStorage.getItem("nom");
// const roleConnecte = sessionStorage.getItem("role");

// elements
const avant = document.getElementById("avant");
const apres = document.getElementById("apres");
const calendrier = document.getElementById("jour");
const moisNom = document.getElementById("moisNom");
const listeJours = document.getElementById("jour-nom");
const choixBtn = document.getElementById("choix-date");
const infoMsg = document.getElementById("msg");

// cache le bouton
if (choixBtn) {
  choixBtn.style.visibility = "hidden";
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

const createCalendrier = (month, year) => {
  calendrier.innerHTML = "";
  moisNom.innerHTML = "";
  listeJours.innerHTML = "";

  let date = 1;
  const premierJour = (new Date(year, month, 1).getDay() + 6) % 7;
  const joursDansMois = new Date(year, month + 1, 0).getDate();

  // affichage du mois
  moisNom.innerHTML = mois[month];

  // affichage des noms des jours
  jours.forEach((jour) => {
    let jourText = document.createElement("td");
    jourText.innerHTML = jour.slice(0, 3);
    listeJours.appendChild(jourText);
  });

  // remplissage de la grille de jour
  for (let i = 0; i < 6; i++) {
    let semaine = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < premierJour) || date > joursDansMois) {
        let jourNum = document.createElement("td");
        semaine.appendChild(jourNum);
      } else {
        let jourNum = document.createElement("td");
        jourNum.style.borderRadius = "100%";
        jourNum.innerHTML = date;
        jourNum.style.cursor = "pointer";

        // style

        if (
          j == 5 ||
          j == 6 ||
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
      if (demande.eleve === emailConnecte) {
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
      if (demande.eleve === emailConnecte) {
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
          } else if (
            demande.statut === "annulé" ||
            demande.statut === "refusé"
          ) {
            Array.from(dateCase).forEach((td) => {
              if (td.textContent === date[0].toString()) {
                td.style.backgroundColor = "rgba(255, 0, 0, 0.842)";
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
  choixBtn.style.visibility = "hidden";

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
  choixBtn.style.visibility = "hidden";

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
      fullDateSelected = "";
      choixBtn.style.visibility = "hidden";
      console.log("Date passé ou weekend");
      console.log(fullDateSelected);
    } else {
      fullDateSelected = getFullDate(selectDate, moisPage);
      console.log(fullDateSelected);
      const dateExiste = verifDate(fullDateSelected);

      if (!dateExiste) {
        choixBtn.style.visibility = "visible";
        select.style.backgroundColor = "white";
        select.style.color = "black";
        dateClique = select;
      }
    }
  }
});

// EVENEMENT : ajout demande de date
choixBtn.addEventListener("click", () => {
  const demandeEleve = emailConnecte;

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
// createCalendrier(2025, 5);
afficheDate();
