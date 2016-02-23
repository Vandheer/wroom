var model = require('../models/resultat.js');
var async = require('async');

/*------------------------------ FONCTIONS -----------------------------------*/

// Liste des grands prix
function getListeGrandPrix(callback){
	model.getListeGrandPrix(function (err, result) {
		if (err) {
			console.log(err);
			return;
		}
		callback(null, result);
	});
}

// Résultats d'un grand prix
function getResultatsGrandPrix(gpnum, callback){
	model.getResultatsGrandPrix(gpnum, function (err, result) {
		if (err) {
			console.log(err);
			return;
		}
		callback(null, result);
	});
}

// Informations d'un grand prix
function getInfosGrandPrix(gpnum, callback){
	model.getInfosGrandPrix(gpnum, function (err, result) {
		if (err) {
			console.log(err);
			return;
		}
		callback(null, result);
	});
}

// Liste des points
function getPoints(callback){
	model.getPoints(function (err, result) {
		if (err) {
			console.log(err);
			return;
		}
		callback(null, result);
	});
}

// ////////////////////////// L I S T E R    R E S U L T A T S

module.exports.ListerResultat = function(request, response){
	response.title = 'Résultats des grands prix';
	model.getListeGrandPrix( function (err, result) {
		if (err) {
			console.log(err);
			return;
		}
		response.listeGrandPrix = result;
		response.render('listerResultat', response);
	});
};

// ////////////////////////// A F F I C H E R    R E S U L T A T S

module.exports.AfficherResultat = function(request, response){
	response.title = 'Résultat des grands prix';
	var gpnum = request.params.gpnum;
	async.parallel([
		getListeGrandPrix,
		async.apply(getResultatsGrandPrix, gpnum),
		async.apply(getInfosGrandPrix, gpnum),
		getPoints
	], function (err, result){
		if(err){
			console.log(err);
			return;
		}

		var listeTemps = result[1];
		var listePoints = result[3];

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
		response.infosGrandPrix = result[2][0];
		response.render('listerResultat', response);
	});
}
