var model = require('../models/sponsor.js');
var async = require('async');

module.exports.Test = function(request, response){
  response.title = 'Tableau dynamique de l\'espace';

  model.getListeSponsors( function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    response.listeSponsors = result;
    response.render('listerSponsor', response);
  });
};
