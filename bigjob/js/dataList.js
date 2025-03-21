let fausseBDD;

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

if (!sessionStorage.getItem("infos")) {
  getJson().then((infos) => {
    fausseBDD = infos;
    console.log(infos);
    console.log("infos json");
    sessionStorage.setItem("infos", JSON.stringify(fausseBDD));
  });
} else {
  fausseBDD = JSON.parse(sessionStorage.getItem("infos"));
  console.log("full infos session");
}

getJson();
