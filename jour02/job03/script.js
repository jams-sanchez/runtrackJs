
let compteur = 0;

const addOne = () => {
    compteur++;
    document.getElementById("compteur").innerHTML = compteur;
}

let bouton = document.getElementById("button");
bouton.addEventListener("click", addOne);
