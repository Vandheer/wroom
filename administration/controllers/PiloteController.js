var pilote = require('../models/pilote.js');
var ecurie = require('../models/ecurie.js');
var async = require('async');

/*------------------------------ FONCTIONS -----------------------------------*/

// Liste des lettres
function getLettresUtilisees(callback){
  pilote.getLettresUtilisees( function (err, result) {
    if (err) {
      // gestion de l'erreur
      console.log(err);
      return;
    }
    callback(null, result);
  });
}

// Liste des pilotes
function getPiloteByLettre(lettre, callback){
  pilote.getPiloteByLettre(lettre, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    callback(null, result);
  });
}

// Details du pilote
function getDetailsPilote(pilnum, callback){
  pilote.getDetailsPilote(pilnum, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    callback(null, result);
  });
}

// Sponsors du pilote
function getSponsorsByPilnum(pilnum, callback){
  pilote.getSponsorsByPilnum(pilnum, function(err, result){
    if(err){
      console.log(err);
      return;
    }
    callback(null, result);
  });
}

// Photo principale du pilote
function getPhotoPrincipaleByPilote(pilnum, callback){
  pilote.getPhotoPrincipaleByPilote(pilnum, function(err, result){
    if(err){
      console.log(err);
      return;
    }
    callback(null, result);
  });
}

// Photos du pilote
function getPhotosByPilote(pilnum, callback){
  pilote.getPhotosByPilote(pilnum, function(err, result){
    if(err){
      console.log(err);
      return;
    }
    callback(null, result);
  });
}

// Ecurie du pilote
function getEcurieByPilote(pilnum, callback){
  pilote.getEcurieByPilote(pilnum, function(err, result){
    if(err){
      console.log(err);
      return;
    }
    callback(null, result);
  });
}

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Repertoire = 	function(request, response){
  response.title = 'Répertoire des pilotes';

  pilote.getLettresUtilisees( function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    response.listeLettres = result;
    response.render('repertoirePilotes', response);
  });
}

// ///////////////////////// L I S T E   D E S    P I L O T E S

module.exports.ListePilotes = 	function(request, response){
  response.title = 'Liste des pilotes';

  var lettre = request.params.lettre;
  async.parallel([
    getLettresUtilisees,
    async.apply(getPiloteByLettre,lettre)
  ], function (err, result){
    if(err){
      console.log(err);
      return;
    }
    response.listeLettres = result[0];
    response.listePilotes = result[1];
    response.render('repertoirePilotes', response);
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
