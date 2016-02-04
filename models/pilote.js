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
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						var sql ="SELECT pilnom, pilprenom, phoadresse FROM pilote p INNER JOIN photo ph ON ph.pilnum = p.pilnum WHERE pilnom LIKE \'" + data + "%\'";
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
