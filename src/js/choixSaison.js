const EventEmitter = require('events');
let fs = require('fs');
const event = new EventEmitter;

let saison = {
    anneeDebut: 0,
    anneeFin: 0
};


//Fonction qui récupère l'année de départ de la saison
function classSaison(data){
    console.log(data)
    saison.anneeDebut = data.anneeDeb;
    saison.anneeFin = data.anneeDeb+1;
}

module.exports = {classSaison, saison};