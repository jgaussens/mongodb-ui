var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


function connect(){
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("restaurant_Inspections");
	  dbo.collection('restaurants').find({}).toArray(function(err, result) {
	    if (err) throw err;
	    console.log(result);
	    db.close();
	  });
	});
}