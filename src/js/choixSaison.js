const EventEmitter = require('events');
let fs = require('fs');
const event = new EventEmitter;

let saison = {
    anneeDebut: 0,
    anneeFin: 0
};


//Fonction qui récupère l'année de départ de la saison
function classSaison(anneeFin){
    saison.anneeFin = saison.anneeDebut+1;
}

module.exports = {classSaison, saison};