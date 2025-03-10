
// vérifie le nombre de diviseur
const checkDiviseur = num => {

    let nmbDiviseur = 0;

    for (let i = 1; i < 100; i++) {
        if (num % i == 0) {
            nmbDiviseur++;
        }
    }

    if (nmbDiviseur == 2) {
        return true;
    } else {
        return false;
    }
}


// additionne si les 2 nombres sont des nombres premiers
const sommeNombresPremiers = (int1, int2) => {

    numero1 = checkDiviseur(int1);
    numero2 = checkDiviseur(int2);

    if (numero1 == true && numero2 == true) {
        return int1 + int2;
    } else {
        return false;
    }
}

console.log(sommeNombresPremiers(2, 5));
console.log(sommeNombresPremiers(5, 6));
console.log(sommeNombresPremiers(29, 2));