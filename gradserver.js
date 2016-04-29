var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var r = [];
var x = [];
var url = 'mongodb://localhost:27017/reddit';
app.use(bodyParser.json());
app.use(express.static('.'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/" + "index.html");
});

app.get('/posts', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        redditPost(db, function() {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.json(r);
            r = [];
        });
    });
});


var redditPost = function(db, callback) {
    var cursor = db.collection('posts').find();
    cursor.each(function(err, doc) {
        if (doc != null) {
            r.push(doc);
        } else {
            callback();
        }
    });
};
app.post('/posts', function(req, res) {
    var t = req.body._id;
    var l = req.body.name;
    var c = req.body.password;
    var n = req.body.notLikes;
    var userParam = req.params.userId;
	var likesset = req.body.likes;
	//console.log("likes"+likeArray);
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
        updateUsers(db, function() {
		
  });
});
   var updateUsers = function(db, callback) {
	   console.log(likesset);
   db.collection('users').replaceOne(
	   {_id:t},
	   {"name":l,"password": c,"likes": likesset,"notLikes": n}, function(err, results) {
	 //console.log(results);
      callback();
   });
};
});



app.post('/ifusers', function(req, res) {
	var username = req.body.name;
	var pwd = req.body.pwd;
	console.log(username);
	
	MongoClient.connect(url, function(err, db) {
        redditUsers(db, function() {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.json(x);
			x = [];
        });
    });
var redditUsers = function(db, callback) {
    var cursor = db.collection('users').find({ "name": username});
	cursor.each(function(err, doc) {
        if (doc != null) {
			x.push(doc);
        } else {
            callback();
        }
    });
};
});

app.post('/users', function(req, res) {
    var t = req.body._id;
    var l = req.body.name;
    var c = req.body.password;
    var n = req.body.notLikes;
    var userParam = req.params.userId;
	var likesset = req.body.likes;
	//console.log("likes"+likeArray);
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
        updateUsers(db, function() {
		
  });
});
   var updateUsers = function(db, callback) {
	   console.log(likesset);
   db.collection('users').replaceOne(
	   {_id:t},
	   {"name":l,"password": c,"likes": likesset,"notLikes": n}, function(err, results) {
	 //console.log(results);
      callback();
   });
};
});

app.put('/posts/:imgId', function(req, res) {

    var likes = req.params.imgId;
    //console.log(req.body.likes);
    console.log("postId " + likes);

});


app.listen(3000, function() {
    console.log("listening on port 3000");
});