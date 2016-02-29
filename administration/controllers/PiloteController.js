var pilote = require('../models/pilote.js');
var ecurie = require('../models/ecurie.js');
var async = require('async');

/*------------------------------ FONCTIONS -----------------------------------*/

// ///////////////////////// A F F I C H A G E

module.exports.AfficherPilotes = 	function(request, response){
  response.title = 'Gestion des pilotes';

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
