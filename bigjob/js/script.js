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

// variables CONNEXION
const form = document.querySelector("form");
const btnConnexion = document.getElementById("connexion");
const inputEmail = document.getElementById("email");
const inputPass = document.getElementById("motDePasse");

// empêche les boutons d'actualiser la page
if (form) {
  form.addEventListener("click", (e) => e.preventDefault());
}

const connexion = () => {
  getJson().then((data) => {
    if (data) {
      let membres = data.find((item) => item.membres)?.membres;
      membres.forEach((membre) => {
        const verifMail = membre.email;
        console.log(verifMail);
      });
    }
  });
};

// connexion();

btnConnexion.addEventListener("click", () => {
  const email = inputEmail.value.trim();
  const password = inputPass.value.trim();
  console.log(email);
  console.log(password);
  // affichage msg erreur
  const errorMsg = document.createElement("p");
  errorMsg.innerHTML = "Veuillez remplir tous les champs.";
  errorMsg.style.color = "red";
  errorMsg.style.fontSize = "1rem";
  errorMsg.style.fontWeight = "bold";

  if (!email || !password) {
    console.error("Veuillez remplir tous les champs.");
    form.append(errorMsg);
  } else {
    errorMsg.remove();
    connexion(email, password);
  }
});
