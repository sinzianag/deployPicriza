var exec = require("child_process").exec,
    querystring = require("querystring"),
    fs = require("fs"),
    loki = require("lokijs"),
    formidable = require("formidable"),
    url = require("url");

var imgProcessing = require("./imageProcessing");

function start(response) {
    console.log("Request handler start has been called");

    var body = '<html>'+
         '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(body);
        response.end();
}

function upload(response, request, database) {
    console.log("Request handler upload has been called");

    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        console.log("parsing done");
        imgProcessing.processImage(files.upload.path, database);

    });

    response.writeHead(200, {"Content-Type":"text/html"});
    response.write("<h1>Image Received<h1/>");
  //  response.write("<img src='/show' />");
    response.end();
}

function show(response) {
    console.log("Request handler for show has been called");
    response.writeHead(200, {"Content-Type": "image/png"});
    fs.createReadStream("/tmp/test.png").pipe(response);
}

function list(response, request, database) {
    console.log("Request handler for show has been called");
    response.writeHead(200, {"Content-Type": "text/json"});
    var db = new loki('loki.json');
    var files = db.getCollection('files');
   response.write(database.getData());
    response.end();
}

function getImage(response, request, database) {
    console.log("Getting Image");
    var queryData = url.parse(request.url, true).query;
    fs.createReadStream('images/' + queryData['file']).pipe(response);
}


exports.start = start;
exports.upload = upload;
exports.show = show;
exports.list = list;
exports.getImage = getImage;