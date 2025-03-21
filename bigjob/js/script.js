let users = JSON.parse(sessionStorage.getItem("users"));
// console.log(users);

//
// pour creer nouveau membre //
// let signup = new Membre("bla@laplateforme.io", "test");
// users.push(signup);
// console.log(users);
// sessionStorage.setItem("users", JSON.stringify(users));
//

// MESSAGE: style message d'info ou d'erreur
const infoMsg = document.createElement("p");
infoMsg.innerHTML = "Veuillez remplir tous les champs.";
infoMsg.style.color = "red";
infoMsg.style.fontSize = "1rem";
infoMsg.style.fontWeight = "bold";

// ELEMENTS:
// connexion / inscription
const form = document.querySelector("form");
const btnConnexion = document.getElementById("connexion");
const btnInscription = document.getElementById("inscription");
const inputEmail = document.getElementById("email");
const inputPass = document.getElementById("motDePasse");
// backoffice
const adminSection = document.getElementById("adminSection");

// empêche les boutons d'un formulaire d'actualiser la page
if (form) {
  form.addEventListener("submit", (e) => e.preventDefault());
}

// SAUVEGARDE: Infos du membre connecté en session
const email = sessionStorage.getItem("email");
const nom = sessionStorage.getItem("nom");
const role = sessionStorage.getItem("role");

if (email || nom || role) {
  console.log("email sauvegardé: ", email);
  console.log("nom sauvegardé: ", nom);
  console.log("role sauvegardé: ", role);
}

// BACKOFFICE: affichage des elements page backoffice
if (role && role === "moderateur") {
  if (adminSection) {
    adminSection.style.display = "none";
  }
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
          infoMsg.innerText = "Vous êtes connecté";
          form.append(infoMsg);

          // stockage des infos user connecté dans une session
          sessionStorage.setItem("email", mail);
          sessionStorage.setItem("role", membre.role);
          let creeNom = mail.replace("@", " ");
          creeNom = creeNom.split(" ");
          creeNom = creeNom[0];
          sessionStorage.setItem("nom", creeNom);

          // redirection vers page selon role
          setTimeout(() => {
            infoMsg.remove();
            if (membre.role === "eleve") {
              location.href = "../pages/calendrier.html";
            } else {
              location.href = "../pages/backoffice.html";
            }
          }, 2000);
        } else {
          infoMsg.innerText = "Mot de passe incorrect";
          form.append(infoMsg);
          if (infoMsg) {
            inputPass.addEventListener("focus", () => infoMsg.remove());
          }
        }
      } else if (!mailTrouve) {
        infoMsg.innerText = "Email incorrect";
        form.append(infoMsg);
        if (infoMsg) {
          inputEmail.addEventListener("focus", () => infoMsg.remove());
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
    if (!emailValue || !passwordValue) {
      console.error("Veuillez remplir tous les champs.");
      form.append(infoMsg);
      if (infoMsg) {
        inputEmail.addEventListener("focus", () => infoMsg.remove());
        inputPass.addEventListener("focus", () => infoMsg.remove());
      }
    } else {
      infoMsg.remove();
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

    if (verifMail(emailValue)) {
      if (verifMembre(emailValue)) {
        infoMsg.innerText = "Cet email est déjà utilisé.";
        form.append(infoMsg);
      } else {
        if (verifPass(passwordValue)) {
          //ajout dans fausse bdd
          let newMembre = new Membre(emailValue, passwordValue);
          users.push(newMembre);
          sessionStorage.setItem("users", JSON.stringify(users));
          // msg info succes
          infoMsg.innerText = "Vous êtes désormais inscrit.";
          form.append(infoMsg);
          // redirection sur la connexion
          setTimeout(() => {
            infoMsg.remove();
            location.href = "../pages/connexion.html";
          }, 2000);
        } else {
          infoMsg.innerText = "Le mot de passe ne remplit pas les conditions";
          form.append(infoMsg);
        }
      }
    } else {
      infoMsg.innerText = "Veuillez saisir un email.";
      form.append(infoMsg);
    }
  });
}
