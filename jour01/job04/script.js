
// méthode pour savoir si l'année est bisextile

let bisextile = annee => {
    return annee % 4 == 0 && (annee % 100 !== 0 || annee % 400 === 0)? true : false; 
}
console.log(bisextile(1994));
console.log(bisextile(2024));
console.log(bisextile(2012));
console.log(bisextile(2001));