var db = require('../configDb');


// ////////////////////// L I S T E   D E S   C I R C U I T S

module.exports.getListeCircuit = function (callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT cirnum, cirnom, payadrdrap FROM circuit c INNER JOIN pays p ON p.paynum = c.paynum";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};


// ////////////////////// D E T A I L   D ' U N   C I R C U I T

module.exports.getDetailsCircuit = function (cirnum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT cirnom, cirlongueur,cirnbspectateurs, cirtext, ciradresseimage, paynom  FROM circuit c "
			+ "INNER JOIN pays p ON p.paynum = c.paynum WHERE cirnum = " + cirnum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};
