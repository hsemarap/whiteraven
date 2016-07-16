var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

//Base setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

//Routes
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.get("/todos", function(req, res){
    var response = [
        { name: "Item 1 from server", complete: false },
        { name: "Item 2 from server", complete: false },
        { name: "Completed Item from server", complete: true }
    ];
    res.status(200).json(response);
    res.end();
});

router.put("/todos/:todoId", function(req, res) {
    console.log(req.params.todoId + ": " + JSON.stringify(req.body, null, 4));
    res.send(200);
    res.end();
});


// Server
app.use(express.static(__dirname));
app.use('/api', router);

app.listen(port);
console.log("Raven is sent via " + port);

