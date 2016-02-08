var model = require('../models/resultat.js');
var async = require('async');

  // //////////////////////////L I S T E R    R E S U L T A T S
module.exports.ListerResultat = function(request, response){
	response.title = 'Résultats des grands prix';
	model.getListeGrandPrix( function (err, result) {
		if (err) {
			// gestion de l'erreur
			console.log(err);
			return;
		}
		response.listeGrandPrix = result;
		response.render('listerResultat', response);
	});
};


module.exports.AfficherResultat = function(request, response){
	response.title = 'Résultat des grands prix';
	var gpnum = request.params.gpnum;
	async.parallel([
		function(callback){
			model.getListeGrandPrix(function (err, result) {
						if (err) {
								// gestion de l'erreur
								console.log(err);
								return;
						}
						callback(null, result);
			});
		},

		function(callback){
			model.getResultatsGrandPrix(gpnum, function (err, result) {
						if (err) {
								// gestion de l'erreur
								console.log(err);
								return;
						}
						callback(null, result);
			});
		},
		function(callback){
			model.getInfosGrandPrix(gpnum, function (err, result) {
						if (err) {
								// gestion de l'erreur
								console.log(err);
								return;
						}
						callback(null, result);
			});
		}
	], function (err, result){
		if(err){
      console.log(err);
      return;
    }
    response.listeGrandPrix = result[1];
    response.listeResultat = result[0];
		response.infosGrandPrix = result[2];
    response.render('listerResultat', response);
	});
}
