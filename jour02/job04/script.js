
document.addEventListener("keydown", addLetter = (event) => {

    let text = document.getElementById("keylogger");

    if (event.key.match(/[A-Z]/i)) {
        if (document.activeElement === text) {
            text.value += event.key;
        } else {
            text.value += event.key;
        }
    }
});
