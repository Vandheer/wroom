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
                if (err) {
                    console.log(err);
                    return;
                }
                callback(null, result);
            });
        },
        function(result, callback){
            model.ajoutPhoto(result.insertId, request.file.filename, function(err, result){
                if (err) {
                    console.log(err);
                    return;
                }
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
