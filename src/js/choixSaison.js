const EventEmitter = require('events');
let fs = require('fs');
const event = new EventEmitter;

const http = require("https");

let saison = {
    anneeDebut: 2022,
    anneeFin: 2023
};

class Team {
    constructor(id, nom) {
        this.id = id;
        this.nom = nom;
    }
};

let listTeams = [
    { id: 7067, name: 'Parise' }
]



//Fonction qui récupère l'année de départ de la saison
function classSaison(data, response){
    saison.anneeDebut = data.anneeDeb;
    saison.anneeFin = Number(data.anneeDeb)+1;

    const options = {
        "method": "GET",
        "hostname": "rugby-live-data.p.rapidapi.com",
        "port": null,
        "path": "/teams/1230/"+saison.anneeFin,
        "headers": {
            "X-RapidAPI-Key": "937e22c249msha8bb96df5db449bp1542b3jsn3940f5b01b7d",
            "X-RapidAPI-Host": "rugby-live-data.p.rapidapi.com",
            "useQueryString": true
        }
    };

    const req = http.request(options, function (res) {
        const chunks = [];
    
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
    
        res.on("end", function () {
            const body = Buffer.concat(chunks);
            let listTeams =[];
            listTeams= JSON.parse(body).results;
            console.log(listTeams);
            response.render('accueil', {
                anneeDeb: saison.anneeDebut,
                anneeFin: saison.anneeFin,
                listTeams: listTeams
            });
        });
    });
    
    req.end();
}


module.exports = {classSaison, saison, listTeams};