//module we want to use to read
const fs = require('fs'); //to read files
const obstruct = require('./obstruct.js') //to obstruct strings using MD5

const phoneRE = /\d+/;
const addressRE = /\D+/g;

//get object from readJSON and then replace keyStrings!
function driver() {
  //going to create all the data objects
  let data01 = readJSON("./data01.json"); //object received from JSON
  let data01INT = readJSON("./data01.INT.json");
  let data50 = readJSON("./data50.json");
  let data50INT = readJSON("./data50.INT.json");
  let data100 = readJSON("./data100.json");
  let data100INT = readJSON("./data100.INT.json");
  let data500 = readJSON("./data500.json");
  let data500INT = readJSON("./data500.INT.json");

  //time to obstruct
  let obstruct = "obstruct"; //used for file name
  writeJSON(obstruct+"data01.json", data01);
  writeJSON(obstruct+"data01INT.json", data01INT);
  writeJSON(obstruct+"data50.json", data50);
  writeJSON(obstruct+"data50INT.json", data50INT);
  //writeJSON(obstruct+"data100.json", data100);
  //writeJSON(obstruct+"data100INT.json", data100INT);
  //writeJSON(obstruct+"data500.json", data500);
  //writeJSON(obstruct+"data500INT.json", data500INT);

}


//write to JSON file
function writeJSON(file, data) {
  data = removeSensitive(data);
  data = JSON.stringify(data, null, 2); //null, 2 is to make it readable
  fs.writeFileSync(file, data);
  return 0;
}

//remove sensitive data
function removeSensitive(data) {
  for(let index = 0; index < data.length; index++) {
    if(data[index]["SSN"] != null) {
      data[index]["SSN"] = obstructString(data[0]["SSN"]); //obstruct SSN

    }
    if(data[index]["Phone"] !=null) {
      data[index]["Phone"] = data[index]["Phone"].match(phoneRE)[0]; //extract area code

    }
    if(data[index]["Address"] != null) {
      data[index]["Address"] = data[index]["Address"].match(addressRE)[0]; //take out numbers

    }
  }
  return data;
}

//read json and return an object
function readJSON(fileString) {
  const fs = require('fs'); //use fs module to read json
  const rawData = fs.readFileSync(fileString); //gives hexcode
  const data = JSON.parse(rawData); //now can use it in object code
  return data;
}


//just returns string obstructed
function obstructString(data) {
  return (obstruct.MD5(data));
}

driver(); //start program
