var restack_client = require('../lib/restack_client');
var expect = require('expect.js');

console.log('initializing');
restack_client.initialize({api_url:'http://localhost:7777'}, function(e){
	
	console.log('initialized');
	
	if (!e)
	{
		console.log('posting user');
		var user = {
                emailaddress: 'test@example.com',
                password: 'whatevs',
                firstname: 'name',
                lastname: 'surname'
            };

            //POST:function(area, type, data, headers, done){
            restack_client.POST('data', 'User', user, null, function(response){
            	
            	 if (response.error == null)
            	 {
	            	console.log(response.data);
	            	
	            	  console.log('getting users');
	                  //GET:function(area, type, criteria, headers, done){
	                  restack_client.GET('data', 'User', {emailaddress: 'test@example.com'}, null, function(response){
	                  	
	                	 if (response.error == null)
	                	 {
	                		 console.log("Get worked");
	                		 //PUT:function(area, type, criteria, data, headers, done){
	                		 restack_client.PUT('data', 'User', {emailaddress: 'test@example.com'}, {newproperty:'updated now', firstname:'updated firstname'}, null, function(response){
	                			
	                			console.log('update response');
	                			console.log(response.data);
	                			 
	                			if (response.error == null)
	                			{
	                				 restack_client.GET('data', 'User', {emailaddress: 'test@example.com'}, {'Include-Deleted':true}, function(response){
	                					 console.log('get after update response');
	     	                			console.log(response.data);
	                				 }.bind(this));
	                			}
	                			 
	                		 }.bind(this));
	                		 
	                	 }
	                	
	                  	
	                  }.bind(this));
            	 }
            	
            }.bind(this));
            
          
	}
	
});


