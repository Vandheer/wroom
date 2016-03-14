var HomeController = require('./../controllers/HomeController');
var ResultatController = require('./../controllers/ResultatController');
var EcurieController = require('./../controllers/EcurieController');
var PiloteController = require('./../controllers/PiloteController');
var CircuitController = require('./../controllers/CircuitController');
var SponsorController = require('./../controllers/SponsorController');

// Routes
module.exports = function(app){

  // Main Routes
  app.get('/', isAuthenticated, HomeController.Index);

  // Login
  app.get('/login', HomeController.Login);
  app.post('/login', HomeController.VerifLogin);
  app.get('/home', HomeController.Index);

  // Pilotes
  app.get('/pilotes', isAuthenticated, PiloteController.AfficherPilotes);
  app.get('/ajouterPilote', isAuthenticated, PiloteController.FormulairePilote);
  app.post('/ajouterPilote', isAuthenticated, PiloteController.AjoutPilote);

  app.get('/pilotes/supprimer/:pilnum',isAuthenticated, PiloteController.SupprimerPilote);
  
  app.get('/sponsors', isAuthenticated, SponsorController.Test);

  // tout le reste
  app.get('*', isAuthenticated, HomeController.Index);
  app.post('*', isAuthenticated, HomeController.Index);

};

// Vérifie si un utilisateur est identifié
function isAuthenticated(request, result, next) {
  if (request.session.logged){
    return next();
  }
  result.redirect('/login');
}
