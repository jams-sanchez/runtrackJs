let bouton = document.getElementById("button");
let text = document.getElementById("citation");

const showHide = () => {
    if (getComputedStyle(text).display != "none") {
        text.style.display = "none";
    } else {
        text.style.display = "block";
    }
}

bouton.addEventListener("click", showHide);
