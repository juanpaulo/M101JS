var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;

    var cursor = db.collection('data').find().sort({ 'State' : 1, 'Temperature' : -1 });

    var state = '';
    var operator = { '$set': { 'month_high': true } };

  	cursor.each(function(err, doc) {
      if(err) throw err;

      if(doc == null) {
          return db.close();
      }

  		if (doc.State !== state) {
  			state = doc.State;

        console.dir(doc)

        var query = { '_id': doc._id };

  			db.collection('data').update(query, operator, function(err, updated) {
  				if (err) throw err;

          console.dir("Successfully updated " + updated + " document!");

          return db.close();
  			});
  		}
  	});
});
