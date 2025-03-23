let users;
let demandes;

// JSON: récupération des données
const getJson = async () => {
  try {
    const reponse = await fetch("./js/data.json");
    const infos = await reponse.json();
    return infos[0];
  } catch (error) {
    console.error("Erreur de chargement: ", error);
  }
};

// JSON: sépare les données (users et demandes)
if (!sessionStorage.getItem("users") || !sessionStorage.getItem("demandes")) {
  getJson().then((infos) => {
    users = infos.membres;
    demandes = infos.requetes;
    sessionStorage.setItem("users", JSON.stringify(users));
    sessionStorage.setItem("demandes", JSON.stringify(demandes));
    // console.log(typeof users);
    // console.log(typeof demandes);
    // console.log("infos json");
    // sessionStorage.setItem("infos", JSON.stringify(fausseBDD));
  });
} else {
  users = JSON.parse(sessionStorage.getItem("users"));
  demandes = JSON.parse(sessionStorage.getItem("demandes"));
  // fausseBDD = JSON.parse(sessionStorage.getItem("infos"));
  // console.log(typeof users);
  // console.log(typeof demandes);
}

getJson();
