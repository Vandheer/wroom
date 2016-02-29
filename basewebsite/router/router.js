var HomeController = require('./../controllers/HomeController');
var ResultatController = require('./../controllers/ResultatController');
var EcurieController = require('./../controllers/EcurieController');
var PiloteController = require('./../controllers/PiloteController');
var CircuitController = require('./../controllers/CircuitController');

// Routes
module.exports = function(app){

  // Main Routes
  app.get('/', HomeController.Index);

  // pilotes
  app.get('/repertoirePilote', PiloteController.Repertoire);
  app.get('/repertoirePilote/:lettre', PiloteController.ListePilotes);
  app.get('/detailsPilote/:pilnum', PiloteController.DetailsPilote);
  
  // circuits
  app.get('/circuits', CircuitController.ListerCircuit);
  app.get('/circuits/:cirnum', CircuitController.DetailsCircuit);

  // Ecuries
  app.get('/ecuries', EcurieController.ListerEcurie);
  app.get('/ecuries/:ecunum', EcurieController.DetailsEcurie);

  //Résultats
  app.get('/resultats', ResultatController.ListerResultat);
  app.get('/resultats/:gpnum', ResultatController.AfficherResultat);


  // tout le reste
  app.get('*', HomeController.Index);
  app.post('*', HomeController.Index);

};
