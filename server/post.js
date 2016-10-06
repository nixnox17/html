var http=require('http');
var bodyParser = require ("body-parser");
var ws = require("nodejs-websocket");
var Client = require('ssh2').Client;
var enableDestroy=require('server-destroy');
var jsonfile=require('jsonfile');
var datetime = require('node-datetime');

var command='';
var pastTime=datetime.create();

function handle_incoming_request(req, res){
        console.log("Incoming request("+req.method+")"+req.url);
	var json_data="";

        req.on(
                "readable",
                function(){
			console.log("readable");
                        var d = req.read();
                        if(typeof(d)=='string'){
                                json_data +=d;

			}
                        else if(typeof d == 'object' && d instanceof Buffer)
                                json_data +=d.toString("utf8");

                }
        );

        req.on(
                "end",
                function(){
                        var out ='';
                        if(!json_data)
                            out= "I got no JSON";

                        else{
				var json;
                                try{
                                        json=JSON.parse(json_data);
                                }catch(e){}
				if(!json){
					out = "Invalid Json";
					console.log("Invalid Json");
					}
				else {
					out = "VALID JSON"+json_data;

					var server = ws.createServer(function (conn2) {
    						console.log("New connection")

    						conn2.on("text", function (str) {
        						// console.log("Received "+str)
    						})

    						conn2.on("close", function (code, reason) {
        						console.log("Connection closed");
							server.destroy();
    						})

						    enableDestroy(server);

    						conn2.on('request',function(request,response){
        						var meth = request.method;
        						//console.log(meth);
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
									    if(incomingStream.length>2){
        									console.log('\r'+incomingStream);
										    var obj={test:'merge'};
										    //var time=pastTime.now();
										    var currentDate=pastTime.format('m/d/Y H:M:S');
										    var filePath='../logs/';
										    var fileName=filePath+json.projectName+'_'+currentDate+'.json';
										    jsonfile.writeFile(fileName,obj,function(err){
											    console.error(err);
										    })
										    console.log(typeof currentDate);

										    //var corection=incomingStream.replace(/\n/g,"");
										    //if(corection==command){
										    //	console.log('repetare de comenziii \n');
										    //}
									    }
        							    conn2.sendText(incomingStream);
    								}).stderr.on('data', function(data) {
      									//console.log('STDERR: ' + data);
    								});


        							conn2.on("text", function (str) {
        								stream.write(str+'\n');   //scrie comenzile in stream
									console.log('Comanda:'+str);

									command=str.replace(/\n/g,"");
									//command=str.replace('\r','');
									//console.log(command);
      								})

        							//conn2.on("text", function (incomingStream) {
        							//	conn2.sendText(incomingStream)
    								//})

  							});
						}).connect({
  							host:json.ip,
  							port: json.port,
  							keepaliveInterval: 60000,
  							username:json.user,
  							password:json.password
						});
					}).listen(json.randPort)


					console.log(json.port);
				     }
                            }
			//res.end(out);
		}
        );

}

var s = http.createServer(handle_incoming_request);
s.listen(16000);
