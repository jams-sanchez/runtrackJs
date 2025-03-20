// affichage msg info / error
const infoMsg = document.createElement("p");
infoMsg.innerHTML = "Veuillez remplir tous les champs.";
infoMsg.style.color = "red";
infoMsg.style.fontSize = "1rem";
infoMsg.style.fontWeight = "bold";

// variables CONNEXION
const form = document.querySelector("form");
const btnConnexion = document.getElementById("connexion");
const inputEmail = document.getElementById("email");
const inputPass = document.getElementById("motDePasse");
let email;
let password;

// empêche les boutons d'actualiser la page
if (form) {
  form.addEventListener("click", (e) => e.preventDefault());
}

// récupération des données
const getJson = async () => {
  try {
    const reponse = await fetch("../js/data.json");
    const fullData = await reponse.json();
    return fullData;
  } catch (error) {
    console.error("Erreur de chargement: ", error);
  }
};

// vérifie le mail et mot de passe
const verifInfo = () => {
  getJson().then((data) => {
    if (data) {
      let membres = data.find((item) => item.membres)?.membres;
      let mailTrouve = false;
      let passTrouve = false;

      membres.forEach((membre) => {
        if (membre.email === email) {
          mailTrouve = true;
          if (password === membre.motDePasse) {
            passTrouve = true;
            membre.connecte = true;
            infoMsg.innerText = ` Vous êtes connecté en tant que ${membre.role}`;
            form.append(infoMsg);
            setTimeout(() => {
              infoMsg.remove();
              location.href = "../pages/calendrier.html";
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
  });
};

// déclenche la connexion
if (btnConnexion) {
  btnConnexion.addEventListener("click", () => {
    email = inputEmail.value.trim();
    password = inputPass.value.trim();

    if (!email || !password) {
      console.error("Veuillez remplir tous les champs.");
      form.append(infoMsg);
      if (infoMsg) {
        inputEmail.addEventListener("focus", () => infoMsg.remove());
        inputPass.addEventListener("focus", () => infoMsg.remove());
      }
    } else {
      infoMsg.remove();
      verifInfo(email, password);
    }
  });
}
