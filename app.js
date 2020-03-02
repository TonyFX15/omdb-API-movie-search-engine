var express = require("express")
var app = express()
var request = require("request");
var port = process.env.PORT || 3000;	
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("search");
});

app.get("/results", function(req, res){
	var query = req.query.search;
	var url ="http://www.omdbapi.com/?s="+req.query.search+"&apikey=d7c4df91"
			
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
		 var data = JSON.parse(body);

			if (typeof(data["Search"]) == "undefined"){
				res.render("not-found.ejs");
				}
			else{
				res.render("results",{data: data});
				}
			}
		})
	});


	
 app.listen(3000, function() { 
	console.log("Server listening on port localhost: 3000");
});