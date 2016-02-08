var model = require('../models/circuit.js');
var async = require('async');
// ////////////////////// L I S T E R     C I R C U I T S

module.exports.ListerCircuit = function(request, response){
   response.title = 'Liste des circuits';
   model.getListeCircuit( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
      response.listeCircuit = result;
      response.render('ListerCircuit', response);
	});
};

module.exports.DetailsCircuit = function(request, response){
   response.title = 'Detail du circuit';
   var cirnum = request.params.cirnum;
   async.parallel([
     function(callback){
        model.getListeCircuit( function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            callback(null,result);
        });
      },

    function(callback){
      model.getDetailsCircuit(cirnum, function(err, result){
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        callback(null,result);
      });
    }], function (err, result){
    		if(err){
          console.log(err);
          return;
        }
        response.listeCircuit = result[0];
        response.detailsCircuit = result[1];
        response.render('ListerCircuit', response);
    });
};
