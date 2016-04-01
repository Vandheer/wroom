var db = require('../configDb');

// ////////////////////// L I S T E   D E S   G R A N D S   P R I X

module.exports.getListeGrandPrix =   function (callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT gpnum, gpnom, payadrdrap FROM grandprix g INNER JOIN circuit c ON c.cirnum = g.cirnum"
			+ " INNER JOIN pays p ON p.paynum = c.paynum";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// ////////////////////// R E S U L T A T   D ' U N  G R A N D   P R I X

module.exports.getResultatsGrandPrix = function (gpnum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT tempscourse, c.pilnum, pilnom, pilprenom FROM grandprix g INNER JOIN course c ON c.gpnum = g.gpnum"
			+ " INNER JOIN pilote p ON p.pilnum = c.pilnum WHERE g.gpnum = "+gpnum + " ORDER BY tempscourse ASC";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// ////////////////////// I N F O S   D ' U N  G R A N D   P R I X

module.exports.getInfosGrandPrix = function (gpnum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT gpcommentaire, DATE_FORMAT(gpdate,\'%d/%m/%Y\') AS gpdate, gpnom, g.cirnum, cirnom FROM grandprix g INNER JOIN circuit c ON c.cirnum=g.cirnum "
			+ "WHERE gpnum = "+gpnum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

// ////////////////////// P O I N T S

module.exports.getPoints = function (callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT ptnbpointsplace FROM points ORDER BY ptplace ASC";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

module.exports.ajouterResultat = function (gpnum, pilnum, tempscourse, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="INSERT INTO course(gpnum,pilnum,tempscourse) VALUES("+gpnum+","
		+pilnum+",'"+tempscourse+"')";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

module.exports.supprimerResultat = function (gpnum, pilnum, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="DELETE FROM course WHERE gpnum="+gpnum+" AND pilnum="+pilnum;
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};
