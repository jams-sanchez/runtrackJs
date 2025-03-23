// SAUVEGARDE: Infos du membre connecté en session
const emailConnecte = sessionStorage.getItem("email");
const nomConnecte = sessionStorage.getItem("nom");
const roleConnecte = sessionStorage.getItem("role");

// ELEMENTS
const navIns = document.getElementById("navIns");
const navCo = document.getElementById("navCo");
const navDeco = document.getElementById("navDeco");
const navAdmin = document.getElementById("navAdmin");
const navCal = document.getElementById("navCal");

if (emailConnecte) {
  navCo.style.display = "none";
  navIns.style.display = "none";
  if (roleConnecte === "eleve") {
    navAdmin.style.display = "none";
  }
} else if (!emailConnecte) {
  navCal.style.display = "none";
  navDeco.style.display = "none";
  navAdmin.style.display = "none";
}

// DECONNEXION

if (emailConnecte) {
  navDeco.addEventListener("click", () => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("nom");
    location.href = "../index.html";
  });
}
