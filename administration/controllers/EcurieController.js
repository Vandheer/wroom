var ecurie = require('../models/ecurie.js');
var nationalite = require('../models/nationalite.js');
var async = require('async');

/*------------------------------ FONCTIONS -----------------------------------*/

function getListePays(callback){
    nationalite.getListePays( function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        callback(null, result);
    });
};


function getListeEcurie(callback){
  ecurie.getListeEcurie( function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    callback(null, result);
  });
};

// Details de l'écurie
function getDetailsEcurie(ecunum, callback){
  ecurie.getDetailsEcurie(ecunum, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    callback(null, result);
  });
}

// Pays de l'écurie
function getPaysByEcunum(ecunum, callback){
  ecurie.getPaysByEcunum(ecunum, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    callback(null, result);
  });
}

// Sponsors de l'écurie
function getSponsorsByEcunum(ecunum, callback){
  ecurie.getSponsorsByEcunum(ecunum, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    callback(null, result);
  });
}

// Pilotes de l'écurie
function getPilotesByEcunum(ecunum, callback){
  ecurie.getPilotesByEcunum(ecunum, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    callback(null, result);
  });
}

// Fournisseurs de l'écurie
function getFournisseurByEcunum(ecunum, callback){
  ecurie.getFournisseurByEcunum(ecunum, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    callback(null, result);
  });
}

// Voitures de l'écurie
function getVoituresByEcunum(ecunum, callback){
  ecurie.getVoituresByEcunum(ecunum, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    callback(null, result);
  });
}


// ///////////////////////// A F F I C H A G E   E C U R I E S

module.exports.AfficherEcuries =  function(request, response){
  response.title = 'Liste des écuries';
  ecurie.getListeEcurie( function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    response.listeEcuries = result;
    response.render('listerEcurie', response);
  });
};

// ///////////////////////// A F F I C H A G E   F O R M U L A I R E

module.exports.FormulaireEcurie =  function(request, response){
  response.title = 'Ajout d\'une écurie';
  nationalite.getListePays( function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    response.listePays = result;
    response.render('ajouterEcurie', response);
  });
};

// ///////////////////////// A J O U T   E C U R I E

module.exports.AjoutEcurie =  function(request, response){
  response.title = 'Ajout d\'une écurie';

  ecurie.ajoutEcurie(request.body['nom'], request.body['directeur'], request.body['adrsiege'],
    request.body['points'], request.body['pays'], request.file.filename, function (err, result) {
      if (err) {
          console.log(err);
          return;
      }
      response.redirect('/ecuries');
  });
};

// //////////////////////// D E T A I L S   D ' U N E   E C U R I E

module.exports.DetailsEcurie = function(request, response){
  response.title = 'Détails d\'une écurie';

  var ecunum = request.params.ecunum;

  async.parallel([
    async.apply(getDetailsEcurie,ecunum),
    async.apply(getPaysByEcunum, ecunum),
    async.apply(getSponsorsByEcunum, ecunum),
    async.apply(getPilotesByEcunum, ecunum),
    async.apply(getFournisseurByEcunum, ecunum),
    async.apply(getVoituresByEcunum, ecunum),
    getListeEcurie
  ], function (err, result){
    if(err){
      console.log(err);
      return;
    }
    response.detailsEcurie = result[0][0];
    response.pays = result[1][0];
    response.sponsors = result[2];
    response.pilotes = result[3];
    response.fournisseur = result[4][0];
    response.voitures = result[5];
    response.listeEcurie = result[6];
    response.render('listerEcurie', response);
  });
};


module.exports.SupprimerEcurie = function(request, response){
    response.title = 'Supression de l\'écurie';
    var ecunum = request.params.ecunum;
    ecurie.supprimerEcurie(ecunum, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.redirect('/ecuries');
    });
};

module.exports.ModifierEcurie = function(request, response){
    response.title = 'Modification d\'une ecurie';
    var ecunum = request.params.ecunum;

    async.parallel([
        async.apply(getDetailsEcurie, ecunum),
        getListePays
    ], function (err, result){
        if(err){
            console.log(err);
            return;
        }
        response.detailsEcurie = result[0][0];
        response.listePays = result[1];
        response.render('modifierEcurie', response);
    });
};

module.exports.Modifier = function(request, response){
    response.title = 'Modification en cours';
    var ecunum = request.params.ecunum;
    var nom = request.body.nom;
    var nomdir = request.body.directeur;
    var pays = request.body.pays;
    var adr = request.body.adrsiege;
    var pts = request.body.points;
    ecurie.modifierEcurie(ecunum, nom, nomdir, adr, pts, pays, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
    });
    response.redirect('/ecuries');
};
