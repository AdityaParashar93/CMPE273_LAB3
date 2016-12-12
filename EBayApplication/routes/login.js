
var soap = require('soap');
var baseURL = "http://localhost:3003/LoginApp/services";
var winston = require('winston');
var ejs = require("ejs");
var mysql = require('./mysql');
var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: 'ebayLog.log' })
	]
});
var bcrypt=require('bcrypt-nodejs');
exports.checkLogin = function(req,res){
	// These two variables come from the form on
	// the views/login.hbs page
	
	 var option = {
			ignoredNamespaces : true	
		};
	 var url = baseURL+"/Validate?wsdl";
	  var args = {username: req.param('username'),password: req.param('password')};
	  soap.createClient(url,option, function(err, client) {
	      client.validate(args, function(err, result) {
	    	  var response=JSON.parse(result.validateReturn.$value);
	    	  console.log(response);
	    	  var json_responses;
	  			if(response.length > 0){
	  				if(bcrypt.compareSync(req.param("password"),response[0].cx_password)){
	  				req.session.username=req.param("username");
	  				console.log("Result Element:"+(response[0].cx_display));
	  				console.log("valid Login");
	  				//logger.log('info', "Query:: " + getUser);
	  				req.session.display_name=response[0].cx_display;
	  				//console.log(username);
	  				json_responses = {"statusCode" : 200,"display_name":req.session.display_name,"session_owner":req.session.username};
	  				res.send(json_responses);
	  				}
	  			}
	  			else{
	  				console.log("Invalid Login");
	  				console.log(err);
	  				logger.log('error', "Error:: " + err);
	  				json_responses = {"statusCode" : 401};
	  			    res.send(json_responses);
	  			}
	    	  });
	      });
	  };

exports.fetchProducts=function(req,res){
	var user=req.session.username;
	var getAllProducts = "select * from products where product_category='"+req.param("category")+"' and product_seller='Ebay'";
	console.log("Query is:"+getAllProducts);
	var json_responses;
	var option = {
		ignoredNamespaces : true	
	};
	var url = baseURL+"/Products?wsdl";
	var args = {query:getAllProducts};
	soap.createClient(url,option, function(err, client) {
	      client.products(args, function(err, result) {
	    	  var response=JSON.parse(result.productsReturn.$value);
	    	  console.log(response);
	    	  var json_responses;
	    	  if(response.length > 0){
					logger.log('info', "Query:: " + getAllProducts);
					var rows = response;
					var i=0;
					for(i=0;i<response.length;i++){
						console.log(rows[i].product_name);
					}
					json_responses={"status code":200,"products":rows,"session_owner":user};
					res.send(json_responses);
				}
				else {    
					json_responses={"status code":401};
					res.send(json_responses);
				}  
	    	  });
	      });
};
	
	/*mysql.fetchData(function(err,results){
		if(err){
			logger.log('error', "Error:: " + err);
			throw err;
		}
		else 
		{
			if(results.length > 0){
				logger.log('info', "Query:: " + getAllProducts);
				var rows = results;
				var i=0;
				for(i=0;i<results.length;i++){
					console.log(rows[i].product_name);
				}
				json_responses={"status code":200,"products":rows,"session_owner":user};
				res.send(json_responses);
			}
			else {    
				json_responses={"status code":401};
				res.send(json_responses);
			}
		}  
	},getAllProducts);*/

	

exports.fetchProducts_nb=function(req,res){
	var user=req.session.username;
	var getAllProducts = "select * from products where product_condi='old_nb';";
	console.log("Query is:"+getAllProducts);
	var json_responses;
	var option = {
		ignoredNamespaces : true	
	};
	var url = baseURL+"/Products?wsdl";
	var args = {query:getAllProducts};
	soap.createClient(url,option, function(err, client) {
	      client.products(args, function(err, result) {
	    	  var response=JSON.parse(result.productsReturn.$value);
	    	  console.log(response);
	    	  var json_responses;
	    	  if(response.length > 0){
					logger.log('info', "Query:: " + getAllProducts);
					var rows = response;
					var i=0;
					for(i=0;i<response.length;i++){
						console.log(rows[i].product_name);
					}
					json_responses={"status code":200,"products":rows,"session_owner":user};
					res.send(json_responses);
				}
				else {    
					json_responses={"status code":401};
					res.send(json_responses);
				}  
	    	  });
	      });
	
};
exports.fetchProducts_all=function(req,res){
	var user=req.session.username;
	var getAllProducts = "select * from products where product_seller='Ebay';";
	console.log("Query is:"+getAllProducts);
	var json_responses;
	
	var option = {
			ignoredNamespaces : true	
		};
		var url = baseURL+"/Products?wsdl";
		var args = {query:getAllProducts};
		soap.createClient(url,option, function(err, client) {
		      client.products(args, function(err, result) {
		    	  var response=JSON.parse(result.productsReturn.$value);
		    	  console.log(response);
		    	  var json_responses;
		    	  if(response.length > 0){
						logger.log('info', "Query:: " + getAllProducts);
						var rows = response;
						var i=0;
						for(i=0;i<response.length;i++){
							console.log(rows[i].product_name);
						}
						json_responses={"status code":200,"products":rows,"session_owner":user};
						res.send(json_responses);
					}
					else {    
						json_responses={"status code":401};
						res.send(json_responses);
					}  
		    	  });
		      });
};
exports.getCxProducts=function(req,res){
	var user=req.session.username;
	var getAllProducts = "select * from products where product_seller='"+req.param("session_owner")+"';";
	console.log("Query is:"+getAllProducts);
	var json_responses;
	
	var option = {
			ignoredNamespaces : true	
		};
		var url = baseURL+"/Products?wsdl";
		var args = {query:getAllProducts};
		soap.createClient(url,option, function(err, client) {
		      client.products(args, function(err, result) {
		    	  var response=JSON.parse(result.productsReturn.$value);
		    	  console.log(response);
		    	  var json_responses;
		    	  if(response.length > 0){
						logger.log('info', "Query:: " + getAllProducts);
						var rows = response;
						var i=0;
						for(i=0;i<response.length;i++){
							console.log(rows[i].product_name);
						}
						json_responses={"status code":200,"products":rows,"session_owner":user};
						res.send(json_responses);
					}
					else {    
						json_responses={"status code":401};
						res.send(json_responses);
					}  
		    	  });
		      });
};
exports.addToCart=function(req,res){
	console.log(req.param("product_id"));
	console.log(req.param("test"));
	req.session.username=req.param("session_owner");
	console.log(req.session.username);
	var putCart="insert into cart (cx_email,product_id) values ('"+req.session.username+"','" + req.param("product_id")+"');" ;
	console.log("Query is:"+putCart);
	var json_responses;
	mysql.fetchData(function(err,results){
		if(err){
			logger.log('error', "Error:: " + err);
			console.log("Invalid Entry");
			console.log(err);
			json_responses = {"statusCode" : 401};
		    res.send(json_responses);		    
			throw err;
			
		}
		else 
		{
			logger.log('info', "Query:: " + putCart);
				console.log("valid Entry");
				json_responses = {"statusCode" : 200};
	    		res.send(json_responses);
		}
	},putCart);
};
exports.showCart=function(req,res){
	console.log(req.param("session_owner"));
	var getAllProducts="SELECT * FROM products WHERE product_id IN (SELECT product_id FROM cart WHERE cx_email='"+req.param("session_owner")+"' );";
	console.log("Query is:"+getAllProducts);
	var json_responses;
	
	var option = {
			ignoredNamespaces : true	
		};
		var url = baseURL+"/Products?wsdl";
		var args = {query:getAllProducts};
		soap.createClient(url,option, function(err, client) {
		      client.products(args, function(err, result) {
		    	  var response=JSON.parse(result.productsReturn.$value);
		    	  console.log(response);
		    	  var json_responses;
		    	  if(response.length > 0){
						logger.log('info', "Query:: " + getAllProducts);
						var rows = response;
						var i=0;
						var sum=0;
						for(i=0;i<response.length;i++){
							console.log(rows[i].product_name);
						}
						for(i=0;i<response.length;i++){
							console.log(rows[i].product_value);
							sum=sum+rows[i].product_value;
						}
						console.log(sum);
						json_responses={"status code":200,"products":rows,"cart_total":sum};
						res.send(json_responses);
					}
					else {    
						json_responses={"status code":401};
						res.send(json_responses);
					}
		    	  });
		      });
};
exports.removeFromCart=function(req,res)
{
	console.log(req.param("product_id"));
	console.log(req.param("test"));
	req.session.username=req.param("session_owner");
	console.log(req.session.username);
	var putCart="delete from cart where cx_email='"+req.session.username+"' and product_id=" + req.param("product_id")+";" ;
	console.log("Query is:"+putCart);
	var json_responses;
	var option = {
			ignoredNamespaces : true	
		};
		var url = baseURL+"/Manipulate?wsdl";
		var args = {query:putCart};
		soap.createClient(url,option, function(err, client) {
		      client.manipulate(args, function(err, result) {
		    	  if(err){
		  			logger.log('error', "Error:: " + err);
		  			console.log("Invalid Entry");
		  			console.log(err);
		  			json_responses = {"statusCode" : 401};
		  		    res.send(json_responses);		    
		  			throw err;
		  			
		  		}
		  		else 
		  		{
		  				console.log("valid Entry");
		  				logger.log('info', "Query:: " + putCart);
		  				json_responses = {"statusCode" : 200};
		  	    		res.send(json_responses);
		  		}
		    	  });
		      });	
};
exports.checkout=function(req,res){
	console.log(req.param("session_owner"));
	var getAllProducts="SELECT * FROM products WHERE product_id IN (SELECT product_id FROM cart WHERE cx_email='"+req.param("session_owner")+"' );";
	console.log("Query is:"+getAllProducts);
	var json_responses;
	var sum=0;
	
	var option = {
			ignoredNamespaces : true	
		};
		var url = baseURL+"/Products?wsdl";
		var args = {query:getAllProducts};
		soap.createClient(url,option, function(err, client) {
		      client.products(args, function(err, result) {
		    	  var response=JSON.parse(result.productsReturn.$value);
		    	  console.log(response);
		    	  var json_responses;
		    	  if(response.length > 0){
						logger.log('info', "Query:: " + getAllProducts);
						var rows = response;
						var i=0;
						for(i=0;i<response.length;i++){
							console.log(rows[i].product_value);
							sum=sum+rows[i].product_value;
						}
					}
		    	  });
		      });
	
	
	console.log(sum);
	var putCart="delete from cart where cx_email='"+req.param("session_owner")+"';" ;
	console.log("Query is:"+putCart);
	mysql.fetchData(function(err,results){
		if(err){
			logger.log('error', "Error:: " + err);
			console.log("Invalid Entry");
			console.log(err);
			json_responses = {"statusCode" : 401};
		    res.send(json_responses);		    
			throw err;
			
		}
		else 
		{
				console.log("valid Entry");
				logger.log('info', "Query:: " + putCart);
				json_responses = {"statusCode" : 200};
	    		res.send(json_responses);
		}
	},putCart);
	console.log(sum);
	var putOrder="insert into orders (cx_email,order_total) values ('"+req.session.username+"',"+req.param("order_total")+");" ;
	console.log("Query is:"+putOrder);
	mysql.fetchData(function(err,results){
		if(err){
			logger.log('error', "Error:: " + err);
			console.log("Invalid Entry");
			console.log(err);
			json_responses = {"statusCode" : 401};
		    res.send(json_responses);		    
			throw err;
		}
		else 
		{
				console.log("valid Entry");
				logger.log('info', "Query:: " + putOrder);
				json_responses = {"statusCode" : 200};
	    		res.send(json_responses);
		}
	},putOrder);
};
exports.add_product=function(req,res){
	var putProduct="insert into products (product_name,product_seller,product_value,product_inventory,product_desc,product_condi,product_category) values ('"+req.param("product_name")+"','"+req.param("session_owner")+"',"+req.param("product_price")+","+req.param("product_quantity")+",'"+ req.param("product_desc")+"','"+req.param("product_condi")+"','"+req.param("product_category")+"');";
	console.log("Query is:"+putProduct);
	var json_responses;
	mysql.fetchData(function(err,results){
		if(err){
			logger.log('error', "Error:: " + err);
			console.log("Invalid Entry");
			console.log(err);
			json_responses = {"statusCode" : 401};
		    res.send(json_responses);		    
			throw err;
		}
		else 
		{
				console.log("valid Entry");
				logger.log('info', "Query:: " + putProduct);
				json_responses = {"statusCode" : 200};
	    		res.send(json_responses);
		}
	},putProduct);
};
//Redirects to the homepage
exports.redirectToHomepage = function(req,res)
{
	//Checks before redirecting whether the session is valid
	/*if(req.session.username)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("homepage",{username:req.session.username});
	}
	else
	{*/
		res.redirect('/');
	//}
};
exports.getCxOrders=function(req,res){
	console.log(req.param("session_owner"));
	var getAllProducts="SELECT * FROM orders WHERE cx_email='"+req.param("session_owner")+"';";
	console.log("Query is:"+getAllProducts);
	var json_responses;
	
	var option = {
			ignoredNamespaces : true	
		};
		var url = baseURL+"/Products?wsdl";
		var args = {query:getAllProducts};
		soap.createClient(url,option, function(err, client) {
		      client.products(args, function(err, result) {
		    	  var response=JSON.parse(result.productsReturn.$value);
		    	  console.log(response);
		    	  var json_responses;
		    	  if(response.length > 0){
						logger.log('info', "Query:: " + getAllProducts);
						var rows = response;
						var i=0;
						for(i=0;i<response.length;i++){
							console.log(rows[i].product_name);
						}
						json_responses={"status code":200,"products":rows,"session_owner":req.session.username};
						res.send(json_responses);
					}
					else {    
						json_responses={"status code":401};
						res.send(json_responses);
					}  
		    	  });
		      });
};
//Logout the user - invalidate the session
exports.logout = function(req,res)
{
	req.session.destroy();
	res.redirect('/');
};