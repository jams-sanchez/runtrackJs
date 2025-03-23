let users = JSON.parse(sessionStorage.getItem("users"));
let demandes = JSON.parse(sessionStorage.getItem("demandes"));

const listeRole = ["moderateur", "admin"];

// ELEMENTS:
const infoMsg = document.getElementById("msg");
infoMsg.style.display = "none";
const adminSection = document.getElementById("adminSection");
const afficheMod = document.getElementById("afficheMod");
const afficheAdmin = document.getElementById("afficheAdmin");
const ajoutRole = document.querySelector("#ajoutRole");
const form = document.querySelector("form");
const btnAjouter = document.querySelector("#ajouter");
const btnEnvoyer = document.querySelector("#envoyer");
const btnAnnuler = document.querySelector("#annuler");
const inputEmail = document.querySelector("#emailRole");
const inputType = document.querySelector("#type");
// const selectRole = document.querySelector("#selectRole")
// console.log(inputEmail);
// console.log(inputType);

if (ajoutRole) {
  ajoutRole.style.display = "none";
}

// empêche les boutons d'un formulaire d'actualiser la page
if (form) {
  form.addEventListener("submit", (e) => e.preventDefault());
}

// AFFICHAGE - Handlebars : template d'affichage des demandes de présence
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

// AFFICHAGE : section admin
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
        <button id="supprimer" value="${mod.id}" type="submit" class="btn btn-danger btn-sm">
            Supprimer
        </button>
      </div>
    </div>
    `;
    });
  } else {
    afficheMod.innerHTML = `
    <p class="msg-info">Liste vide</p>
    `;
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
            <button id="supprimer" value="${admin.id}" type="submit" class="btn btn-danger btn-sm">
                Supprimer
            </button>
          </div>
        </div>`;
    });
  } else {
    afficheAdmin.innerHTML = `
    <p class="msg-info">Liste vide</p>
    `;
  }
};

// BACKOFFICE: affichage different selon role
if (roleConnecte && roleConnecte === "moderateur") {
  if (adminSection) {
    adminSection.style.display = "none";
  }
} else if (roleConnecte === "admin") {
  afficheModAdmin();
}

// METHODES

const supprimerMembre = (user) => {
  const index = users.findIndex((membre) => membre.id === user);
  users.forEach((membre) => {
    if (membre.id === user && membre.email != emailConnecte) {
      // retirer role
      users[index].role = "eleve";
      // supprimer membre
      // delete users[index];
      // users = users.filter((membre) => membre.id !== user);
    } else {
      console.log("ici");
    }
  });
  sessionStorage.setItem("users", JSON.stringify(users));
};

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

// GESTION evenements

const actionSupprimer = () => {
  btnSupprimer = document.querySelectorAll("#supprimer");

  btnSupprimer.forEach((btn) => {
    btn.addEventListener("click", () => {
      const valueBtn = parseInt(btn.value);
      supprimerMembre(valueBtn);
      afficheModAdmin();
      actionSupprimer();
    });
  });
};

const actionDate = () => {
  // élements boutons
  const btnAccepter = document.querySelectorAll("#accepter");
  const btnRefuser = document.querySelectorAll("#refuser");

  // événement sur chaque bouton valider
  btnAccepter.forEach((btn) => {
    btn.addEventListener("click", () => {
      const valueBtn = parseInt(btn.value);
      validerDate(valueBtn);
      handleDemande();
      actionDate();
    });
  });

  // événement sur chaque bouton refuser
  btnRefuser.forEach((btn) => {
    btn.addEventListener("click", () => {
      const valueBtn = parseInt(btn.value);
      refuserDate(valueBtn);
      handleDemande();
      actionDate();
    });
  });
};

// GESTION formulaire

let clickBtn = 1;

btnAjouter.addEventListener("click", () => {
  clickBtn++;
  if (ajoutRole && clickBtn % 2 == 0) {
    ajoutRole.style.display = "block";
    btnAjouter.style.display = "none";
  } else {
    ajoutRole.style.display = "none";
  }
});

if (btnAnnuler) {
  btnAnnuler.addEventListener("click", () => {
    ajoutRole.style.display = "none";
    btnAjouter.style.display = "block";
    clickBtn = 1;
  });
}

if (btnEnvoyer) {
  btnEnvoyer.addEventListener("click", () => {
    const emailValue = inputEmail.value.trim();
    const selectValue = inputType.value;

    if (infoMsg) {
      inputEmail.addEventListener("focus", () => (infoMsg.innerHTML = ""));
    }

    if (!emailValue) {
      infoMsg.style.display = "block";
      infoMsg.innerHTML = "Veuillez saisir un email";
      infoMsg.classList.add("msg-error");
    } else {
      infoMsg.innerHTML = "";
      const index = users.findIndex((membre) => membre.email === emailValue);
      console.log(index);
      if (index !== -1) {
        listeRole.forEach((role) => {
          if (role === selectValue) {
            users[index].role = selectValue;
            sessionStorage.setItem("users", JSON.stringify(users));
            afficheModAdmin();
            actionSupprimer();
          }
        });
      } else {
        infoMsg.style.display = "block";
        infoMsg.innerHTML = "Email incorrect";
        infoMsg.classList.add("msg-error");
      }
    }
  });
}

handleDemande();
actionDate();
actionSupprimer();
