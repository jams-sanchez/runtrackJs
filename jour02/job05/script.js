
document.addEventListener("scroll", loading = () => {
    let scrollTop = window.scrollY;
    let hauteurDoc = document.documentElement.scrollHeight - window.innerHeight;
    let pourcentage = (scrollTop / hauteurDoc) * 100; 

    let red = 0;
    let green = Math.min(pourcentage * 2.55);
    let blue = Math.max(255 - (pourcentage * 2.55));

    document.querySelector("footer").style.backgroundColor = `rgb(${red},${green},${blue})`;
});
