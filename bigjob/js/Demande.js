class Demande {
  constructor(eleve, date) {
    this.id = demandes.length + 1;
    this.eleve = eleve;
    this.date = date;
    this.statut = "en attente";
  }
}
