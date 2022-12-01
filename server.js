const http = require("http");
const path = require("path");
const fs = require("fs");
var MongoClient = require('mongodb-legacy').MongoClient;
var url = "mongodb+srv://thulasitheja:webdata2280@cluster0.qvyzxvc.mongodb.net/?retryWrites=true&w=majority";

const server = http.createServer((req, res) => {
    
    /*
        we can Navigate to different pages via different requests. 
        if / then goto index.html
        if /about about then goto about.html
        if /api then laod the JSON file  /  ;) this might be something you need for your exam. 
    */
    
    if (req.url === '/') {
        // read public.html file from public folder
        fs.readFile(path.join(__dirname, 'public', 'index.html'),
                    (err, content) => {
                                    
                                    if (err) throw err;
                                    res.writeHead(200, { 'Content-Type': 'text/html' });
                                    res.end(content);
                        }
              );
     }

    /*
    Load static files like css and images in to the application
    
     https://nodejsgarden.wordpress.com/2013/07/16/render-static-files-with-node-js/#more-24
     https://www.nodebeginner.org/index-kr.html#a-full-blown-web-application-with-nodejs
    */

    else if(req.url.match("\.css$")){
        var cssPath = path.join(__dirname, 'public', req.url);
        var fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, {"Content-Type": "text/css"});
        fileStream.pipe(res);

    }
    
    else if(req.url.match("\.jpg$")){
        var imagePath = path.join(__dirname, 'public', req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, {"Content-Type": "image/png"});
        fileStream.pipe(res);
    }

    else if(req.url.match("\.png$")){
        var imagePath = path.join(__dirname, 'public', req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, {"Content-Type": "image/png"});
        fileStream.pipe(res);
    }

    else if (req.url === '/about') {


        // read the about.html file public folder
        fs.readFile(
            path.join(__dirname, 'public', 'about.html'),
                    (err, content) => {
                                    
                                    if (err) throw err;
                                    res.writeHead(200, { 'Content-Type': 'text/html' });
                                    res.end(content);
                        }
              );
     }
    else if (req.url==='/api')
    {
        
        MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("AuthorsBooks_DB");
        dbo.collection("Authors_Books").find({}).toArray(function(err, result) {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
        db.close();
        });
        });
    }
    else{
        res.end("<h1> 404 nothing is here</h1>");
    }

    /*

        But what if we have  1000 pages/urls ? do we need to write 1000 if-else statements?

    /*/
});

const PORT= process.env.PORT || 2280;

server.listen(PORT,()=> console.log(`Great our server is running on port ${PORT} `));