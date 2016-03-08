var db = require('../configDb');

// ////////////////////// L I S T E   D E S   N A T I O N A L I T E S

module.exports.getListeNationalite = function (callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT paynum, paynat FROM pays";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};
