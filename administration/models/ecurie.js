var db = require('../configDb');

// ////////////////////// L I S T E   D E S   E C U R I E S

module.exports.getListeEcurie = function (callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT ecunum, ecunom FROM ecurie";
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

// //////////////////////// D E T A I L S   D ' U N E   E C U R I E

module.exports.getDetailsEcurie = function (ecunum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT ecunom, ecunomdir, ecuadrsiege, ecuadresseimage FROM ecurie WHERE ecunum = " + ecunum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// //////////////////////// P A Y S   D ' U N E   E C U R I E

module.exports.getPaysByEcunum = function (ecunum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT paynom FROM pays p INNER JOIN ecurie e ON p.paynum=e.paynum WHERE ecunum = " + ecunum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// //////////////////////// S P O N S O R S   D ' U N E   E C U R I E

module.exports.getSponsorsByEcunum = function (ecunum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT sponom FROM sponsor s INNER JOIN finance f ON f.sponum=s.sponum WHERE ecunum = " + ecunum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// //////////////////////// P I L O T E S   D ' U N E   E C U R I E

module.exports.getPilotesByEcunum = function (ecunum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT p.pilnum, pilprenom, pilnom, phoadresse FROM pilote p INNER JOIN photo ph ON p.pilnum=ph.pilnum"
			+ " WHERE ecunum = " + ecunum + " AND phonum = 1";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// //////////////////////// F O U R N I S S E U R   D ' U N E   E C U R I E

module.exports.getFournisseurByEcunum = function (ecunum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT fpnom FROM fourn_pneu f INNER JOIN ecurie e ON f.fpnum=e.fpnum WHERE ecunum = " + ecunum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// //////////////////////// V O I T U R E S   D ' U N E   E C U R I E

module.exports.getVoituresByEcunum = function (ecunum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT voinom, voiadresseimage, typelibelle FROM voiture v INNER JOIN type_voiture t" 
			 + " ON t.typnum = v.typnum WHERE ecunum = " + ecunum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};