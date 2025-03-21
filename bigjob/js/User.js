class Membre {
  constructor(email, motDePasse) {
    this.id = users.length + 1;
    this.email = email;
    this.motDePasse = motDePasse;
    this.role = "eleve";
    this.connecte = false;
  }

  // recupere les variables
  // get email() {
  //   return this._email;
  // }
  // get motDePasse() {
  //   return this._motDePasse;
  // }
  // get role() {
  //   return this._role;
  // }
  // get connecte() {
  //   return this._connecte;
  // }

  // modif des variables
  // set role(newRole) {
  //   return (this._role = newRole);
  // }
  // set connecte(login) {
  //   return (this._connecte = login);
  // }
  // set presence(newDate) {
  //   return this._presence.push(newDate);
  // }
}
