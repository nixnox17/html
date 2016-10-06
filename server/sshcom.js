var Client = require('ssh2').Client;
var readline = require('readline');
var ws = require("nodejs-websocket")
var io = require('socket.io')
var shellParser = require('node-shell-parser');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var hostVar='';
var portVar='';
var userVar='';
var passVar='';

process.argv.forEach(function (val, index, array) {
  
  switch(index){
	 case 2:hostVar=val
		break; 
         case 3:portVar=val
                break;
         case 4:userVar=val
                break;
         case 5:passVar=val
                break;

}
});

var incomingStream=' ';
var string='';
var meth = '';
var test="gaita.studenti.speed.pub.ro"

var express = require('express');
var bodyParser = require('body-parser');
var app     = express();

/*
//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true })); 

//app.use(express.bodyParser());

app.post('/myaction', function(req, res) {
  res.send('You sent the name "' + req.body.user + '".');
});

app.listen(8001, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});




app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post("/", function (request, response) {
    if (request.method == 'POST') {
        var body = '';

        request.on('data', function (data) {
            body += data;
	    console.log(body);
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });
 
    }

    console.log(req.body.user.name);
    console.log(req.body);
});

function (request, response) {
    if (request.method == 'POST') {
        var body = '';

        request.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });
 
    }
}
*/
var server = ws.createServer(function (conn2) {
    console.log("New connection")
    conn2.on("text", function (str) {
        console.log("Received "+str)

    })
    conn2.on("close", function (code, reason) {
        console.log("Connection closed")
    })
    conn2.on('request',function(request,response){
	var meth = request.method;
	console.log(meth);

    })


var conn = new Client();
conn.on('ready', function() {
  console.log('Client :: ready');
  conn.shell(function(err, stream) {
    if (err) throw err;
    stream.on('close', function() {
      console.log('Stream :: close');

    }).on('data', function(data) {
        incomingStream=String(data);
	console.log('Output: '+incomingStream + '\r');
	conn2.sendText(incomingStream);

    }).stderr.on('data', function(data) {
      console.log('STDERR: ' + data);
    });


	conn2.on("text", function (str) {
    	stream.write(str+'\n');

      })

	conn2.on("text", function (incomingStream) {

        conn2.sendText(incomingStream)
    })

  });
}).connect({
  host:hostVar,
  port: parseInt(portVar),
  keepaliveInterval: 60000,
  username: userVar,
  password:passVar

});
}).listen(3000)
