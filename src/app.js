console.log("Lancement de l'application Top 14 Stats");

require('./config/.env');

//Déclaration du serveur local
const express = require('express'); //Déclaration du framework express
const app = express(); //Création de l'objet express
const port = 3331; //Choix du port

let http = require('http');
let fs = require('fs');
let path = require('path');
const { Server } = require("socket.io");
const { classSaison, saison } = require('./js/choixSaison');

// bodyparser permet d'interpreter les paramètres des requêtes POST et PUT
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); //indique que la blibliothèque EJS sera utilisée
app.set('views', './src/pages'); //indique le chemin d'accès des pages web 

//Indique le chemin pour les fichiers statiques
app.use(express.static(_dirnamePages + '/assets'));


//Routage vers page accueil
app.get('/', (request, response) => {
    response.render('accueil', {
        anneeDeb: saison.anneeDebut,
        anneeFin: saison.anneeFin
    });
})

//Routage POST page accueil
app.post('/', (request, response) => {
    classSaison(request.body);
    response.render('accueil', {
        anneeDeb: saison.anneeDebut,
        anneeFin: saison.anneeFin
    });
})

//Création du serveur HTTP
const server = http.createServer(app);

//Socket permet le lien entre le script js du browser client et le server 
const io = new Server(server);
io.on('connection', socket => {
    console.log(`connect ${socket.id}`);
    socket.emit('choixSaison', classSaison); //Génère l'évènement provoquant l'envoie des montants de devise actualisés après calcul

});

//Choix du port pour le serveur local
server.listen(port);