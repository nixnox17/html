var http = require('http');

var server = http.createServer(function(request, response) {
  // magic happens here!
});

server.on('request', function(request, response) {
  var meth=request.method;
  console.log(meth);
  var body = [];
  request.on('data', function(chunk) {
  body.push(chunk);
  console.log(data);
  }).on('end', function() {
  body = Buffer.concat(body).toString();
  // at this point, `body` has the entire request body stored in it as a string
  });
});

server.listen(8002);
