var db = require('../configDb');

module.exports.getListeSponsors = function (callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql ="SELECT sponum, sponom, sposectactivite FROM sponsor";
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

module.exports.supprimerSponsor = function(sponum, callback){
  db.getConnection(function(err, connexion){
    if(!err){
      var sql = "DELETE FROM sponsor WHERE sponum="+sponum;
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
