
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var database = require("./database");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/list"] = requestHandlers.list;
handle["/getImage"] = requestHandlers.getImage;

server.start(handle, router.route, database);