
/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, http = require('http')
, path = require('path');

//URL for the sessions collections in mongoDB
//var mongoSessionConnectURL = "mongodb://localhost:27017/login";
var expressSession = require("express-session");
//var mongoStore = require("connect-mongo")(expressSession);
//var mongo = require("./routes/mongo");
var login = require("./routes/login");
var register=require("./routes/register");
var index=require("./routes/index");
var products=require("./routes/products");
var cart=require("./routes/cart");
var contactus=require("./routes/contactus");
var checkout=require("./routes/checkout");
var payment_success=require("./routes/payment_success");
var sell_product=require("./routes/sell_product");
var calculator=require("./routes/calculator");
//var session = require('client-sessions');

var app = express();

//all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(expressSession({
	secret: 'cmpe273_teststring',
	resave: false,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	
}));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

//GET Requests
app.get('/', routes.index);
app.get('/index',index.re);
app.get('/users', user.list);
app.get('/login',login.redirectToHomepage);
app.get('/homepage',login.redirectToHomepage);
app.get('/register',register.test);
app.get('/products',index.re);
app.get('/cart',index.re);
app.get('/contactus',index.re);
app.get('/checkout',index.re);
app.get('/payment_success',index.re);
app.get('/sell_product',index.re);
app.get('/cx_info',index.re);
app.get('/cx_orders',index.re);
app.get('/cx_products',index.re);

//POST Requests
app.post('/checklogin', login.checkLogin);
app.post('/fetchProducts', login.fetchProducts);
app.post('/registeruser', register.registeruser);
app.post('/addToCart',login.addToCart);
app.post('/showCart',login.showCart);
app.post('/removeFromCart',login.removeFromCart);
app.post('/checkout',login.checkout);
app.post('/add_product',login.add_product);
app.post('/fetchProducts_nb', login.fetchProducts_nb);
app.post('/fetchProducts_all', login.fetchProducts_all);
app.post('/getCxOrders',login.getCxOrders);
app.post('/getCxProducts',login.getCxProducts);
app.post('/logout', login.logout);

app.get('/calculator',calculator.getCalculator);
app.post('/calculate',calculator.calculate);

//connect to the mongo collection session and then createServer
/*mongo.connect(mongoSessionConnectURL, function(){
	console.log('Connected to mongo at: ' + mongoSessionConnectURL);*/
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});  
//});