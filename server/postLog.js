var http=require('http');
var bodyParser = require ("body-parser");
var ws = require("nodejs-websocket");
var Client = require('ssh2').Client;
var enableDestroy=require('server-destroy');
var jsonfile=require('jsonfile');
var datetime = require('node-datetime');
var exec = require('child_process').exec;
var format = require('date-format');
var fs = require('fs');
var file ='../logs/menuLog.json';
var dateFormat1 = require('dateformat');

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
                            conn2.setMaxListeners(0);
    						console.log("New connection");
                            var dict={
                                "01":"Ian",
                                "02":"Feb",
                                "03":"Mar",
                                "04":"Apr",
                                "05":"Mai",
                                "06":"Iun",
                                "07":"Iul",
                                "08":"Aug",
                                "09":"Sep",
                                "10":"Oct",
                                "11":"Noi",
                                "12":"Dec"
                            }
                            var dataSaving="";
                            var dateInMs = Date.now();
                            var dateFormat = new Date(dateInMs);
                            var year = format('yyyy',dateFormat);
                            var monthFormat = format('MM',dateFormat);
                            var month = dict[monthFormat];
                            var day = dateFormat.getUTCDate();

                            //se verifica daca exista directorul de log al proiectului
                            //iar daca acesta nu exista se creeaza
                            var verifyDirectory='find /var/www/html/logs -maxdepth 1 -name '+json.projectName;
                            exec(verifyDirectory,(error,stdout,stderr)=>{
                                if(stdout==""){
                                    var createDirectory='mkdir /var/www/html/logs/'+json.projectName;
                                    exec(createDirectory,(error,stdout,stderr)=>{
                                        if(error){
                                            console.error(error);
                                            //return;
                                        }
                                        //console.log('stdout:'+stdout);
                                    });
                                    //console.error(error);
                                    //console.log("good");
                                }
                                var projectLog = '/var/www/html/logs/'+json.projectName;
                                var verifyYear = 'find '+projectLog+' -maxdepth 1 -name '+year;
                                exec(verifyYear,(error,stdout,stderr)=>{
                                    if(stdout==""){
                                        var createYear = 'mkdir '+projectLog+'/'+year;
                                        exec(createYear,(error,stdout,stderr)=>{
                                            if(error){
                                                console.error(error);
                                                //return;
                                            }
                                            //console.log('stdout:'+stdout);
                                        });
                                        //console.error(error);
                                        //return;
                                    }
                                    var projectYear = projectLog+'/'+year;
                                    var verifyMonth = 'find '+projectYear+' -maxdepth 1 -name '+month;
                                    exec(verifyMonth,(error,stdout,stderr)=>{
                                        if(stdout==""){
                                            var createMonth = 'mkdir '+projectYear+'/'+month;
                                            exec(createMonth,(error,stdout,stderr)=>{
                                                if(error){
                                                    console.error(error);
                                                    //return;
                                                }
                                                //console.log('stdout:'+stdout);
                                            });
                                            //console.error(error);
                                            //return;
                                        }
                                    });
                                    //console.log('stdout: '+stdout);
                                });
                                //console.log('stdout:'+stdout);
                            });
                            //se citeste din menuLog.json si se verifica daca exista proiectul
                            jsonfile.readFile('../logs/menuLog.json',function(err,obj){
                                //console.dir(obj);
                            })
                            //salvare menuLog la initializarea conexiunii
                            fs.appendFile('menuLog.json','data for  appending','utf8',(err)=>{
                                if (err) throw err;
                                //console.log('Data was appended');
                            });

    						conn2.on("text", function (str) {
        						// console.log("Received "+str)
    						})
                            conn2.on("close",function(code,reason){
        						console.log("Connection closed");
                            });
						    enableDestroy(server);

    						conn2.on('request',function(request,response){
        						var meth = request.method;
        						//console.log(meth);
    						})

                        //la fiecare post se initializeaza un client nou
						var conn = new Client();
                        conn.setMaxListeners(0);
						conn.on('ready', function() {
  							console.log('Client :: ready');
                            var dataSaving="";
  							conn.shell(function(err, stream) {
    								if (err) throw err;

    								stream.on('close', function() {
      									console.log('Stream :: close');
								    }).on('data', function(data) {
        								incomingStream=String(data);

									    if(incomingStream.length>2){
        									console.log('\r'+incomingStream);
                                            dataSaving=dataSaving+incomingStream;
                                            dataSaving = dataSaving + '\n';

                                            conn2.on("close",function(code,reason){
                                                var dict={
                                                    "01":"Ian",
                                                    "02":"Feb",
                                                    "03":"Mar",
                                                    "04":"Apr",
                                                    "05":"Mai",
                                                    "06":"Iun",
                                                    "07":"Iul",
                                                    "08":"Aug",
                                                    "09":"Sep",
                                                    "10":"Oct",
                                                    "11":"Noi",
                                                    "12":"Dec"
                                                }
                                                var dateInMs = Date.now();
                                                var dateFormat = new Date(dateInMs);
                                                var year = format('yyyy',dateFormat);
                                                var monthFormat = format('MM',dateFormat);
                                                var month = dict[monthFormat];
                                                var day = dateFormat.getUTCDate();
                                                var now = new Date();
                                                var completeDay = dateFormat1(now,'dddd');
                                                var subDay = completeDay.substring(0,3);
                                                var hour = format('hh:mm:ss');
                                                var nameLog = day + '_'+hour;
                                                var filePath='../logs/'+json.projectName+'/'+year+'/'+month+'/';
                                                fileName=filePath+nameLog+'.json';
                                                obj = {data:dataSaving};
                                                fileName2=filePath+json.projectName+'/'+dateInMs+'.json';

                                                //save info about log in menuLog.json
                                                var file ='../logs/menuLog.json';

                                                var currentProject = json.projectName;
                                                var currentYear = year;
                                                var currentMonth = month;
                                                var currentAuthor = "andrei";
                                                var currentDay = day;
                                                var currentHour = hour;
                                                var currentBranch = json.nameBranch;

                                                fs.readFile(file, 'utf8', function (err, data) {
                                                  if (err) {
                                                    //console.log('Error: ' + err);
                                                    return;
                                                  }
                                                  data = JSON.parse(data);
                                                  var lengthProject=data.project.length;

                                                  function saveLog(author, day, hour, branch, nameDay) {
                                                    this.Author = author;
                                                    this.Day = day;
                                                    this.Hour = hour;
                                                    this.Branch = branch;
                                                    this.nameDay = nameDay;
                                                   }
                                                  function addProject(array){
                                                      this.nameProject = array;
                                                  }
                                                  function addYear(array){
                                                      this.nameYear = array;
                                                  }
                                                  function addMonth(array){
                                                      this.nameMonth = array;
                                                  }
                                                  var checkProject = false;
                                                  for(var i=0;i<lengthProject;i++){
                                                      if(data.project[i].nameProject == currentProject){
                                                          var lengthYear = data.project[i].year.length;
                                                          var verifyProject = data.project[i];
                                                          var checkYear = false;
                                                          for(var j=0;j<lengthYear;j++){
                                                              if(verifyProject.year[j].nameYear == currentYear){

                                                                  var lengthMonth = verifyProject.year[j].month.length;
                                                                  var verifyYear = verifyProject.year[j];
                                                                  var checkYear = true;
                                                                  var checkMonth = false;
                                                                  for(var k=0;k<lengthMonth;k++){
                                                                      if(verifyYear.month[k].nameMonth == currentMonth){

                                                                            var dateLogLength = verifyYear.month[k].save.length;
                                                                            //save json file if project,year and month already exists
                                                                            var objS = new saveLog(currentAuthor,currentDay,currentHour,currentBranch,subDay);
                                                                            //erase array "save" if was already created
                                                                            verifyYear.month[k].save.push(objS);
                                                                            var obj = JSON.stringify(data);
                                                                            fs.writeFile(file, obj, function (err) {
                                                                                    console.error(err)
                                                                            });
                                                                            checkMonth = true;
                                                                      }

                                                                  }
                                                                  if(checkMonth == false){
                                                                      /*
                                                                      inside the array month is created a new month object
                                                                      */
                                                                      var objM = new addMonth(currentMonth);
                                                                      var objS = new saveLog(currentAuthor,currentDay,currentHour,currentBranch,subDay);
                                                                      var lengthM = verifyYear.month.length;
                                                                      verifyYear.month.push(objM);
                                                                      verifyYear.month[lengthM]["save"]=[];
                                                                      verifyYear.month[lengthM].save.push(objS);
                                                                      var obj = JSON.stringify(data);
                                                                      fs.writeFile(file, obj, function (err) {
                                                                              console.error(err)
                                                                      });
                                                                  }
                                                              }
                                                          }
                                                          if(checkYear == false){
                                                              //console.log("trebuie creat un nou camp year");
                                                              var objY = new addYear(currentYear);
                                                              var objM = new addMonth(currentMonth);
                                                              var objS = new saveLog(currentAuthor,currentDay,currentHour, currentBranch,subDay);
                                                              var lengthY = verifyProject.year.length;
                                                              verifyProject.year.push(objY);
                                                              verifyProject.year[lengthY]["month"]=[];
                                                              verifyProject.year[lengthY].month.push(objM);
                                                              verifyProject.year[lengthY].month[0]["save"]=[];
                                                              verifyProject.year[lengthY].month[0].save.push(objS);
                                                              var obj = JSON.stringify(data);
                                                              fs.writeFile(file, obj, function (err) {
                                                                      console.error(err)
                                                              });
                                                          }

                                                      var checkProject = true;
                                                    }
                                                  }

                                                  if(checkProject == false){
                                                      //console.log("trebue creat un nou camp proiect");
                                                      var objP = new addProject(currentProject);
                                                      var objY = new addYear(currentYear);
                                                      var objM = new addMonth(currentMonth);
                                                      var objS = new saveLog(currentAuthor,currentDay,currentHour, currentBranch,subDay);
                                                      var lengthP = data.project.length;
                                                      data.project.push(objP);
                                                      data.project[lengthP]["year"] = [];
                                                      data.project[lengthP].year.push(objY);
                                                      data.project[lengthP].year[0]["month"]=[];
                                                      data.project[lengthP].year[0].month.push(objM);
                                                      data.project[lengthP].year[0].month[0]["save"]=[];
                                                      data.project[lengthP].year[0].month[0].save.push(objS);
                                                      var obj = JSON.stringify(data);
                                                      fs.writeFile(file, obj, function (err) {
                                                              console.error(err)
                                                      });
                                                  }
                                                });

                                                //websocket server is destroyed
                                                server.destroy();
                                            });

									    }
        							    conn2.sendText(incomingStream);
    								})


        							conn2.on("text", function (str) {
        								stream.write(str+'\n');   //scrie comenzile in stream
									    console.log('Comanda:'+str);
									    command=str.replace(/\n/g,"");

      								})
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
		}
        );

}

var s = http.createServer(handle_incoming_request);
s.listen(16000);
