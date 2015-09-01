var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
    if(err) throw err;

    var cursor = db.collection('students').find();

  	cursor.each(function(err, doc) {
      if(err) throw err;

      if(doc == null) {
          return db.close();
      }

      // find the minimum score
      min = Number.MAX_VALUE;
      doc.scores.forEach(function(score) {
        if (score.score < min) {
          min = score.score
        }
      });

      var operator = { $pull: { scores: { type: 'homework', score: min } } };

      // remove the minimum score
      db.collection('students').update({ _id: doc._id }, operator, function(err, updated) {
          if(err) throw err;

          console.dir("Successfully updated " + updated + " document!");

          return db.close();
      });
  	});
});
