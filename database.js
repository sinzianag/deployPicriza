var loki = require("lokijs");

var db = new loki('loki.json');
var files;

function init() {

    files = db.getCollection('files');

    if (files == null) {
        files = db.addCollection('files');
    }
}

function addRow(row) {
    files.insert(row);
}

function getData() {
    return db.serialize();
}

exports.init =  init;
exports.addRow = addRow;
exports.getData = getData;