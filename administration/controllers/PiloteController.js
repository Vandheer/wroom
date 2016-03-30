var model = require('../models/pilote.js');
var ecurie = require('../models/ecurie.js');
var nationalite = require('../models/nationalite.js');
var async = require('async');
var fs   = require('fs-extra');
var path = require("path");

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

function supprimerPhoto(pilnum, callback){
  model.supprimerPhoto(pilnum, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    callback(null, result);
  });
}

function supprimerPilote(pilnum, callback){
  model.supprimerPilote(pilnum, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    callback(null, result);
  });
}

function getDetailsPilote(pilnum, callback){
  model.getDetailsPilote(pilnum, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    callback(null, result);
  });
}

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
    async.waterfall([
        function(callback) {
            model.ajoutPilote(request.body['prenom'], request.body['nom'],
                request.body['datenais'], request.body['nationalite'], request.body['ecurie'],
                request.body['points'], request.body['poids'], request.body['taille'],
                request.body['description'], function (err, result) {
                    callback(null, result);
            });
        },
        function(result, callback){
            model.ajoutPhoto(result.insertId, request.file.filename, function(err, result){
                callback(null, result);
            });
        }

    ], function (err, result){
        if(err){
            console.log(err);
            return;
        }
        response.redirect('/pilotes');
    });
};

// ///////////////////////// S U P R E S S I O N   P I L O T E

module.exports.SupprimerPilote = function(request, response){
    response.title = 'Supression du pilote';
    var pilnum = request.params.pilnum;

    async.parallel([
        async.apply(supprimerPhoto, pilnum),
        async.apply(supprimerPilote, pilnum)
    ], function (err, result){
        if(err){
            console.log(err);
            return;
        }
        response.redirect('/pilotes');
    });
};

// ///////////////////////// M O D I F I E R   P I L O T E

module.exports.ModifierPilote = function(request, response){
    response.title = 'Modification d\'un pilote';
    var pilnum = request.params.pilnum;

    async.parallel([
        async.apply(getDetailsPilote, pilnum),
        getListeEcurie,
        getListeNationalite
    ], function (err, result){
        if(err){
            console.log(err);
            return;
        }
        response.detailsPilote = result[0][0];
        response.listeEcurie = result[1];
        response.listeNationalite = result[2];
        
        response.render('modifierPilote', response);
    });
};

module.exports.Modifier = function(request, response){
    response.title = 'Modification en cours';
    var pilnum = request.params.pilnum;
    var prenom = request.body.prenom;
    var nom = request.body.nom;
    var datenais = request.body.datenais;
    var nationalite = request.body.nationalite;
    var ecurie = request.body.ecurie;
    var points = request.body.points;
    var poids = request.body.poids;
    var taille = request.body.taille;
    var description = request.body.description;
    model.modifierPilote(pilnum, prenom, nom, datenais, nationalite, ecurie, points, poids, taille, description, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
    });
    response.redirect('/pilotes');
};
