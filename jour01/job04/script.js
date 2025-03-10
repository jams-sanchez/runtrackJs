
// méthode pour savoir si l'année est bisextile

let bisextile = annee => {
    return annee % 4 == 0 && annee % 100 != 0 && annee % 400 == 0 ? true : false; 
}
console.log(bisextile(2000));