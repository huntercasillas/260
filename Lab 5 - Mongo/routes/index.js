var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB', { useNewUrlParser: true }); //Connects to a mongo database called "commentDB"

var commentSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Comment: String
});

var Comment = mongoose.model('Comment', commentSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});

router.post('/comment', function(req, res, next) {
    console.log("Post Route");
    console.log(req.body);

    var newcomment = new Comment(req.body);
    console.log(newcomment);
    newcomment.save(function(err, post) {
        if (err) return console.error(err);
        else {
            console.log(post);
            res.sendStatus(200);
        }
    });
});

/* GET comments from database */
router.get('/comment', function(req, res, next) {
    console.log("In the GET route");
    console.log(req.query);
    var requestName = req.query["q"];
    console.log(requestName);
    var obj = {};
    
    if (requestName) {
        obj = {Name:requestName};
    }
    Comment.find(obj,function(error, commentList) {
        if (error) {console.log("GOT ERROR");}
        console.log(commentList);
        res.json(commentList);
})
});

router.delete('/deleteComment',function(req, res, next) {
    console.log("in delete rout");
    Comment.deleteMany({}, function(error, response) {
        if (error) return console.error(error);
        else {
            console.log("clear succeeded");
            // res.sendStatus(200);
        }
    })
})

module.exports = router;