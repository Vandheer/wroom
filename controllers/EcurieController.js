var model = require('../models/ecurie.js');

// //////////////////////// L I S T E R  C I R C U I T S

module.exports.ListerEcurie = function(request, response){
  response.title = 'Liste des écuries';

  model.getListeEcurie( function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    response.listeEcurie = result;
    response.render('listerEcurie', response);
  });
};
