var model = require('../models/resultat.js');

// ////////////////////////////////////////////// A C C U E I L
module.exports.Index = function(request, response){
  response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";
  model.getDerniersResultats( function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    response.derniersResultats = result[0];
    response.render('home', response);
  });
};
