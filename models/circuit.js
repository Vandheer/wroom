var db = require('../configDb');

module.exports.getListeCircuit = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						var sql ="SELECT cirnum, cirnom, payadrdrap FROM circuit c INNER JOIN pays p ON p.paynum = c.paynum";
						//console.log (sql);
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getDetailsCircuit = function (cirnum, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						var sql ="SELECT cirnom, cirlongueur,cirnbspectateurs, cirtext, ciradresseimage, paynom  FROM circuit c "
            + "INNER JOIN pays p ON p.paynum = c.paynum WHERE cirnum = " + cirnum;
						//console.log (sql);
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
