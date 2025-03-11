const citation = () => {
    let text = document.getElementById("citation").innerText;
    console.log(text);
}
let bouton = document.getElementById("button");
bouton.addEventListener("click", citation);
