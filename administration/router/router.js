var HomeController = require('./../controllers/HomeController');
var ResultatController = require('./../controllers/ResultatController');
var EcurieController = require('./../controllers/EcurieController');
var PiloteController = require('./../controllers/PiloteController');
var CircuitController = require('./../controllers/CircuitController');
var SponsorController = require('./../controllers/SponsorController');
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime');

var pilotefile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/image/pilote');
    },
    filename: function (req, file, cb) {
        // Aucun fichier n'a le même nom
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
        });
    }
});

var circuitfile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/image/circuit');
    },
    filename: function (req, file, cb) {
        // Aucun fichier n'a le même nom
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
        });
    }
});

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
    app.post('/ajouterPilote', isAuthenticated, multer({storage: pilotefile}).single('image'), PiloteController.AjoutPilote);
    app.get('/pilotes/supprimer/:pilnum',isAuthenticated, PiloteController.SupprimerPilote);

    // Circuits
    app.get('/circuits', isAuthenticated, CircuitController.AfficherCircuits);
    app.get('/ajouterCircuit', isAuthenticated, CircuitController.FormulaireCircuit);
    app.post('/ajouterCircuit', isAuthenticated, multer({storage: circuitfile}).single('image'), CircuitController.AjoutCircuit);
    app.get('/circuits/supprimer/:cirnum',isAuthenticated, CircuitController.SupprimerCircuit);

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
