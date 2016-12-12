//loading the 'login' angularJS module

var login = angular.module('login', ['ui.router','ngRoute','ngResource']);

//to store session data
var order_total=0;
var display_name='';
var session_owner='';
login.config(function($stateProvider, $urlRouterProvider, $locationProvider,$routeProvider) {
		$locationProvider.html5Mode(true);
		$stateProvider.state('login', {	
			url : '/',
			views: {
	            'header': {
	                templateUrl : 'templates/header.html',
	            },
	            'content': {
	                templateUrl : 'templates/login.html',
	            },
			}
		}).state('index',{
			url : '/index',
			controller: 'login',
			params : {USER: null},
			views: {
	            'header': {
	                templateUrl : 'templates/header1.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar.html'
	            },
	            'content': {
	                templateUrl : 'templates/index.html',
	            },
			}
		}).state('products',{
			url : '/products',
			controller: 'login',
			views: {
	            'header': {
	                templateUrl : 'templates/header1.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar.html'
	            },
	            'content': {
	                templateUrl : 'templates/products.html',
	            },
			}
		}).state('cart',{
			url : '/cart',
			controller: 'login',
			views: {
	            'header': {
	                templateUrl : 'templates/header1.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar.html'
	            },
	            'content': {
	                templateUrl : 'templates/cart.html',
	            },
			}
		}).state('contactus',{
			url : '/contactus',
			controller: 'login',
			views: {
	            'header': {
	                templateUrl : 'templates/header1.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar.html'
	            },
	            'content': {
	                templateUrl : 'templates/contactus.html',
	            },
			}
		}).state('checkout',{
			url : '/checkout',
			controller: 'login',
			views: {
	            'header': {
	                templateUrl : 'templates/header1.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar.html'
	            },
	            'content': {
	                templateUrl : 'templates/checkout.html',
	            },
			}
		}).state('payment_success',{
			url : '/payment_success',
			controller: 'login',
			views: {
	            'header': {
	                templateUrl : 'templates/header1.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar.html'
	            },
	            'content': {
	                templateUrl : 'templates/payment_success.html',
	            },
			}
		}).state('sell_product',{
			url : '/sell_product',
			controller: 'login',
			views: {
	            'header': {
	                templateUrl : 'templates/header1.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar.html'
	            },
	            'content': {
	                templateUrl : 'templates/sell_product.html',
	            },
			}
		}).state('cx_info',{
			url : '/cx_info',
			controller: 'login',
			views: {
	            'header': {
	                templateUrl : 'templates/header1.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar.html'
	            },
	            'content': {
	                templateUrl : 'templates/cx_info.html',
	            },
			}
		}).state('cx_orders',{
			url : '/cx_orders',
			controller: 'login',
			views: {
	            'header': {
	                templateUrl : 'templates/header1.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar.html'
	            },
	            'content': {
	                templateUrl : 'templates/cx_orders.html',
	            },
			}
		}).state('cx_bids',{
			url : '/cx_bids',
			controller: 'login',
			views: {
	            'header': {
	                templateUrl : 'templates/header1.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar.html'
	            },
	            'content': {
	                templateUrl : 'templates/cx_bids.html',
	            },
			}
		});
		$urlRouterProvider.otherwise('/');
});
//defining the login controller
login.controller('login', function($scope,$http,$state) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false
	$scope.invalid_product=true;
	$scope.valid_product=true;
	$scope.invalid_login = true;
	$scope.validlogin = true;
	$scope.category_list=["electronics","clothes","sports","kitchen","mobile","laptop","garden","home","living","media"];
	$scope.submit = function() {
		$http({
			method : "POST",
			url : '/checklogin',
			data : {
				"username" : $scope.username,
				"password" : $scope.password
			}
		}).success(function(data) {
			console.log(data[0]);
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				$scope.invalid_login = false;
				$scope.validlogin = true;
			}
			else{
				$scope.validlogin = false;
				$scope.invalid_login = true;
				$scope.display_name=data.display_name;
				display_name=data.display_name;
				session_owner=data.session_owner;
				$state.go('index');
				console.log("testing");
				$scope.display_name=data.display_name;
				display_name=data.display_name;
				session_owner=data.session_owner;
				$scope.session_owner=data.session_owner;
			} 
		}).error(function(error) {
			$scope.validlogin = true;
			$scope.invalid_login = true;
		});
		$scope.display_name=display_name;
	};
	
	$scope.register = function(){
		console.log("hey Call is here");
		window.location.assign('/register');
	};
	$scope.fetchProducts_e = function() {
		$scope.display_name=display_name;
		$scope.session_owner=session_owner;
		$http({
			method : "POST",
			url : '/fetchProducts',
			data : {
				"category":'electronics'
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				
			}
			else{
				$scope.products=data.products;
			}
		}).error(function(error) {		
			
		});
	};
	$scope.fetchProducts_c = function() {
		$scope.display_name=display_name;
		$scope.session_owner=session_owner;
		$http({
			method : "POST",
			url : '/fetchProducts',
			data : {
				"category":'clothes'
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				
			}
			else{
				$scope.products=data.products;
			}
		}).error(function(error) {		
			
		});
	};
	$scope.fetchProducts_s = function() {
		$scope.display_name=display_name;
		$scope.session_owner=session_owner;
		$http({
			method : "POST",
			url : '/fetchProducts',
			data : {
				"category":'sports'
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				
			}
			else{
				$scope.products=data.products;
			}
		}).error(function(error) {		
			
		});
	};
	$scope.fetchProducts_k = function() {
		$scope.display_name=display_name;
		$scope.session_owner=session_owner;
		$http({
			method : "POST",
			url : '/fetchProducts',
			data : {
				"category":'kitchen'
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				
			}
			else{
				$scope.products=data.products;
			}
		}).error(function(error) {		
			
		});
	};
	$scope.fetchProducts_m = function() {
		$scope.display_name=display_name;
		$http({
			method : "POST",
			url : '/fetchProducts',
			data : {
				"category":'mobile'
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				
			}
			else{
				$scope.products=data.products;
			}
		}).error(function(error) {		
			
		});
	};
	$scope.fetchProducts_l = function() {
		$scope.display_name=display_name;
		$http({
			method : "POST",
			url : '/fetchProducts',
			data : {
				"category":'laptop'
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				
			}
			else{
				$scope.products=data.products;
			}
		}).error(function(error) {		
			
		});
	};
	$scope.fetchProducts_g = function() {
		$scope.display_name=display_name;
		$http({
			method : "POST",
			url : '/fetchProducts',
			data : {
				"category":'garden'
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				
			}
			else{
				$scope.products=data.products;
			}
		}).error(function(error) {		
			
		});
	};
	$scope.fetchProducts_h = function() {
		$scope.display_name=display_name;
		$http({
			method : "POST",
			url : '/fetchProducts',
			data : {
				"category":'home'
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				
			}
			else{
				$scope.products=data.products;
			}
		}).error(function(error) {		
			
		});
	};
	$scope.fetchProducts_li = function() {
		$scope.display_name=display_name;
		$http({
			method : "POST",
			url : '/fetchProducts',
			data : {
				"category":'living'
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				
			}
			else{
				$scope.products=data.products;
			}
		}).error(function(error) {		
			
		});
	};
	$scope.fetchProducts_me = function() {
		$scope.display_name=display_name;
		$http({
			method : "POST",
			url : '/fetchProducts',
			data : {
				"category":'media'
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				
			}
			else{
				$scope.products=data.products;
			}
		}).error(function(error) {		
			
		});
	};
	$scope.addToCart = function(id){
		$scope.display_name=display_name;
		console.log("Hey Call is here");
		console.log(id);
		$http({
			method : "POST",
			url : '/addToCart',
			data : {
				"product_id" : id,
				"test":'test',
				"session_owner":session_owner
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				console.log("Oops Something went wrong!!");
			}
			else{
				console.log(session_owner);
				console.log("Item added to your cart");
			} 
		}).error(function(error) {
				
		})
		};
		$scope.showCart = function() {
			$scope.display_name=display_name;
			$http({
				method : "POST",
				url : '/showCart',
				data : {
					"session_owner":session_owner
				}
			}).success(function(data) {
				//checking the response data for statusCode
				if (data.statusCode == 401) {
					console.log("Oops Something went wrong!!");
				}
				else{
					order_total=data.cart_total;
					$scope.cart_total=data.cart_total;
					$scope.products=data.products;
				}
			}).error(function(error) {		
				
			});
		};
		$scope.removeFromCart = function(id){
			$scope.display_name=display_name;
			console.log("Hey Call is here");
			console.log(id);
			$http({
				method : "POST",
				url : '/removeFromCart',
				data : {
					"product_id" : id,
					"test":'test',
					"session_owner":session_owner
				}
			}).success(function(data) {
				//checking the response data for statusCode
				if (data.statusCode == 401) {
					console.log("Oops Something went wrong!!");
				}
				else{
					console.log(session_owner);
					console.log("Item removed from your cart");
				} 
			}).error(function(error) {
					
			})
			};
			$scope.checkout = function(){
				$scope.display_name=display_name;
				console.log("Hey Call is here");
				$http({
					method : "POST",
					url : '/checkout',
					data : {
						"test":'test',
						"session_owner":session_owner,
						"order_total":order_total
					}
				}).success(function(data) {
					//checking the response data for statusCode
					if (data.statusCode == 401) {
						console.log("Oops Something went wrong!!");
					}
					else{
						console.log(session_owner);
						console.log("yahoo your order is placed");
						$scope.cart_total=order_total;
						$state.go('checkout');
					} 
				}).error(function(error) {
						
				})
				};
				$scope.payment_success = function(){
					$scope.display_name=display_name;
					console.log("Hey Call is here");
					$state.go('payment_success');
				};
				$scope.sell_product=function(){
					$scope.display_name=display_name;
					$state.go('sell_product');
				};
				$scope.add_product=function(){
					$scope.display_name=display_name;
					console.log();
					$http({
						method : "POST",
						url : '/add_product',
						data : {
							"session_owner":session_owner,
							"product_name":$scope.product_name,
							"product_price":$scope.product_price,
							"product_quantity":$scope.product_quantity,
							"product_desc":$scope.product_desc,
							"product_condi":$scope.product_condi,
							"product_category":$scope.product_category
						}
					}).success(function(data) {
						//checking the response data for statusCode
						if (data.statusCode == 401) {
							console.log("Oops Something went wrong!!");
							$scope.invalid_product=false;
							$scope.valid_product=true;
						}
						else{
							$scope.valid_product=false;
							$scope.invalid_product=true;
							console.log(session_owner);
							console.log("yahoo product is in our inventory");
							
						} 
					}).error(function(error) {
							
					})
				};
				$scope.fetchProducts_nb = function() {
					$scope.display_name=display_name;
					
					$http({
						method : "POST",
						url : '/fetchProducts_nb',
						data : {
							"session_owner":session_owner,
						}
					}).success(function(data) {
						//checking the response data for statusCode
						if (data.statusCode == 401) {
							
						}
						else{
							$scope.products=data.products;
						}
					}).error(function(error) {		
						
					});
				};
				$scope.fetchProducts_all = function() {
					$scope.display_name=display_name;
					
					$http({
						method : "POST",
						url : '/fetchProducts_all',
						data : {
							"session_owner":session_owner,
						}
					}).success(function(data) {
						//checking the response data for statusCode
						if (data.statusCode == 401) {
							
						}
						else{
							$scope.products=data.products;
						}
					}).error(function(error) {		
						
					});
				};
				$scope.logout=function(){
					$scope.display_name=display_name;
					$http({
						method : "POST",
						url : '/logout',
						data : {
							"session_owner":session_owner,
						}
					}).success(function(data) {
						//checking the response data for statusCode
						if (data.statusCode == 401) {
							
						}
						else{
							
						}
					}).error(function(error) {		
						
					});

				};
				$scope.getCxInfo=function(){
					$scope.display_name=display_name;
					$scope.session_owner=session_owner;
					console.log("hey call is here");
				};
				$scope.getCxOrders=function(){
					$scope.display_name=display_name;
					$scope.session_owner=session_owner;

					$http({
						method : "POST",
						url : '/getCxOrders',
						data : {
							"session_owner":session_owner,
						}
					}).success(function(data) {
						//checking the response data for statusCode
						if (data.statusCode == 401) {
							
						}
						else{
							$scope.orders=data.products;
						}
					}).error(function(error) {		
						
					});

				};
				$scope.getCxProducts=function(){
					$scope.display_name=display_name;
					$scope.session_owner=session_owner;
					$http({
						method : "POST",
						url : '/getCxProducts',
						data : {
							"session_owner":session_owner,
						}
					}).success(function(data) {
						//checking the response data for statusCode
						if (data.statusCode == 401) {
							
						}
						else{
							$scope.products=data.products;
						}
					}).error(function(error) {		
						
					});

				};

});