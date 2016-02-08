/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/
var db = require('../configDb');


module.exports.getListeGrandPrix =   function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						var sql ="SELECT gpnum, gpnom, payadrdrap FROM grandprix g INNER JOIN circuit c ON c.cirnum = g.cirnum"
            + " INNER JOIN pays p ON p.paynum = c.paynum";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getResultatsGrandPrix = function (gpnum, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						var sql ="SELECT tempscourse, pilnom, pilprenom FROM grandprix g INNER JOIN course c ON c.gpnum = g.gpnum"
            + " INNER JOIN pilote p ON p.pilnum = c.pilnum WHERE g.gpnum = "+gpnum + " ORDER BY tempscourse ASC";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getInfosGrandPrix = function (gpnum, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						var sql ="SELECT gpcommentaire, gpdate FROM grandprix WHERE gpnum = "+gpnum;
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
