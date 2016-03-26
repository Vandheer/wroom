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

  var nom;
  var pays;
  var longueur;
  var spectateurs;
  var descr;
  var phoadresse;
  var form = new formidable.IncomingForm();

  form.parse(request, function(err, fields, files) {
    nom = fields.nom;
    console.log(nom);
    console.log({fields: fields, files: files});
  });
  form.on('fileBegin', function(name, file) {
    phoadresse = file.name;
    file.path = './public/temp/' + file.name;
  });

  console.log("zezarazefs");
  model.ajoutCircuit(nom, pays, longueur, spectateurs, descr, phoadresse, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('azsedrft'+result);
    callback(null, result);
  });

  form.on('end', function (fields, files) {
      var temp_path = this.openedFiles[0].path;
      var file_name = this.openedFiles[0].name;
      var new_location = './public/image/circuit/';
      fs.copy(temp_path, new_location + file_name, function (err) {
          if (err) {
              console.error(err);
          } else {
              console.log("success!");
              // Delete the "temp" file
              fs.unlink(temp_path, function(err) {
              if (err) {
                  console.error(err);
                  console.log("TROUBLE deletion temp !");
                  } else {
                  console.log("success deletion temp !");
                  }
              });
          }
      });
  });

  response.redirect('/circuits');
};
