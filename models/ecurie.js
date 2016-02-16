var db = require('../configDb');

// ////////////////////// L I S T E   D E S   E C U R I E S

module.exports.getListeEcurie = function (callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT ecunum, payadrdrap, ecunom FROM ecurie e INNER JOIN pays p ";
			sql= sql + "ON p.paynum=e.paynum ORDER BY ecunom";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// ////////////////////// N O M   D ' U N E   E C U R I E

module.exports.getEcunomByEcunum = function (ecunum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT ecunom FROM ecurie WHERE ecunum = " + ecunum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};
