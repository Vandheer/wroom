var db = require('../configDb');

// ////////////////////// N O M   U T I L I S A T E U R

module.exports.existeUser = function (login, callback) {
  db.getConnection(function(err, connexion){
    if(!err){
      var sql ="SELECT login FROM login WHERE login=\'"+login+"\'";
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

// ////////////////////// M O T   D E   P A S S E

module.exports.getUserPassword = function (login, callback) {
  db.getConnection(function(err, connexion){
    if(!err){
      var sql ="SELECT passwd FROM login WHERE login=\'" + login+"\'";
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};
