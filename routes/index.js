var express = require('express'),
    mongodb = require('mongodb').MongoClient,
    objectID = require('mongodb').ObjectID,
    index = express.Router();

/* GET home page. */
var router = function () {
    index.route('/')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/knowYourVote';
            mongodb.connect(url, function (err, db) {

                var collection = db.collection('politicians');
                collection.find({}).toArray(
                    function (err, results) {
                        console.log(results)
                        res.render('index', {
                            results: results,
                        });
                    });
            })
        });
    return index;
}
module.exports = router;
