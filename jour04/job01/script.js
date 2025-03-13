
let button = document.getElementById("button");

const afficheText = async () => {
  const reponse = await fetch('./expression.txt');
  const phrase = await reponse.text();
  console.log(phrase);
  
  const p = document.createElement("p");
  p.textContent = phrase;
  document.body.insertBefore(p, button);
}

button.addEventListener('click', () => {
  afficheText();
})