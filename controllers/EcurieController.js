var ecurie = require('../models/ecurie.js');
var async = require('async');

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

// //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerEcurie = function(request, response){
  response.title = 'Liste des écuries';

  ecurie.getListeEcurie( function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    response.listeEcurie = result;
    response.render('listerEcurie', response);
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
    console.log(result);
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