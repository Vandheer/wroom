var db = require('../configDb');


// ////////////////////// L I S T E   D E S   C I R C U I T S

module.exports.getListeCircuit = function (callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT cirnum, cirnom, cirlongueur, cirnbspectateurs FROM circuit";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// ////////////////////// D E T A I L S   D ' U N   C I R C U I T

module.exports.getDetailsCircuit = function (cirnum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT cirnom, cirlongueur, cirnbspectateurs, cirtext, ciradresseimage, paynom, c.paynum FROM circuit c "
			+ "INNER JOIN pays p ON p.paynum = c.paynum WHERE cirnum = " + cirnum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// ////////////////////// A J O U T   C I R C U I T

module.exports.ajoutCircuit = function (nom, pays, longueur, spectateurs, phoadresse, description, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			console.log(nom+ pays+ longueur+ spectateurs+ description+ phoadresse);
			var sql ="INSERT INTO circuit(cirnom, paynum, cirlongueur, cirnbspectateurs, ciradresseimage, cirtext) "
			+ "VALUES(\'"+nom+"\',"+pays+","+longueur+","+spectateurs+",\'"+phoadresse+"\',\'"+description+"\')";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// ////////////////////// M O D I F I E R   C I R C U I T

module.exports.modifierCircuit = function (cirnum, nom, longueur, pays, spectateurs, description, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="UPDATE circuit SET cirnom=\'"+nom+"\', cirlongueur="+longueur+", cirnbspectateurs="+spectateurs
			+ ", cirtext=\'"+description+"\', paynum="+pays+" WHERE cirnum="+cirnum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// ////////////////////// S U P R E S S I O N   C I R C U I T

module.exports.supprimerCircuit = function (cirnum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			console.log(cirnum);
			var sql ="DELETE FROM circuit WHERE cirnum="+cirnum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};
