var db = require('../configDb');

// ////////////////////// L E T T R E S   U T I L I S E E S

module.exports.getLettresUtilisees = function (callback) {
	// connection à la base
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT DISTINCT SUBSTRING(pilnom,1,1) AS lettre FROM pilote ORDER BY pilnom ASC";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// ////////////////////// P I L O T E S   P A R   L E T T R E

module.exports.getPiloteByLettre =   function (data, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			// Requête en mémoire à Jonathan
			//var sql ="SELECT p.pilnum, pilnom, pilprenom, phoadresse FROM pilote p INNER JOIN photo ph ON ph.pilnum = p.pilnum WHERE pilnom LIKE \'" + data + "%\' GROUP BY pilnum";
			var sql ="SELECT p.pilnum, pilnom, pilprenom, phoadresse FROM pilote p INNER JOIN photo ph ON ph.pilnum = p.pilnum WHERE pilnom LIKE \'" + data + "%\' AND phonum = 1";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// ////////////////////// D E T A I L S   D ' U N   P I L O T E

module.exports.getDetailsPilote = function (pilnum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT pilnom, pilprenom, DATE_FORMAT(pildatenais,\'%d/%m/%Y\') AS pildatenais, pilpoids, piltaille, piltexte, paynom FROM pilote p INNER JOIN pays pa ON pa.paynum = p.paynum"
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
			var sql ="SELECT pilnum, pilnom, pilprenom, DATE_FORMAT(pildatenais,\'%d/%m/%Y\') AS pildatenais FROM pilote";
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

// ////////////////////// A U T R E S   P H O T O S   D ' U N   P I L O T E

module.exports.getPhotosByPilote = function (pilnum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT phoadresse FROM photo WHERE pilnum = " + pilnum + " AND phonum != 1";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// ////////////////////// E C U R I E   D ' U N   P I L O T E
module.exports.getEcurieByPilote = function (pilnum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT ecunom FROM ecurie e INNER JOIN pilote p ON e.ecunum=p.ecunum WHERE pilnum =" + pilnum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};
