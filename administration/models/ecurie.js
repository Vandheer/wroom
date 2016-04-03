var db = require('../configDb');

// ////////////////////// L I S T E   D E S   E C U R I E S

module.exports.getListeEcurie = function (callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT ecunum, ecunom, ecunomdir, ecupoints FROM ecurie ORDER BY ecunom ASC";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// //////////////////////// D E T A I L S   D ' U N E   E C U R I E

module.exports.getDetailsEcurie = function (ecunum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT ecunom, ecunomdir, ecuadrsiege, ecuadresseimage, ecupoints, paynum FROM ecurie WHERE ecunum = " + ecunum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// ////////////////////// A J O U T   E C U R I E

module.exports.ajoutEcurie = function (nom, directeur, adrsiege, points, pays, phoadresse, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="INSERT INTO ecurie(fpnum, ecunom, ecunomdir, ecuadrsiege, ecupoints, paynum, ecuadresseimage) "
			+ "VALUES(1,\'"+nom+"\',\'"+directeur+"\',\'"+adrsiege+"\',"+points+","+pays+",\'"+phoadresse+"\')";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

module.exports.supprimerEcurie = function (ecunum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="DELETE FROM ecurie WHERE ecunum="+ecunum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

module.exports.modifierEcurie = function (ecunum, ecunom, ecunomdir, ecuadrsiege, ecupoints, paynum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="UPDATE ecurie SET ecunom='"+ecunom+"', ecunomdir='"+ecunomdir+"', ecuadrsiege='"
			+ecuadrsiege+"', ecupoints='"+ecupoints+"', paynum='"+paynum+"' WHERE ecunum = " + ecunum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

module.exports.changerPointsEcurie = function (ecunum , points, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="UPDATE ecurie SET ecupoints=ecupoints+"+points+" WHERE ecunum="+ecunum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};
