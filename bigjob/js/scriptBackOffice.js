let users = JSON.parse(sessionStorage.getItem("users"));
let demandes = JSON.parse(sessionStorage.getItem("demandes"));

// BACKOFFICE: affichage des elements page backoffice
if (roleConnecte && roleConnecte === "moderateur") {
  if (adminSection) {
    adminSection.style.display = "none";
  }
}

// ELEMENTS:
const infoMsg = document.getElementById("msg");
const adminSection = document.getElementById("adminSection");
const afficheMod = document.getElementById("afficheMod");
const afficheAdmin = document.getElementById("afficheAdmin");
// console.log(afficheAdmin);
// console.log(afficheMod);

// HANDLEBARS template d'affichage des demandes de présence

const handleDemande = () => {
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

  if (listeDemande.demandes.length === 0) {
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

// WITHOUT Handlebars
const afficheModAdmin = () => {
  let listeMod = {
    moderateur: [],
  };

  let listeAdmin = {
    admin: [],
  };

  if (users) {
    users.forEach((user) => {
      if (user.role === "moderateur") {
        listeMod.moderateur.push(user);
      } else if (user.role === "admin") {
        listeAdmin.admin.push(user);
      }
    });
  }

  // affichage liste des moderateurs
  if (listeMod.moderateur.length > 0) {
    afficheMod.innerHTML = "";
    listeMod.moderateur.forEach((mod) => {
      afficheMod.innerHTML += `
    <div class="card" style="width: 18rem;">
      <div class="card-header">
        <h5>${mod.email}</h5>
      </div>
      <div class="card-body">
        <button id="SupprimerMod" value="${mod.id}" type="submit" class="btn btn-danger btn-sm">
            Supprimer
        </button>
      </div>
    </div>
    `;
    });
  }

  // affichage liste des admins
  if (listeAdmin.admin.length > 0) {
    afficheAdmin.innerHTML = "";
    listeAdmin.admin.forEach((admin) => {
      afficheAdmin.innerHTML += `
    <div class="card" style="width: 18rem;">
      <div class="card-header">
        <h5>${admin.email}</h5>
      </div>
      <div class="card-body">
        <button id="SupprimerAdmin" value="${admin.id}" type="submit" class="btn btn-danger btn-sm">
            Supprimer
        </button>
      </div>
    </div>
    `;
    });
  }
};

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
afficheModAdmin();
evenementsBtn();
