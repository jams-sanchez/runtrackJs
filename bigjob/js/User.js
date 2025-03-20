class Eleve {
  constructor(email, motDePasse) {
    this._email = email;
    this._motDePasse = motDePasse;
    this._role = "eleve";
    this._connecte = false;
    this._presence = [];
  }

  // recupere les variables
  get email() {
    return this._email;
  }
  get motDePasse() {
    return this._motDePasse;
  }
  get role() {
    return this._role;
  }
  get connecte() {
    return this._connecte;
  }
  get presence() {
    return this._presence;
  }

  // modif des variables
  set role(newRole) {
    return (this._role = newRole);
  }
  set connecte(login) {
    return (this._connecte = login);
  }
  set presence(newDate) {
    return this._presence.push(newDate);
  }
}
