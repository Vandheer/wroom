/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/
var db = require('../configDb');


module.exports.getPiloteByLettre =   function (data, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // Requête en mémoire à Jonathan
						//var sql ="SELECT p.pilnum, pilnom, pilprenom, phoadresse FROM pilote p INNER JOIN photo ph ON ph.pilnum = p.pilnum WHERE pilnom LIKE \'" + data + "%\' GROUP BY pilnum";
						var sql ="SELECT p.pilnum, pilnom, pilprenom, phoadresse FROM pilote p INNER JOIN photo ph ON ph.pilnum = p.pilnum WHERE pilnom LIKE \'" + data + "%\' AND phonum = 1";
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getDetailsPilote = function (pilnum, callback) {
  db.getConnection(function(err, connexion){
    if(!err){
      // s'il n'y a pas d'erreur de connexion
      // execution de la requête SQL
      var sql ="SELECT p.pilnum, pilnom, pilprenom, pildatenais, pilpoids, piltaille, piltexte, paynom FROM pilote p INNER JOIN pays pa ON p.paynum = pa.paynum WHERE pilnum = " + pilnum;
      //console.log (sql);
      connexion.query(sql, callback);

      // la connexion retourne dans le pool
      connexion.release();
    }
  });
};

module.exports.getSponsorsByPilnum = function (pilnum, callback) {
  db.getConnection(function(err, connexion){
    if(!err){
      // s'il n'y a pas d'erreur de connexion
      // execution de la requête SQL
      var sql ="SELECT sponom, sposectactivite FROM sponsor s INNER JOIN sponsorise se ON s.sponum = se.sponum WHERE pilnum = " + pilnum;
      //console.log (sql);
      connexion.query(sql, callback);

      // la connexion retourne dans le pool
      connexion.release();
    }
  });
};

module.exports.getPhotosByPilnum = function (pilnum, callback) {
  db.getConnection(function(err, connexion){
    if(!err){
      // s'il n'y a pas d'erreur de connexion
      // execution de la requête SQL
      var sql ="SELECT phoadresse FROM photo WHERE pilnum = " + pilnum;
      //console.log (sql);
      connexion.query(sql, callback);

      // la connexion retourne dans le pool
      connexion.release();
    }
  });
};

module.exports.getLettresUtilises = function (callback) {
   // connection à la base
  db.getConnection(function(err, connexion){
    if(!err){
      // s'il n'y a pas d'erreur de connexion
      // execution de la requête SQL
      var sql ="SELECT DISTINCT SUBSTRING(pilnom,1,1) AS lettre FROM pilote ORDER BY pilnom ASC";
      //console.log (sql);
      connexion.query(sql, callback);

      // la connexion retourne dans le pool
      connexion.release();
    }
  });
};
