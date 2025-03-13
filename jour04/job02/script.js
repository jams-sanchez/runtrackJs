
// let stringJson = '{"name": "La Plateforme", "adress": "8 rue hozier", "city": "Marseille", "nb_staff": "11", "creation": "2019"}';
// let objet = JSON.parse(stringJson);
// console.log(objet);

let objet;

const getJson = async () => {
    const reponse = await fetch('./info.json');
    const info = await reponse.text();
    objet = JSON.parse(info);

    jsonValueKey(objet, "adress");
}


const jsonValueKey = (string, cle) => {
    console.log(string[cle]);  
}

getJson();



