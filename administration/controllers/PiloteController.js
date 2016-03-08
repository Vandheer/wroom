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

// ///////////////////////// A F F I C H A G E

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

// ///////////////////////// A F F I C H A G E

module.exports.AjouterPilote =  function(request, response){
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

// ///////////////////////// D E T A I L S   D ' U N   P I L O T E

module.exports.DetailsPilote = function(request, response){
  response.title = 'Détails du pilote';

  var lettre = request.params.lettre;
  var pilnum = request.params.pilnum;
  async.parallel([
    getLettresUtilisees,
    async.apply(getDetailsPilote,pilnum),
    async.apply(getSponsorsByPilnum, pilnum),
    async.apply(getPhotoPrincipaleByPilote, pilnum),
    async.apply(getPhotosByPilote, pilnum),
    async.apply(getEcurieByPilote, pilnum)
  ], function (err, result){
    if(err){
      console.log(err);
      return;
    }
    response.listeLettres = result[0];
    response.detailsPilote = result[1][0];
    response.listeSponsors = result[2];
    response.photoPrincipale = result[3][0];
    response.photos = result[4];
    response.ecurie = result[5][0];
    response.render('detailsPilote', response);
  });
};

