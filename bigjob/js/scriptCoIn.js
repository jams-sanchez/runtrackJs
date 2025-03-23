let users = JSON.parse(sessionStorage.getItem("users"));
let demandes = JSON.parse(sessionStorage.getItem("demandes"));

// SAUVEGARDE: Infos du membre connecté en session
const email = sessionStorage.getItem("email");
const nom = sessionStorage.getItem("nom");
const role = sessionStorage.getItem("role");

// ELEMENTS:
const form = document.querySelector("form");
const btnConnexion = document.getElementById("connexion");
const btnInscription = document.getElementById("inscription");
const inputEmail = document.getElementById("email");
const inputPass = document.getElementById("motDePasse");
const infoMsg = document.getElementById("msg");

// empêche les boutons d'un formulaire d'actualiser la page
if (form) {
  form.addEventListener("submit", (e) => e.preventDefault());
}

// CONNEXION: vérifie le mail et mot de passe
const verifInfo = (mail, pass) => {
  if (users) {
    let mailTrouve = false;

    users.forEach((membre) => {
      if (membre.email === mail) {
        mailTrouve = true;
        if (membre.motDePasse === pass) {
          membre.connecte = true;
          infoMsg.classList.add("msg-succes");
          infoMsg.innerHTML = "Vous êtes connecté";

          // stockage des infos user connecté dans une session
          sessionStorage.setItem("email", mail);
          sessionStorage.setItem("role", membre.role);
          let creeNom = mail.replace("@", " ");
          creeNom = creeNom.split(" ");
          creeNom = creeNom[0];
          sessionStorage.setItem("nom", creeNom);

          // redirection vers page selon role
          setTimeout(() => {
            infoMsg.innerHTML = "";
            if (membre.role === "eleve") {
              location.href = "../pages/calendrier.html";
            } else {
              location.href = "../pages/backoffice.html";
            }
          }, 2000);
        } else {
          infoMsg.classList.add("msg-error");
          infoMsg.innerHTML = "Mot de passe incorrect";
          if (infoMsg) {
            inputPass.addEventListener("focus", () => (infoMsg.innerHTML = ""));
          }
        }
      } else if (!mailTrouve) {
        infoMsg.innerHTML = "Email incorrect";
        infoMsg.classList.add("msg-error");
        form.append(infoMsg);
        if (infoMsg) {
          inputEmail.addEventListener("focus", () => (infoMsg.innerHTML = ""));
        }
      }
    });
  }
};

// CONNEXION: déclenche la connexion
if (btnConnexion) {
  btnConnexion.addEventListener("click", () => {
    const emailValue = inputEmail.value.trim();
    const passwordValue = inputPass.value.trim();

    if (infoMsg) {
      inputEmail.addEventListener("focus", () => (infoMsg.innerHTML = ""));
      inputPass.addEventListener("focus", () => (infoMsg.innerHTML = ""));
    }

    if (!emailValue || !passwordValue) {
      infoMsg.innerHTML = "Veuillez remplir tous les champs.";
      infoMsg.classList.add("msg-error");
    } else {
      infoMsg.innerHTML = "";
      verifInfo(emailValue, passwordValue);
    }
  });
}

// INSCRIPTION: vérification mot de passe
const verifPass = (pass) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|-]).{8,}$/;
  return regex.test(pass);
};

// INSCRIPTION: vérification si le mail est deja utilisé
const verifMembre = (mail) => {
  let count = 0;
  for (membre of users) {
    if (mail === membre.email) {
      count++;
    }
  }

  if (count > 0) {
    return true;
  } else {
    return false;
  }
};

// INSCRIPTION: vérification email
const verifMail = (mail) => {
  const lastAt = mail.lastIndexOf("@");
  const beforeAt = mail.slice(0, lastAt); // texte avant @
  const afterAt = mail.slice(lastAt + 1); // texte apres @
  const laPlat = "laplateforme.io";
  const regex = /^[A-Za-z0-9]+$/; // lettres maj ou min ou chiffres
  return lastAt > 3 && afterAt === laPlat && regex.test(beforeAt);
};

// INSCRIPTION: lancement de l'inscription
if (btnInscription) {
  btnInscription.addEventListener("click", () => {
    const emailValue = inputEmail.value.trim();
    const passwordValue = inputPass.value.trim();

    if (infoMsg) {
      inputEmail.addEventListener("focus", () => (infoMsg.innerHTML = ""));
      inputPass.addEventListener("focus", () => (infoMsg.innerHTML = ""));
    }

    if (!emailValue || !passwordValue) {
      infoMsg.innerHTML = "Veuillez remplir tous les champs.";
      infoMsg.classList.add("msg-error");
    } else {
      if (verifMail(emailValue)) {
        if (verifMembre(emailValue)) {
          infoMsg.innerHTML = "Cet email est déjà utilisé.";
          infoMsg.classList.add("msg-error");
        } else {
          if (verifPass(passwordValue)) {
            //ajout dans fausse bdd
            let newMembre = new Membre(emailValue, passwordValue);
            users.push(newMembre);
            sessionStorage.setItem("users", JSON.stringify(users));
            // msg info succes
            infoMsg.innerHTML = "Vous êtes désormais inscrit.";
            infoMsg.classList.add("msg-succes");
            // redirection sur la connexion
            setTimeout(() => {
              infoMsg.innerHTML = "";
              location.href = "../pages/connexion.html";
            }, 2000);
          } else {
            infoMsg.innerHTML = "Le mot de passe ne remplit pas les conditions";
            infoMsg.classList.add("msg-error");
          }
        }
      } else {
        infoMsg.innerHTML = "Veuillez saisir un email @laplateforme.io.";
        infoMsg.classList.add("msg-error");
      }
    }
  });
}
