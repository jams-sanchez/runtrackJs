// récupération des données
const getJson = async () => {
  try {
    const reponse = await fetch("./js/data.json");
    const info = await reponse.text();
    let fullData = JSON.parse(info);
    console.log(fullData);
    return fullData;
  } catch (error) {
    console.error("Erreur de chargement: ", error);
  }
};

// empêche les boutons d'actualiser la page
const form = document.querySelector("form");
form.addEventListener("click", (e) => e.preventDefault());

// CONNEXION
const btnConnexion = document.getElementById("connexion");
const inputEmail = document.querySelector('input[type="text"]');
const inputPass = document.querySelector('input[type="password"]');
let email = "";
let password = "";

inputEmail.addEventListener("input", (e) => {
  email = e.target.value;
});
inputPass.addEventListener("input", (e) => {
  password = e.target.value;
});

const connexion = (email, motDePasse) => {
  console.log("hello");
};

btnConnexion.addEventListener("click", (e) => {
  connexion();
});

// if (data !== undefined) {
//   // données des élèves
//   eleves = data.find((item) => item.eleves)?.eleves;
//   console.log(eleves);

//   // données des modérateurs
//   mods = data.find((item) => item.moderateurs)?.moderateurs;
//   console.log(mods);

//   // données des admins
//   admins = data.find((item) => item.moderateurs)?.moderateurs;
//   console.log(admins);
// }
