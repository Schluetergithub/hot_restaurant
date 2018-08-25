var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


var app = express();
var PORT = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var reservation = [
   {
       routeName: "rsvp",
       name: "",
       date: "",
       time: "",
       partyOf: ""

   },

];

var waitlist = [
   {
       routeName: "list",
       name: "",
       estimateTime: "",

   },

];

app.get("/", function (req, res) {
   res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function (req, res) {
   res.sendFile(path.join(__dirname, "reservation.html"));
})

   app.get("/tables", function (req, res) {
       res.sendFile(path.join(__dirname, "tables.html"));
   });

   // Displays all reservations
   app.get("/api/tables", function (req, res) {
       return res.json(reservation);
   });

   app.get("/api/waitlist", function (req, res) {
       return res.json(waitlist);
   });

   // Create New Characters - takes in JSON input
   app.post("/api/tables", function (req, res) {
       // req.body hosts is equal to the JSON post sent from the user
       // This works because of our body-parser middleware
       var newreservation = req.body;

       // Using a RegEx Pattern to remove spaces from newCharacter
       // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
       newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase();

       console.log(newreservation);

       reservation.push(newreservation);

       res.json(newreservation);

       if(reservation.length < 3) {
           reservation.push(newreservation);
           console.log("Thank you " + reservation.name + "your reservation is set for " + reservation.time + "on " + reservation.date);

       } else {
           waitlist.push(newreservation);
           console.log("All reservations have been booked, you are now on the wait list.");
       }
   });

    // Create New Characters - takes in JSON input
    app.post("/api/waitlist", function (req, res) {
       // req.body hosts is equal to the JSON post sent from the user
       // This works because of our body-parser middleware
       var newwaitlist = req.body;

       // Using a RegEx Pattern to remove spaces from newCharacter
       // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
       newwaitlist.routeName = newwaitlist.name.replace(/\s+/g, "").toLowerCase();

       console.log(newwaitlist);

       waitlist.push(newwaitlist);

       res.json(newwaitlist);
   });

   app.listen(PORT, function () {
       console.log("App listening on PORT " + PORT);
   });