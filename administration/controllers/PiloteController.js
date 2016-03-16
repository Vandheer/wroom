var model = require('../models/pilote.js');
var ecurie = require('../models/ecurie.js');
var nationalite = require('../models/nationalite.js');
var async = require('async');
var formidable = require('formidable');
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

  var prenom;
  var nom;
  var datenais;
  var nationalite;
  var ecurie;
  var points;
  var poids;
  var taille;
  var descr;
  var phoadresse;
  var form = new formidable.IncomingForm();

     form.parse(request, function(err, fields, files) {
        prenom = fields.prenom;
        console.log(prenom);
        console.log({fields: fields, files: files});
      });
  form.on('fileBegin', function(name, file) {
    phoadresse = file.name;
    file.path = './public/temp/' + file.name;
  });

  async.series([
    function(callback) {
      console.log("zezarazefs");
      model.ajoutPilote(prenom, nom, datenais, nationalite, ecurie, points, poids, taille, descr, function (err, result) {
        if (err) {
          console.log(err);
          return;
        }
        console.log('azsedrft'+result);
        callback(null, result);
      });
    },
    function(callback) {
      model.ajoutPhoto(pilnum, phoadresse, function (err, result) {
        if (err) {
          console.log(err);
          return;
        }
        callback(null, result);
    });
  }
  ]);


  form.on('end', function (fields, files) {
      var temp_path = this.openedFiles[0].path;
      var file_name = this.openedFiles[0].name;
      var new_location = './public/image/pilote/';
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
