var db = require('../configDb');

// ////////////////////// L I S T E   D E S   N A T I O N A L I T E S

module.exports.getListeNationalite = function (callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT paynum, paynat FROM pays ORDER BY paynat";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// ////////////////////// L I S T E   D E S   P A Y S

module.exports.getListePays = function (callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT paynum, paynom FROM pays ORDER BY paynom";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};
