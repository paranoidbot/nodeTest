//let mysql = require("mysql") 
//it's commented out since I don't need to actually set up a db connection

const http = require('http')
const querystring = require('querystring')

let inputData = {

    "date": "23/07/2021",

    "users": [

        {

            "name": "AAAAAAAAAAA",

            "Total Phone Calls": 9,

            "Changed status to terminated": 0,

            "Changed status to lost from competitor": "0",

            "Total Unique Accounts": "9",

            "Calls Duration >120\"": "2",

        },

        {

            "name": "BBBBBBBBBBB",

            "Total Phone Calls": 39,

            "Changed status to terminated": 0,

            "Changed status to lost from competitor": "0",

            "Total Unique Accounts": "37",

            "Calls Duration >120\"": "3",

        },

        {

            "name": "CCCCCCCCCCCC",

            "Total Phone Calls": 6,

            "Changed status to terminated": 0,

            "Changed status to lost from competitor": "0",

            "Total Unique Accounts": "6",

            "Calls Duration >120\"": "0",

        },

        

    ]

}

//first item in this list is the day, second is month and third is year
parsedDateList = inputData.date.split("/");

//Convert to the ISO format for later comparison
isoInputDate = parsedDateList[2]+'-'+parsedDateList[1]+'-'+parsedDateList[0]

//The date from the exercise written in ISO format
referenceDate = "2021-09-01"

//create new Date object for input Date
inputDateObj =  new Date(isoInputDate)

//create new Date Object for reference Date
referenceDateObj = new Date(referenceDate)

//compare Dates
isInputDateBeforeReference = inputDateObj < referenceDateObj

if ( isInputDateBeforereference) {
  let conn = createDBConn()
  let tableCreated = createTable(conn,"users")
  if (tableCreated) {
    postUsersToAPI(inputData)
  }
  else {
    console.log("Saving data failed")
  }
}

else {
  postUsersToAPI(inputData)
}


//Creates a dummy MySQL connection
function createDBConn(){

//return mysql.createConnection({
//  host: "localhost",
//  user: "yourusername",
//  password: "yourpassword",
 // database: "mydb"
//});

return true; //Dummy connection always succeeds haha
}

function createTable(conn, tableName){
  if (conn == 	true){
  let sql =  'create table users ( name varchar(255), totalPhoneCalls int, changedStatusToTerminated int, changedStatusToLostFromAnotherCompetitor int, totalUniqueAccounts int, callsDurationUnder120 int);'
    
  conn.query(sql, (error) => {
  if (error) {
    return false;
  }
  return true; //tableCreation succeeded
  });
  }

  return false;

}

function postUsersToAPI(data){

  const parameters = {
    data: inputData
  }
  
  const post_data = querystring.stringify(parameters);
  
  const options = {
	url: "https://workflows.routee.net/",
	port: "80",
	path: "/test_assessment",
	method: "POST",
	headers : {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
	
}

  const request = http.request(options, (response) => {
	// your API returns a 502 response
	//you should fix it
});

 request.write(post_data);
 request.end();

}
