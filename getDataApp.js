var request = require('request'),
    mongodb = require('mongodb').MongoClient,
    objectID = require('mongodb').ObjectID,
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    express = require('express')

var app = express();

app.use(bodyParser);

//Gets politicians collection data and saves to knowYourVote DB.
function getPoliticianCollection() {
    request({
            url: "http://api.followthemoney.org/?y=2016,2015,2014&gro=c-t-id&APIKey=25da2333b329ad1b6450ad4cbe25ec52&mode=json"
        },
        function (error, res, body) {
            if (!error && res.statusCode == 200)
                var data = JSON.parse(body);
            var dbData = data.records
            console.log(dbData);
            var url = 'mongodb://localhost:27017/knowYourVote';
            mongodb.connect(url, function (err, db) {

                var collection = db.collection('politicians');
                collection.insert(dbData);
            })

        });
}

getPoliticianCollection()