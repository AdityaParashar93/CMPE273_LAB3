var ejs = require("ejs");
var mysql = require('./mysql');
var bcrypt=require('bcrypt-nodejs');
exports.registeruser=function(req,res) {
	
	var hash = bcrypt.hashSync(req.param("password"));
	var getUser="insert into userinfo (cx_firstname,cx_lastname,cx_display,cx_email,cx_password) values ('"+req.param("first_name")+"','" + req.param("last_name")+"','"+ req.param("display_name")+"','"+ req.param("email")+"','"+hash+"');" ;
	console.log("Query is:"+getUser);
	var json_responses;
	mysql.fetchData(function(err,results){
		if(err){
			console.log("Invalid Login");
			console.log(err);
			json_responses = {"statusCode" : 401};
		    res.send(json_responses);		    
			throw err;
			
		}
		else 
		{
				console.log("valid Login");
				json_responses = {"statusCode" : 200};
	    		res.send(json_responses);
		}
	},getUser);
};
exports.test = function(req,res)
{
	console.log("Hey call is here");	
	res.render('register',{title:'Register'});
};