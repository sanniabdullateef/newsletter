//const request = require(request);
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signUp.html");
});

app.post('/', function(req, res){

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members : [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME:firstName,
          LNAME:lastName
        } 
      }
    ]
  }
     
   var jsonData = JSON.stringify(data);

  var options = {
      url: "https://us4.api.mailchimp.com/3.0/lists/53a25de52e",
      method: "POST",
      headers: {
        "Authorization":"slateef39 6b6565a09615f31f68d664180859d03a-us4"
      },
    // body: jsonData
  }

  request(options, function(error, response, body ){
        if (response.statusCode === 200){
          res.sendFile(__dirname + "/success.html")
          // res.send ("Signing Up was Completed!" + "/success.html")
        }
        else  if(response.statusCode === error)  {
          res.sendFile(__dirname + "/failure.html")
          // res.send("error signing up. Try again Later" + "/failure.html" )
          }
        else {
          res.sendFile(__dirname + "/failure.html");
          
        }
    
  })

  // console.log(firstName, lastName, email);

});

// Api key
// 6b6565a09615f31f68d664180859d03a-us4

// list unique Id
// 53a25de52e

app.post("/failure", function(req, res){
  res.redirect("/");
});



app.listen(process.env.PORT || 5000, function() {
    console.log("Server is running on port 5000.");
  });