var restack_client = require('../lib/restack_client');
var expect = require('expect.js');

describe('client-tests', function() {

    before(function(callback) {
    	restack_client.initialize({api_url:'http://localhost:7777'}, function(e){
    		callback(e);
    	});
    });

    var createdId = null;
    
    describe('test-create', function() {

        it('should create object of User', function(callback) {

            var user = {
                emailaddress: 'test@example.com',
                username: 'test@example.com',
                password: 'whatevs',
                firstname: 'name',
                lastname: 'surname'
            };

            restack_client.POST('data', 'User', user, null, function(response){
            	
            	console.log(response.body);
            	expect(response.error).to.be(null);
            	
 
            	
            	if (response.error == null)
            		createdId = response.body.data[0].id;
            	
            	
            	callback(response.error);
            	
            });

        });

    });
    
    describe('test-create-many', function() {

        it('should create 2 object of User', function(callback) {

            var users = [{
                emailaddress: 'test@example.com',
                username: 'test@example.com',
                password: 'multiples',
                firstname: 'name',
                lastname: 'surname'
            },{
                emailaddress: 'test@example.com',
                username: 'test@example.com',
                password: 'multiples',
                firstname: 'name',
                lastname: 'surname'
            }];

            //POST:function(area, type, data, headers, done){
            restack_client.POST('data', 'User', users, null, function(response){
            	
            	console.log(response.body);
            	
            	expect(response.error).to.be(null);
            	expect(response.body.status).to.be('OK');
            	expect(response.body.data.length).to.be(2);
            	
            	callback();
            });
            
        });

    });
    
    describe('test-update', function() {

        it('should update the created user with a unique firstname, then get the user by that firstname', function (callback) {
        	
        	restack_client.PUT('data', 'User', {id:createdId}, {firstname:'updated' + createdId}, null, function(response){
      		  
        		console.log(response.body);//response.body.data
        		console.log(response.body.data);//response.body.data
        		expect(response.body.data).to.be(1);
        		
        		if (response.error == null)
        		{
        			restack_client.GET('data', 'User', {firstname:'updated' + createdId}, null, function(response){
        				if (response.error == null)
                		{
        					expect(response.body.data.length).to.be(1);
        					expect(response.body.data[0].firstname).to.be('updated' + createdId);
        					callback();
                		}
        				else
        					callback(response.error);
        			});	
        		}
        		else
        			callback(response.error);
       		 
       	 	});
        });
    });
    
    describe('test-getAll', function() {

        it('should find all objects of User', function (callback) {

        	 restack_client.GET('data', 'User', null, null, function(response){
        		 
        		 console.log(response.body);
        		 
        		 expect(response.error).to.be(null);
        		 expect(response.body.status).to.be('OK');
             	 expect(response.body.data.length > 2).to.be(true);
             	 
        		 callback();
        		 
        	 });
        	
        });
    });
    
    
    
    describe('test-harddelete', function() {

        it('should hard delete all objects of User with emailaddress test@example.com', function (callback) {

        	restack_client.DELETE('data', 'User', {emailaddress:'test@example.com'}, {"delete-type":"hard"}, function(response){
        		
        		console.log(response.body);
        		expect(response.body.data).to.be(3);
        		
        		if (response.error == null)
        		{
        			restack_client.GET('data', 'User',{emailaddress:'test@example.com'}, {"include-deleted":true}, function(response){
        				
    					expect(response.body.data.length).to.be(0);
    					console.log(response.body.data);
    					
    					callback();
                		
        			});	
        		}
        		else
        			callback(response.error);
        		
        	});
        });
    });
    
    /*
    describe('test-getByID', function() {

        it('should findOne object of User by ID', function (callback) {

        	restack_client.GET('data', 'User', {id:createdId}, null, function(response){
        		  
        		 console.log(response.body);
        		 
        		 expect(response.error).to.be(null);
        		 expect(response.body.status).to.be('OK');
             	 expect(response.body.data.length).to.be(1);
             	 
        		 callback();
       		 
       	 	});
        
        });
    });

    describe('test-find', function() {

        it('should find objects of User by firstname', function (callback) {
        	
        	restack_client.GET('data', 'User', {firstname:'name'}, null, function(response){
      		  
        		console.log(response.body);
        		 
        		expect(response.error).to.be(null);
        		expect(response.body.status).to.be('OK');
        		expect(response.body.data.length > 1).to.be(true);
        		 
	       		callback();
       		 
       	 	});
        });
    });

    describe('test-not find', function() {

        it('should find no objects of User by firstname unknown', function (callback) {
        	
        	restack_client.GET('data', 'User', {firstname:'unknown'}, null, function(response){
        		  
        		console.log(response.body);
       		 
        		expect(response.error).to.be(null);
        		expect(response.body.status).to.be('OK');
        		expect(response.body.data.length).to.be(0);
        		
	       		 
	       		callback();
       		 
       	 	});
        });
    });
    */

});
