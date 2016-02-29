var model = require('../models/login.js');
var async = require('async');
var crypto = require('crypto');

// ////////////////////////////////////////////// A C C U E I L
module.exports.Index = function(request, response){
  response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";
  response.render('home', response);
};

// ////////////////////////////////////////////// L O G I N
module.exports.Login = function(request, response){
  response.title = "Identifiez-vous!!!";
  response.render('login', response);
};

// ////////////////////////////////////////////// V E R I F   L O G I N
module.exports.VerifLogin = function(request, response){
  response.title = "Identifiez-vous!!!";
  var login = request.body.login;
  var passwd = request.body.passwd;
  async.waterfall([
    function(callback){
      model.existeUser(login, function (err, result) {
        if (err) {
          console.log(err);
          return;
        }
        if(result[0] == undefined){
          callback(null, false);
        }else{
          callback(null, true);
        }
      });
    },
    function(existe, callback){
      if(existe){
        model.getUserPassword(login, function (err, result) {
          if (err) {
            console.log(err);
            return;
          }
          if(result[0].passwd == crypto.createHash('sha1').update(passwd, 'utf8').digest().toString('hex')){
            callback(null, true);
          }else{
            callback(null, false);
          }
        });
      }else{
        callback(null, false);
      }
    }
  ], function (err, result) {
    if(result){
      request.session.logged = true;
      response.render('home', response);
    }else{
      response.login = true;
      response.render('login', response);
    }
  });
};
