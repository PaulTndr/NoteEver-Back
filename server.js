var express = require('express');
var app = express();
var http = require('http');
//var cors = require('cors')
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 5000;

const MongoClient = require('mongodb').MongoClient

//CORS Middleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// custom routes
var NoteController = require('./controllers/NoteController');
// Set our routes
app.use('/notes', NoteController);

// Handle 404
app.use(function (req, res) {
    //res.send('404: Page not Found', 404);
    res.status(404).send({
        status: 404,
        message: '404 Not Found',
        type: 'client'
    });
});

// Handle 500
app.use(function (error, req, res, next) {
    res.status(500).send({
        status: 500,
        message: 'internal error',
        type: 'internal'
    });
});

//listen
const uri = "mongodb+srv://NoteEverAdmin:NoteEverAdmin@noteever-xxpjy.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true
});
client.connect(err => {
    if (err) return console.log(err)
    db = client.db('NoteEver')
    var httpServer = http.createServer(app);
    httpServer.listen(PORT, () => console.log(`API running on port ${PORT}`));
})