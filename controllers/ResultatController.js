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
			model.getPoints(function (err, result) {
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

		var listeTemps = result[1];
		var listePoints = result[2];

		for(var i=0;i<listeTemps.length;i++){
				listeTemps[i].place = i + 1;
				if(i<10){
					listeTemps[i].points = listePoints[i].ptnbpointsplace;
			 	}else{
					listeTemps[i].points = 0;
				}
		}

    response.listeGrandPrix = result[0];
    response.listeResultat = listeTemps;
		response.infosGrandPrix = result[3];
    response.render('listerResultat', response);
	});
}
