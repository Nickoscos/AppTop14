const EventEmitter = require('events');
let fs = require('fs');
const event = new EventEmitter;

let saison = {
    anneeDebut: 2022,
    anneeFin: 2023
};


//Fonction qui récupère l'année de départ de la saison
function classSaison(data){
    console.log(data)
    saison.anneeDebut = data.anneeDeb;
    saison.anneeFin = Number(data.anneeDeb)+1;
}

module.exports = {classSaison, saison};