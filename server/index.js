let path = require('path');
let fs = require('fs');
let url = require("url");
let express = require('express');
let bodyParser = require("body-parser");
let app = express();

app.use(bodyParser.json());

let clientPath = path.join(__dirname, '../client');
let dataPath = path.join(__dirname, 'data.json');

app.use(express.static(clientPath));

app.get("/", function(req, res){
    res.sendFile(path.join(clientPath, 'index.html'));
}); 

app.get("/api/chirps", function(req, res){
    //res.send("you are in the request");
    res.sendFile(dataPath);
}); 

app.post("/api/chirps", function(req, res){
    
    fs.readFile(dataPath, 'utf8', function(err, data) {   
        let chirps = JSON.parse(data);
        let incomingChirp = req.body; 

        // req.on('end', function(){
            chirps.push(incomingChirp);
            
            let JSONChirps = JSON.stringify(chirps);

            //write the JSON object to the data.json file
            fs.writeFile(dataPath, JSONChirps, function(err) {
                res.writeHead(201);
                res.end();
            });
        });
    // });
}); 

app.get('/^(.+)$/:id', (req, res)=>{
    let pathname = url.parse(req.url, true).pathname;    
    let fileExtension = req.params.id;
    let contentType;
    
    switch (fileExtension) {
        case '.html':
            contentType = 'text/html';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        default:
            contentType = 'text/plain';
    }
    
    let readStream = fs.createReadStream(path.join(clientPath, pathname));
    
    readStream.on('error', function(err) {
        res.writeHead(404);
        res.end();
    });
    
    res.writeHead(200, {'Content-Type': contentType });
    readStream.pipe(res);
    
});

app.listen(3000);

    

/*
    fs.readFile(dataPath, 'utf8', function(err, data) {        
        let chirps = req.body;
        
        //now convet the chirp to a JSON object
        let JSONChirps = JSON.stringify(chirps);

        //add each stream of data to incoming chirp
        req.on('data', function(chunk){
            incomingChirp += chunk;
        });

        //when all the data is loaded into incoming chirp and assign this to new chirp and push it to the chirps object
        req.on('end', function(){
            //let newChirp = JSON.parse(incomingChirp);
            chirps.push(incomingChirp);

            //now convet the chirp to a JSON object
            let JSONChirps = JSON.stringify(chirps);
                
            //write the JSON object to the data.json file
            fs.writeFile(dataPath, JSONChirps, function(err) {
                res.writeHead(201);
                res.end();
            });
        });
                   
        //write the JSON object to the data.json file
        fs.writeFile(dataPath, JSONChirps, function(err) {
            res.writeHead(201);
            res.send();
        });
    });
*/



/*
app.get('/^(.+)$/:id', (req, res)=>{
let pathname = url.parse(req.url, true).pathname;    
let fileExtension = req.params.id;
let contentType;

switch (fileExtension) {
    case '.html':
        contentType = 'text/html';
        break;
    case '.js':
        contentType = 'text/javascript';
        break;
    case '.css':
        contentType = 'text/css';
        break;
    default:
        contentType = 'text/plain';
}

var readStream = fs.createReadStream(path.join(clientPath, pathname));

readStream.on('error', function(err) {
    res.writeHead(404);
    res.end();
});

res.writeHead(200, {'Content-Type': contentType });
readStream.pipe(res);

});
*/