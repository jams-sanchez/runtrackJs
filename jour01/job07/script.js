
let fullDate = new Date("2025-11-02");

let jour = fullDate.getDay();
let date = fullDate.getDate();
let mois = fullDate.getMonth();
let annee = fullDate.getFullYear();

const jourTravaille = (jour, date, mois, annee) => {

    // liste des jours 
    const listeJours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
    // liste des mois
    const listeMois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

    // liste des jours fériés
    const joursFeries = [
        "1-1", // Nouvel An
        "1-4", // Lundi de Pâques
        "1-5", // Fête du Travail
        "8-5", // Victoire 1945
        "9-5", // Ascension
        "20-5", // Lundi de Pentecôte
        "14-7", // Fête Nationale
        "15-8", // Assomption
        "1-11", // Toussaint
        "11-11", // Armistice 1918
        "25-12"  // Noël
    ];

    // vérifie si le jour est férié ou non
    let verifJours = `${date}-${(mois + 1)}`;

    if (joursFeries.includes(verifJours)) {
        console.log(`Le ${listeJours[jour]} ${date} ${listeMois[mois]} ${annee} est un jour férié.`);
    }

    // vérifie si le jour est un samedi ou un dimanche
    else if (jour == 5 || jour == 6) {
        console.log(`Non, le ${listeJours[jour]} ${date} ${listeMois[mois]} ${annee} est un week-end.`)
    }

    else {
        console.log(`Oui, le ${listeJours[jour]} ${date} ${listeMois[mois]} est un jour travaillé.`);
    }
}

jourTravaille(jour, date, mois, annee); 