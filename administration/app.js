var express         = require('express'),
session         = require('express-session'),
cookieParser    = require('cookie-parser'),
bodyParser      = require('body-parser'), //pour récupérer les résultats des post
handlebars  	  = require('express-handlebars'), hbs,
http = require('http'),
socket = require('socket.io'),
async = require('async'),
path = require('path');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('port', 7800);
app.set('views', path.join(__dirname, 'views'));

// routes static, le routeur n'y aura pas accès
app.use(express.static(path.join(__dirname+ '/public')));

app.use(cookieParser());

app.use(session({
    secret: 'nC0@#1pM/-0qA1+é',
    name: 'GrandPrix',
    resave: true,
    saveUninitialized: true
}));

/* ces lignes permettent d'utiliser directement les variables de session dans handlebars
UTILISATION : {{session.MaVariable}}  */
app.use(function(request, response, next){
    response.locals.session = request.session;
    next();
});

/* express-handlebars - https://github.com/ericf/express-handlebars
*  Handlebars : moteur de template pour Express.
* il va gérer les vues
*/
hbs = handlebars.create({
    defaultLayout: 'main', // nom de la page par defaut ici main.handlebars (structure de base HTML)

    partialsDir: ['views/partials/'], // le vues partielles (le code HTML qui se répète dans toutes les pages)
    helpers: {
        // Toutes les opérations logiques!! (pas toutes testées)
        cond: function(a, op, b, options){
            switch (op) {
                case "==":
                return (a == b) ? options.fn(this) : options.inverse(this);
                break;
                case "===":

                return (a === b) ? options.fn(this) : options.inverse(this);
                break;
                case "!=":
                return (a != b) ? options.fn(this) : options.inverse(this);
                break;
                case "&&":
                return (a && b) ? options.fn(this) : options.inverse(this);
                break;
                case "||":
                return (a || b) ? options.fn(this) : options.inverse(this);
                break;
                case "<=":
                return (a <= b) ? options.fn(this) : options.inverse(this);
                break;
                case "<":
                return (a < b) ? options.fn(this) : options.inverse(this);
                break;
                case ">=":
                return (a >= b) ? options.fn(this) : options.inverse(this);
                break;
                case ">":
                return (a > b) ? options.fn(this) : options.inverse(this);
                break;
            }
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// chargement du routeur
require('./router/router')(app);


var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('Serveur Node.js en attente sur le port ' + app.get('port'));
});

var io = socket.listen(server);
// Etudier si il y a possibilité de mettre ça dans un fichier indépendant
io.sockets.on('connection', function(client){
    // Messages reçus

    // Ajout sponsor
    client.on('ajouter-sponsor', function(data){
        if(!data.sponom || !data.sposectactivite){
            client.emit('ajouter-sponsor', { success: false});
        }
        else{
            var sponsor = require('./models/sponsor.js');
            async.waterfall([
                function(callback){
                    sponsor.ajouterSponsor(data.sponom, data.sposectactivite, function (err, result) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        callback(null, result);
                    });
                },
                function(result, callback){
                    var lastId = result.insertId;
                    sponsor.ajouterFinance(lastId, data.ecunum, function(err, result){
                        if (err) {
                            console.log(err);
                            return;
                        }
                        result.lastId = lastId;
                        callback(null, result);
                    });
                }
            ],function(err, result){
                client.emit('ajouter-sponsor', {
                    success: true,
                    sponom: data.sponom,
                    sposectactivite: data.sposectactivite,
                    ecunom: data.ecunom,
                    ecunum: data.ecunum,
                    sponum: result.lastId
                });
            });
        }
    });

    // Suppression sponsor
    client.on('supprimer-sponsor', function(data){
        var sponsor = require('./models/sponsor.js');
        // Vérif sponsor
        sponsor.existsSponsor(data.num_sponsor, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            if(result.length != 0){
                // /!\ Ici series à cause des problèmes de foreign key
                async.series([
                    function(callback){
                        sponsor.supprimerFinance(data.num_sponsor, data.ecunum, function (err, result) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            callback(null, result);
                        });
                    },
                    function(callback){
                        sponsor.supprimerSponsor(data.num_sponsor, function (err, result) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            callback(null, result);
                        });
                    }
                ],function(err, result){
                    client.emit('supprimer-sponsor', {
                        sponum: data.num_sponsor
                    });
                });
            }
        });
    });
});
