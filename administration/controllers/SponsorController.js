var model = require('../models/sponsor.js');
var ecurie = require('../models/ecurie.js');
var async = require('async');

module.exports.Test = function(request, response){
    response.title = 'Gestion des sponsors';

    async.series([
        function(callback){
            model.getListeSponsors( function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                callback(null, result);
            });
        },function(callback){
            ecurie.getListeEcurie(function(err,result){
                if(err){
                    console.log(err);
                    return;
                }
                callback(null, result);
            });
        }
    ],function(err,result){
        response.listeSponsors = result[0];
        response.listeEcuries = result[1];
        response.render('listerSponsor', response);
    });
};

module.exports.ModifierSponsor = function(request, response){
    response.title = 'Modification d\'un sponsor';
    var sponum = request.params.sponum;

    async.parallel([
        function(callback){
            model.getDetailsSponsors(sponum, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                callback(null, result);
            });
        },function(callback){
            ecurie.getListeEcurie(function(err,result){
                if(err){
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
        response.detailsSponsor = result[0][0];
        response.listeEcurie = result[1];
        response.ecunum = request.params.ecunum;
        response.render('modifierSponsor', response);
    });
};

module.exports.Modifier = function(request, response){
    response.title = 'Modification en cours';
    var sponum = request.params.sponum;
    var ecunum = request.params.ecunum;
    var sponom = request.body.nom;
    var secteur = request.body.secteur;
    var newEcunum = request.body.ecurie;

    async.parallel([
        function(callback){
            model.modifierSponsor(sponum, sponom, secteur, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                callback(null, result);
            });
        },
        function(callback){
            model.modifierFinance(sponum, ecunum, newEcunum, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                callback(null, result);
            });
        }
    ], function(e){
        response.redirect('/sponsors');
    });
};
