var model = require('../models/circuit.js');
var nationalite = require('../models/nationalite.js');
var async = require('async');
var formidable = require('formidable');
var fs   = require('fs-extra');
var path = require("path");

/*------------------------------ FONCTIONS -----------------------------------*/

// Liste des circuits
function getListeCircuit(callback){
  model.getListeCircuit( function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    callback(null,result);
  });
}

/*
function supprimerCircuit(cirnum, callback){
  model.supprimerCircuit(cirnum, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    callback(null, result);
  });
}
*/

// ////////////////////// L I S T E R     C I R C U I T S

module.exports.ListerCircuit = function(request, response){
  response.title = 'Liste des circuits';
  model.getListeCircuit( function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    response.listeCircuit = result;
    response.render('ListerCircuit', response);
  });
};

// ///////////////////////// A F F I C H A G E   P I L O T E S

module.exports.AfficherCircuits =  function(request, response){
  response.title = 'Liste des circuits';
  model.getListeCircuit( function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    response.listeCircuits = result;
    response.render('listerCircuit', response);
  });
};

// ///////////////////////// A F F I C H A G E   F O R M U L A I R E

module.exports.FormulaireCircuit =  function(request, response){
  response.title = 'Ajout d\'un circuit';
  nationalite.getListePays( function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    response.listePays = result;
    response.render('ajouterCircuit', response);
  });
};

// ///////////////////////// A J O U T   C I R C U I T

module.exports.AjoutCircuit =  function(request, response){
  response.title = 'Ajout d\'un circuit';

  model.ajoutCircuit(request.body['nom'], request.body['pays'], request.body['longueur'],
    request.body['spectateurs'], request.file.filename, request.body['description'], function (err, result) {
      if (err) {
          console.log(err);
          return;
      }
      response.redirect('/circuits');
  });
};

// ///////////////////////// D E T A I L S   D ' U N   P I L O T E

module.exports.SupprimerCircuit = function(request, response){
    response.title = 'Supression du circuit';
    var cirnum = request.params.cirnum;
    model.supprimerCircuit(cirnum, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.redirect('/circuits');
    });
};
