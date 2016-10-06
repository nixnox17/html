var jsonfile = require("jsonfile");
var fs = require("fs");
var file ='../logs/menuLog.json';

var currentProject = "ANPR2";
var currentYear = "2015";
var currentMonth = "iunie";
var currentAuthor = "andrei";
var currentDay = "10";
var currentHour = "22:10:15"

fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }
  data = JSON.parse(data);
  /*console.log(data.project[0]);
  console.log(data.project.length);
  console.log(data.project[0].year[0].month[0].save[0].author);
  */
  var lengthProject=data.project.length;

  function saveLog(author, day, hour) {
    this.Author = author;
    this.Day = day;
    this.Hour = hour;
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
      if(data.project[i].name == currentProject){
          //console.log("proiectul selectat este: "+data.project[i].name);
          var lengthYear = data.project[i].year.length;
          var verifyProject = data.project[i];
          var checkYear = false;
          for(var j=0;j<lengthYear;j++){
              if(verifyProject.year[j].nameYear == currentYear){
                  console.log("anul selectat este: " + verifyProject.year[j].nameYear);
                  var lengthMonth = verifyProject.year[j].month.length;
                  var verifyYear = verifyProject.year[j];
                  var checkYear = true;
                  var checkMonth = false;
                  for(var k=0;k<lengthMonth;k++){
                      if(verifyYear.month[k].nameMonth == currentMonth){
                            console.log("luna selectata este: " + currentMonth);
                            var dateLogLength = verifyYear.month[k].save.length;
                            //save json file if project,year and month already exists
                            var objS = new saveLog(currentAuthor,currentDay,currentHour);
                            //var addMonth1 = new addMonth([]);
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
                      console.log("trebuie creat un nou camp month");
                      /*
                      inside the array month is created a new month object
                      */
                      var objM = new addMonth(currentMonth);
                      var objS = new saveLog(currentAuthor,currentDay,currentHour);
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
              console.log("trebuie creat un nou camp year");
              var objY = new addYear(currentYear);
              var objM = new addMonth(currentMonth);
              var objS = new saveLog(currentAuthor,currentDay,currentHour);
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
      console.log("trebue creat un nou camp proiect");
      var objP = new addProject(currentProject);
      var objY = new addYear(currentYear);
      var objM = new addMonth(currentMonth);
      var objS = new saveLog(currentAuthor,currentDay,currentHour);
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
  //console.dir(data);
  }
});

//jsonfile.readFile('../logs/menuLog.json',function(err,obj){
//    console.log(obj);
//})
