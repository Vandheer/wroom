var model = require('../models/pilote.js');
var async = require('async');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Repertoire = 	function(request, response){
   response.title = 'Répertoire des pilotes';

   model.getLettresUtilises( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeLettres = result;


      response.render('repertoirePilotes', response);
	});
}

module.exports.ListePilotes = 	function(request, response){
	response.title = 'Liste des pilotes';

	var lettre = request.params.lettre;
	async.series([
		function(callback){
			model.getPiloteByLettre(lettre, function (err, result) {
		        if (err) {
		            // gestion de l'erreur
		            console.log(err);
		            return;
		        }
		        response.listePilotes = result;
			});
		},

		function(callback){
			model.getLettresUtilises( function (err, result) {
		        if (err) {
		            // gestion de l'erreur
		            console.log(err);
		            return;
		        }
		        response.listeLettres = result;
			});
		}
	], function (err, result){
		console.log('fin', resultat);
	});
	response.render('repertoirePilotes', response);
}