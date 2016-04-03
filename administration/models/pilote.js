var db = require('../configDb');


// ////////////////////// D E T A I L S   D ' U N   P I L O T E

module.exports.getDetailsPilote = function (pilnum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT pilnom, pilprenom, DATE_FORMAT(pildatenais,\'%d/%m/%Y\') AS pildatenais, pilpoids, piltaille, pilpoints, piltexte, paynum, ecunum FROM pilote p"
			+ " WHERE p.pilnum = " + pilnum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// ////////////////////// L I S T E   D E S   P I L O T E S

module.exports.getListePilotes = function (callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT pilnum, pilnom, pilprenom, DATE_FORMAT(pildatenais,\'%d/%m/%Y\') AS pildatenais FROM pilote ORDER BY pilnom ASC";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// ////////////////////// A J O U T   P I L O T E

module.exports.ajoutPilote = function (prenom, nom, datenais, nationalite, ecurie, points, poids, taille, description, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="INSERT INTO pilote(pilnom, pilprenom, pildatenais, pilpoints, pilpoids, piltaille, piltexte, paynum, ecunum) "
			+ "VALUES(\'"+nom+"\',\'"+prenom+"\',STR_TO_DATE(\'"+datenais+"\', '%d/%m/%Y'),"+points+","+poids+","+taille+",\'"+description+"\',"+nationalite+","+ecurie+")";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// ////////////////////// M O D I F I E R   P I L O T E

module.exports.modifierPilote = function (pilnum, prenom, nom, datenais, nationalite, ecurie, points, poids, taille, description, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="UPDATE pilote SET pilnom=\'"+nom+"\', pilprenom=\'"+prenom+"\', pildatenais=STR_TO_DATE(\'"+datenais+"\', '%d/%m/%Y'),"
			+"pilpoints="+points+", pilpoids="+poids+", piltaille="+taille+", piltexte=\'"+description+"\',"
			+"paynum="+nationalite+", ecunum="+ecurie+" WHERE pilnum="+pilnum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// ////////////////////// S U P R E S S I O N   P I L O T E

module.exports.supprimerPilote = function (pilnum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="DELETE FROM pilote WHERE pilnum="+pilnum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// ////////////////////// A J O U T   P H O T O

module.exports.ajoutPhoto = function (pilnum, phoadresse, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="INSERT INTO photo(phonum,pilnum,phosujet,phocommentaire,phoadresse) VALUES(1,"+pilnum+",'Photo identité','Photo officielle','"+phoadresse+"')";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// ////////////////////// S P O N S O R S   D ' U N   P I L O T E

module.exports.getSponsorsByPilnum = function (pilnum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT sponom, sposectactivite FROM sponsorise s INNER JOIN sponsor sp ON sp.sponum = s.sponum WHERE pilnum = " + pilnum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// ////////////////////// P H O T O  P R I N C I P A L E  D ' U N  P I L O T E

module.exports.getPhotoPrincipaleByPilote = function (pilnum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT phoadresse FROM photo WHERE pilnum = " + pilnum + " AND phonum = 1";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

module.exports.getEcuriePilote = function (pilnum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT ecunum FROM pilote WHERE pilnum = " + pilnum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

module.exports.supprimerPhoto = function (pilnum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="DELETE FROM photo WHERE pilnum="+pilnum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};
