var jimp = require("jimp");
var fs = require("fs");

function processImage(path, database) {

    var uid = (new Date().getTime()).toString(36)
    var imageId = "pic" + uid;

    fs.rename(path, "/tmp/test.png", function (error) {
        if (error) {
            fs.unlink("/tmp/test.png");
            fs.rename(path, "/tmp/test.png");
        }
    });

    jimp.read("/tmp/test.png").then(function (img) {
        for ( var i = 1; i <= 10; i++) {
            var scalable = img.clone();
            var imagePath = imageId + "_0"+ i +".png";
            scalable.scale(i/10).quality(60).write("./images/" + imagePath);
            database.addRow({
                originalId: imageId,
                sizeHeight: scalable.bitmap.height,
                sizeWidth: scalable.bitmap.width,
                fileName: imagePath
            });
        }

        console.log(database.getData());
    }).catch(function (err) {console.error(err);});


}

function getOriginalURL(imageId) {
    return "/images?file=" + imageId + ".png"
}

exports.processImage = processImage;