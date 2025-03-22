// elements
const avant = document.getElementById("avant");
const apres = document.getElementById("apres");
const calendrier = document.getElementById("jour");
const moisNom = document.getElementById("moisNom");
const listeJours = document.getElementById("jour-nom");

// variables
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

let moisPage;

console.log(jourActuel);

const getJourSemaine = (day, month) => {
  const anneeActuelle = new Date().getFullYear();
  const fullDate = new Date(anneeActuelle, month, day);
  const jourIndex = (fullDate.getDay() + 6) % 7;
  return jours[jourIndex];
};

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

createCalendrier(jourActuel.getMonth(), jourActuel.getFullYear());

let clic = 0;

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
});

// METHODE CLICK DATE
let dateClique;
calendrier.addEventListener("click", (e) => {
  let select = e.target;
  let selectDate = parseInt(select.innerHTML);
  let jourSelect = getJourSemaine(selectDate, moisPage);

  if (select.innerHTML !== "") {
    if (dateClique) {
      dateClique.style.backgroundColor = "";
    }

    if (
      (selectDate <= jourActuel.getDate() &&
        moisPage === jourActuel.getMonth()) ||
      moisPage < jourActuel.getMonth() ||
      jourSelect === "samedi" ||
      jourSelect === "dimanche"
    ) {
      console.log("Date passé ou weekend");
    } else {
      select.style.backgroundColor = "red";
      dateClique = select;
    }
  }
});

// console.log(jours[jourActuel.getDay() - 1]);
// console.log(moisPage);
// console.log(moisNom.innerHTML);
