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
                password: 'whatevs',
                firstname: 'name',
                lastname: 'surname'
            };

            //POST:function(area, type, data, headers, done){
            restack_client.POST('data', 'User', user, null, function(response){
            	
            	////console.log(response.body);
            	expect(response.error).to.be(null);
            	
            	if (response.error == null)
            		createdId = response.body.data[0].id;
            	
            	////console.log('createdId');
            	////console.log(createdId);
            	
            	callback(response.error);
            	
            });
            
            /*
            var result = restack.dataPlugin.create('User', user, function(err, newObj) {

                expect(err).to.be(null);

                expect(newObj[0]).to.be.ok();
                expect(newObj[0].emailaddress).to.be('test@example.com');
                expect(newObj[0].password).to.be('whatevs');
                expect(newObj[0].firstname).to.be('name');
                expect(newObj[0].lastname).to.be('surname');

                createdId = newObj[0].id;
                
      
                
                callback();
            });
            
            */

        });

    });

    describe('test-create-many', function() {

        it('should create 2 object of User', function(callback) {

            var users = [{
                emailaddress: 'test@example.com',
                password: 'multiples',
                firstname: 'name',
                lastname: 'surname'
            },{
                emailaddress: 'test@example.com',
                password: 'multiples',
                firstname: 'name',
                lastname: 'surname'
            }];

            //POST:function(area, type, data, headers, done){
            restack_client.POST('data', 'User', users, null, function(response){
            	
            	////console.log(response.body);
            	expect(response.error).to.be(null);
            	
            	callback(response.error);
            });
            
            /*
            ////console.log('create many happening');
            
            var result = restack.dataPlugin.create('User', users, function(err, newObj) {

                expect(err).to.be(null);

                expect(newObj.length).to.be(2);

                ////console.log('many results');
                ////console.log(newObj);
                
               
                
                callback();
            });

            expect(result).to.be(undefined);
            
            */
        });

    });
    
    describe('test-getAll', function() {

        it('should find all objects of User', function (callback) {

        	 restack_client.GET('data', 'User', null, null, function(response){
  
        		 ////console.log(response.body);
        		 callback(response.error);
        		 
        	 });
        	
        });
    });
    
    
    describe('test-getByID', function() {

        it('should findOne object of User by ID', function (callback) {

        	restack_client.GET('data', 'User', {id:createdId}, null, function(response){
        		  
        		//console.log(response.body);//response.body.data
        		//console.log(response.body.data);//response.body.data
        		expect(response.body.data.length).to.be(1);
        		
	       		 
	       		 callback(response.error);
       		 
       	 	});
        
        });
    });

    describe('test-find', function() {

        it('should find objects of User by firstname', function (callback) {
        	
        	restack_client.GET('data', 'User', {id:createdId}, null, function(response){
      		  
        		//console.log(response.body);//response.body.data
        		//console.log(response.body.data);//response.body.data
        		expect(response.body.data.length).to.be(1);
        		
	       		 
	       		 callback(response.error);
       		 
       	 	});
        });
    });

    describe('test-not find', function() {

        it('should find no objects of User by firstname unknown', function (callback) {
        	
        	restack_client.GET('data', 'User', {firstname:'unknown'}, null, function(response){
        		  
        		//console.log(response.body);//response.body.data
        		//console.log(response.body.data);//response.body.data
        		expect(response.body.data.length).to.be(0);
        		
	       		 
	       		 callback(response.error);
       		 
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

    describe('test-softdelete', function() {

        it('should soft delete the initial created test user', function (callback) {

        	//(area, type, criteria, headers, done)
        	
        	restack_client.DELETE('data', 'User', {id:createdId}, null, function(response){
        		
        		if (response.error == null)
        		{
        			restack_client.GET('data', 'User', {id:createdId}, {"include-deleted":true}, function(response){
        				if (response.error == null)
                		{
        					expect(response.body.data.length).to.be(1);
        					expect(response.body.data[0].firstname).to.be('updated' + createdId);
        					expect(response.body.data[0].deleted).to.be(true);
        					
        					console.log(response.body.data);
        					
        					restack_client.GET('data', 'User', {id:createdId}, null, function(response){
        						
        						if (response.error == null)
        						{
        							expect(response.body.data.length).to.be(0);
            						callback();
        						}
        						else
        							callback(response.error);
        						
        					});
        					
        					
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
    
    describe('test-harddelete', function() {

        it('should hard delete all objects of User with emailaddress test@example.com', function (callback) {

        	restack_client.DELETE('data', 'User', {emailaddress:'test@example.com'}, {"delete-type":"hard"}, function(response){
        		
        		if (response.error == null)
        		{
        			restack_client.GET('data', 'User',{emailaddress:'test@example.com'}, {"include-deleted":true}, function(response){
        				if (response.error == null)
                		{
        					expect(response.body.data.length).to.be(0);
        					console.log(response.body.data);
        					
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
    

});
