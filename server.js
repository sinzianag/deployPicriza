var http = require("http");
var url = require("url");
var formidable = require("formidable");

var port = 80;

function start(handle, route, database) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(handle, pathname, response, request, database);
    }

    http.createServer(onRequest).listen(port);
    database.init();

    console.log("Server started on port:" + port);
}

exports.start = start;

