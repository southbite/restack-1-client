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
            	
            	console.log(response);
            	
            	  console.log('getting users');
                  //GET:function(area, type, criteria, headers, done){
                  restack_client.GET('data', 'User', {emailaddress: 'test@example.com'}, null, function(response){
                  	
                  	console.log(response);
                  	
                  });
            	
            });
            
          
	}
	
});


