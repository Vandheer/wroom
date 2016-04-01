var db = require('../configDb');

module.exports.getListeSponsors = function (callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT s.sponum, sponom, sposectactivite, e.ecunum, ecunom FROM sponsor s INNER JOIN finance f ON f.sponum=s.sponum"
			+" INNER JOIN ecurie e ON f.ecunum=e.ecunum";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

module.exports.getDetailsSponsors = function (sponum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT s.sponum, sponom, sposectactivite FROM sponsor s "
			+"WHERE sponum="+sponum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

module.exports.ajouterSponsor = function(sponom, sposectactivite, callback){
	db.getConnection(function(err, connexion){
		if(!err){
			var sql = "INSERT INTO sponsor(sponom, sposectactivite) VALUES(\'"+sponom+"\',\'"
			+sposectactivite+"\')";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

module.exports.ajouterFinance = function(sponum, ecunum, callback){
	db.getConnection(function(err, connexion){
		if(!err){
			var sql = "INSERT INTO finance(sponum, ecunum) VALUES(\'"+sponum+"\',\'"
			+ecunum+"\')";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

module.exports.supprimerSponsor = function(sponum, callback){
	db.getConnection(function(err, connexion){
		if(!err){
			var sql = "DELETE FROM sponsor WHERE sponum="+sponum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

module.exports.supprimerFinance = function(sponum, ecunum, callback){
	db.getConnection(function(err, connexion){
		if(!err){
			var sql = "DELETE FROM finance WHERE sponum="+sponum+" AND ecunum="+ecunum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

module.exports.modifierSponsor = function(sponum, sponom, sposectactivite, callback){
	db.getConnection(function(err, connexion){
		if(!err){
			var sql = "UPDATE sponsor SET sponom='"+sponom+"',sposectactivite='"+sposectactivite+"' WHERE sponum="+sponum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

module.exports.modifierFinance = function(sponum, ecunum, newEcunum, callback){
	db.getConnection(function(err, connexion){
		if(!err){
			var sql = "UPDATE finance SET ecunum="+newEcunum
			+" WHERE sponum="+sponum+" AND ecunum="+ecunum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

module.exports.existsSponsor = function(sponum, callback){
	db.getConnection(function(err, connexion){
		if(!err){
			var sql = "SELECT sponum FROM sponsor WHERE sponum="+sponum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};
