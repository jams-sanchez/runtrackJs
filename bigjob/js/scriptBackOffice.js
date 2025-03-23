let users = JSON.parse(sessionStorage.getItem("users"));
let demandes = JSON.parse(sessionStorage.getItem("demandes"));

// SAUVEGARDE: Infos du membre connecté en session
const emailConnecte = sessionStorage.getItem("email");
const nomConnecte = sessionStorage.getItem("nom");
const roleConnecte = sessionStorage.getItem("role");

// ELEMENTS:
const adminSection = document.getElementById("adminSection");

// BACKOFFICE: affichage des elements page backoffice
if (roleConnecte && roleConnecte === "moderateur") {
  if (adminSection) {
    adminSection.style.display = "none";
  }
}

// handlebar template pour les demandes de présence
let listeDemande = {
  demandes: [],
};

if (demandes) {
  demandes.forEach((demande) => {
    if (demande.statut === "en attente") {
      listeDemande.demandes.push(demande);
    }
  });
}

const afficheListeDemandes =
  document.getElementById("afficheDemandes").innerHTML;
const templateDemande = Handlebars.compile(afficheListeDemandes);

const compiledHTMLDemande = templateDemande(listeDemande);
const afficheDemandes = document.getElementById("mod");
afficheDemandes.innerHTML = compiledHTMLDemande;
