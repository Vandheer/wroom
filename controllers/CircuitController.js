var model = require('../models/circuit.js');
var async = require('async');

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

// Détails d'un circuit
function getDetailsCircuit(cirnum, callback){
  model.getDetailsCircuit(cirnum, function(err, result){
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

// ////////////////////// D E T A I L S   D ' U N   C I R C U I T

module.exports.DetailsCircuit = function(request, response){
  response.title = 'Detail du circuit';
  var cirnum = request.params.cirnum;
  async.parallel([
    getListeCircuit,
    async.apply(getDetailsCircuit, cirnum)
  ], function (err, result){
    if(err){
      console.log(err);
      return;
    }
    response.listeCircuit = result[0];
    response.detailsCircuit = result[1][0];
    response.render('ListerCircuit', response);
  });
};
