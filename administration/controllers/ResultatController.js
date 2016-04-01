var model = require('../models/resultat.js');
var pilote = require('../models/pilote.js');
var ecurie = require('../models/ecurie.js');
var async = require('async');

/*------------------------------ FONCTIONS -----------------------------------*/

function ajouterResultat(gpnum, pilnum, tempscourse,callback){
	model.ajouterResultat(gpnum, pilnum, tempscourse, function (err, result) {
		if (err) {
			console.log(err);
			return;
		}
		callback(null);
	});
}

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

function getListePilotes(callback){
	pilote.getListePilotes(function (err, result) {
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

// //////////////////////////

module.exports.ListerGrandPrix = function(request, response){
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

module.exports.RedirectGrandPrix = function(request, response){
	response.title = 'Résultats des grands prix';
	var gpnum = request.body.grandprix;
	response.redirect('/listerResultat/'+gpnum);
};


// ////////////////////////// A F F I C H E R    R E S U L T A T S

module.exports.ListerResultat = function(request, response){
	response.title = 'Résultat des grands prix';
	var gpnum = request.params.gpnum;

	async.parallel([
		async.apply(getResultatsGrandPrix, gpnum),
		getPoints,
		getListePilotes
	],function(err, result){
		var listeTemps = result[0];
		var listePoints = result[1];
		var listePilotes = result[2];
		var lastPoints;
		for(var i=0;i<listeTemps.length;i++){
			listeTemps[i].place = i + 1;
			if(i<listePoints.length){
				listeTemps[i].points = listePoints[i].ptnbpointsplace;
			}else{
				listeTemps[i].points = 0;
			}

			// On supprimer les pilotes ayant déjà un temps de la liste des pilotes qui permet l'ajout
			for(var j=0;j<listePilotes.length;j++){
				if(listePilotes[j].pilnum == listeTemps[i].pilnum){
					listePilotes.splice(j,1);
				}
			}

			// Points du prochain pilote
			if(i+1<listePoints.length){
				lastPoints = listePoints[i+1].ptnbpointsplace;
			}else{
				lastPoints = 0;
			}
		}

		response.listeResultat = listeTemps;
		response.listePilotes = listePilotes;
		response.lastPlace = listeTemps.length + 1;
		response.lastPoints = lastPoints;
		response.gpnum = gpnum;
		response.render('modifierResultat', response);
	});
}

module.exports.AjouterResultat = function(request, response){
	response.title = 'Ajout en cours';
	var gpnum = request.params.gpnum;
	var pilnum = request.body.pilote;
	var tempscourse = request.body.heures + ':'+request.body.minutes+':'+request.body.secondes;
	var pts = request.body.lastPoints;
	async.waterfall([
		async.apply(ajouterResultat, gpnum, pilnum, tempscourse),
		function(callback){
			pilote.getEcuriePilote(pilnum, function(err, result){
				if (err) {
					console.log(err);
					return;
				}
				callback(null, result[0].ecunum);
			});
		},
		function(ecunum, callback){
			ecurie.changerPointsEcurie(ecunum, pts, function(err, result){
				if (err) {
					console.log(err);
					return;
				}
				callback(null, result);
			});
		}
	],function(err,result){
		response.redirect('/listerResultat/'+gpnum);
	});
}

module.exports.SupprimerResultat = function(request, response){
	response.title = 'Suppression en cours';
	var gpnum = request.params.gpnum;
	var pilnum = request.params.pilnum;
	var pts = request.params.points * -1;
	async.waterfall([
		function(callback){
			model.supprimerResultat(gpnum, pilnum, function(err, result){
				if (err) {
					console.log(err);
					return;
				}
				callback(null);
			});
		},
		function(callback){
			pilote.getEcuriePilote(pilnum, function(err, result){
				if (err) {
					console.log(err);
					return;
				}
				callback(null, result[0].ecunum);
			});
		},
		function(ecunum, callback){
			ecurie.changerPointsEcurie(ecunum, pts, function(err, result){
				if (err) {
					console.log(err);
					return;
				}
				callback(null, result);
			});
		}
	],function(err,result){
		response.redirect('/listerResultat/'+gpnum);
	});
}
