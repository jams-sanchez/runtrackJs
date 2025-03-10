
// variable de trie ASC ou DESC
// let order = "asc";
let order = "desc";

// tableau de nombres
const numbers = [31, 39, 26, 16, 90, 10, 28, 91, 15, 32, 47];

// méthode pour trier les nombres
const trie = (array, string) => {

    if (string == "asc") {
        return array.sort((a, b) => a - b);
        
    } else if (string == "desc") {
        return array.sort((a, b) => b - a);
    }

}

console.log(trie(numbers, order));
