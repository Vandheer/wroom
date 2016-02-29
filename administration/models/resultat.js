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
						var sql ="SELECT tempscourse, pilnom, pilprenom FROM grandprix g INNER JOIN course c ON c.gpnum = g.gpnum"
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

// ////////////////////// D E R N I E R S   R E S U L T A T S

module.exports.getDerniersResultats = function (callback) {
	db.getConnection(function(err, connexion){
        if(!err){
						var sql ="SELECT gpnum, gpnom, DATE_FORMAT(gpdate,'%d/%m/%Y') AS gpdate, DATE_FORMAT(gpdatemaj,'%d/%m/%Y') AS gpdatemaj "
						+  "FROM grandprix ORDER BY gpdatemaj DESC LIMIT 1";
            connexion.query(sql, callback);
            connexion.release();
         }
      });
};
