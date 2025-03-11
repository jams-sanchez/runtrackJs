// cheat code
const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

// dictionnaire pour les touches tapées
let typedKey = [];
console.log(typedKey);

// récup les balises pour changement de style
let body = document.querySelector("body");
body.style.fontFamily = "Tahoma";

let text = document.querySelector("p");


// méthode pour savoir si le code a été écrit
document.addEventListener("keydown", check = (event) => {
        typedKey.push(event.key);
        
        if (typedKey.length > konami.length) {
            typedKey.shift();
        }

        if (typedKey.join('') === konami.join('')) {
            body.style.backgroundColor = "blue";
            text.style.color = "white";
            text.style.fontSize = "2rem";
            text.style.fontWeight = "bold";
        } 
});




