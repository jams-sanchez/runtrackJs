document.addEventListener("DOMContentLoaded", async () => {
  try {
    // recupère le fichier json
    const reponse = await fetch("./pokemon.json");
    info = await reponse.json();
    console.log(info);

    // recupere les types de tous les pokemons
    const typePok = new Set();
    info.forEach((pokemon) => pokemon.type.forEach((t) => typePok.add(t)));
    const typeSelect = document.getElementById("type");
    typePok.forEach((type) => {
      let option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      typeSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Erreur de chargement du fichier JSON: ", error);
  }
});
