var express = require('express');
var gm = require('gm');
var path = require('path');
var getHashCode = require('get-hash-code');
var router = express.Router();

var getRoute = function(name){
   var dir = '';
   var depth = 3;
   var hashCode = getHashCode(name);
   var mask = 255;
   var dirs = [];
   for (var i = 0; i < depth; i++) {
      dirs.push((hashCode >> 8*i) & mask);
   }
   for (var i = dirs.length; i > 0; i--) {
      dir += '/' + ('00' + Number(dirs[i - 1]).toString(16)).slice(-2);
   }
   return dir;
};

/* GET home page. */
router.get(/\/w([0-9]+)h([0-9]+)\/([\w\d-]+)\.(jpg|png|jpeg)/, function(req, res, next) {
   var width = req.params[0];
   var height = req.params[1];
   var name = req.params[2];
   var format = req.params[3];
   var fileName = name + '.' + format;

   var route = path.join('public', 'images');
   var hashedRoute = getRoute(name);
   var transformedHashedRoute = getRoute('w' + width + 'h' + height + '_' + name);

   console.log('ruta:' + route + '/' + fileName);
   console.log('ruta:' + hashedRoute + '/' + fileName);
   console.log('ruta:' + transformedHashedRoute + '/' + fileName);


   //TODO: traer archivos de S3 async
   var file =  gm(route + '/example.jpg');

   if(width > 0 && height > 0){
      file = file.resize(width, height, '^')
      .gravity('Center')
      .crop(width, height);
   }

   file.toBuffer(format.toUpperCase(),function (err, buffer) {
      if (err){
         res.set('Content-Type', 'application/json');
         res.send({'error': err});
         console.log(err);
      }else{
         res.set('Content-Type', 'image/' + (format === 'jpg' || format === 'jpeg')?'jpeg':'png');
         res.send(buffer);
      }
      console.log('done!');
   });

});

module.exports = router;
