// 
let compteur = 0;

const addOne = () => {
    compteur++;
    document.getElementById("compteur").innerHTML = compteur;
}

let bouton = document.getElementById("button");
bouton.addEventListener("click", addOne);

const resetCompteur = () => {
    compteur = 0;
    document.getElementById("compteur").innerHTML = compteur;
}

let resetBut = document.getElementById("reset");
resetBut.addEventListener("click", resetCompteur);
