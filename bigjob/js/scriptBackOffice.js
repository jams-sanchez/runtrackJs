let users = JSON.parse(sessionStorage.getItem("users"));
let demandes = JSON.parse(sessionStorage.getItem("demandes"));

// SAUVEGARDE: Infos du membre connecté en session
// const emailConnecte = sessionStorage.getItem("email");
// const nomConnecte = sessionStorage.getItem("nom");
// const roleConnecte = sessionStorage.getItem("role");

// ELEMENTS:
const infoMsg = document.getElementById("msg");
const adminSection = document.getElementById("adminSection");

// HANDLEBARS template pour les demandes de présence

const handleDemande = () => {
  let listeDemande = {
    demandes: [],
  };

  if (listeDemande.demandes.length !== 0) {
    if (demandes) {
      demandes.forEach((demande) => {
        if (demande.statut === "en attente") {
          listeDemande.demandes.push(demande);
        }
      });
    }
  } else {
    infoMsg.innerHTML = "Plus de demandes en attente";
    infoMsg.classList.add("msg-info");
  }

  const afficheListeDemandes =
    document.getElementById("afficheDemandes").innerHTML;
  const templateDemande = Handlebars.compile(afficheListeDemandes);

  const compiledHTMLDemande = templateDemande(listeDemande);
  const afficheDemandes = document.getElementById("mod");
  afficheDemandes.innerHTML = compiledHTMLDemande;
};

// BACKOFFICE: affichage des elements page backoffice
// if (roleConnecte && roleConnecte === "moderateur") {
//   if (adminSection) {
//     adminSection.style.display = "none";
//   }
// }

// METHODE gestion données

const validerDate = (id) => {
  // mise a jour du statut (voir pour si date passé)
  demandes.forEach((demande) => {
    if (demande.id === id) {
      demande.statut = "accepté";
    }
  });

  sessionStorage.setItem("demandes", JSON.stringify(demandes));
};

const refuserDate = (id) => {
  // mise a jour du statut (voir pour si date passé)
  demandes.forEach((demande) => {
    if (demande.id === id) {
      demande.statut = "refusé";
    }
  });

  sessionStorage.setItem("demandes", JSON.stringify(demandes));
};

// GESTION evenements : demandes

const evenementsBtn = () => {
  // élements boutons
  const btnAccepter = document.querySelectorAll("#accepter");
  const btnRefuser = document.querySelectorAll("#refuser");

  // événement sur chaque bouton valider
  btnAccepter.forEach((btn) => {
    btn.addEventListener("click", () => {
      const valueBtn = parseInt(btn.value);
      validerDate(valueBtn);
      handleDemande();
      evenementsBtn();
    });
  });

  // événement sur chaque bouton refuser
  btnRefuser.forEach((btn) => {
    btn.addEventListener("click", () => {
      const valueBtn = parseInt(btn.value);
      refuserDate(valueBtn);
      handleDemande();
      evenementsBtn();
    });
  });
};

handleDemande();
evenementsBtn();
