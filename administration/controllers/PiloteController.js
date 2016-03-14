var model = require('../models/pilote.js');
var ecurie = require('../models/ecurie.js');
var nationalite = require('../models/nationalite.js');
var async = require('async');

/*------------------------------ FONCTIONS -----------------------------------*/

function getListeEcurie(callback){
  ecurie.getListeEcurie( function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    callback(null, result);
  });
};

function getListeNationalite(callback){
  nationalite.getListeNationalite( function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    callback(null, result);
  });
};

// ///////////////////////// A F F I C H A G E   P I L O T E S

module.exports.AfficherPilotes = 	function(request, response){
  response.title = 'Liste des pilotes';
  model.getListePilotes( function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    response.listePilotes = result;
    response.render('listerPilote', response);
  });
};

// ///////////////////////// A F F I C H A G E   F O R M U L A I R E

module.exports.FormulairePilote =  function(request, response){
  response.title = 'Ajout d\'un pilote';
  async.parallel([
    getListeEcurie,
    getListeNationalite
  ], function (err, result){
    if(err){
      console.log(err);
      return;
    }
    response.listeEcurie = result[0];
    response.listeNationalite = result[1];
    response.render('ajouterPilote', response);
  });
};

// ///////////////////////// A J O U T   P I L O T E

module.exports.AjoutPilote =  function(request, response){
  response.title = 'Ajout d\'un pilote';

  var prenom = request.body.prenom;
  var nom = request.body.nom;
  var datenais = request.body.datenais;
  var nationalite = request.body.nationalite;
  var ecurie = request.body.ecurie;
  var points = request.body.points;
  var poids = request.body.poids;
  var taille = request.body.taille;
  var descr = request.body.descr;

  model.ajoutPilote(prenom, nom, datenais, nationalite, ecurie, points, poids, taille, descr, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    response.redirect('/pilotes');
  });
};

// ///////////////////////// D E T A I L S   D ' U N   P I L O T E

module.exports.SupprimerPilote = function(request, response){
  response.title = 'Supression du pilote';
  var pilnum = request.params.pilnum;
  model.supprimerPilote(pilnum, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    response.redirect('/pilotes');
  });
};
