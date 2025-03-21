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
    let passTrouve = false;

    users.forEach((membre) => {
      if (membre.email === mail) {
        mailTrouve = true;
        if (membre.motDePasse === pass) {
          passTrouve = true;
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
          passTrouve = false;
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

// INSCRIPTION

// verif email
function looksLikeMail(mail) {
  const lastAt = mail.lastIndexOf("@");
  const beforeAt = mail.slice(0, lastAt); // texte avant @
  const afterAt = mail.slice(lastAt + 1); // texte apres @
  const laPlat = "laplateforme.io";
  const regex = /^[A-Za-z0-9]+$/; // lettres maj ou min ou chiffres

  // console.log(lastAt > 3 && afterAt === laPlat && regex.test(beforeAt));
  return lastAt > 3 && afterAt === laPlat && regex.test(beforeAt);
}

looksLikeMail("testi@laplat@eforme.io");

// lancement de l'inscription
if (btnInscription) {
  btnInscription.addEventListener("click", () => {
    const emailValue = inputEmail.value.trim();

    console.log(emailValue);
  });
}
