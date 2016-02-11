var model = require('../models/resultat.js');

  // ////////////////////////////////////////////// A C C U E I L
module.exports.Index = function(request, response){
    response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";
    model.getDerniersResultats( function (err, result) {
      if (err) {
        // gestion de l'erreur
        console.log(err);
        return;
      }
      response.derniersResultats = result;
      response.render('home', response);
    });
};
