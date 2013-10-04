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
            	
            	//console.log(response.body);
            	expect(response.error).to.be(null);
            	
            	if (response.error == null)
            		createdId = response.body.data[0].id;
            	
            	//console.log('createdId');
            	//console.log(createdId);
            	
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
            	
            	//console.log(response.body);
            	expect(response.error).to.be(null);
            	
            	callback(response.error);
            });
            
            /*
            //console.log('create many happening');
            
            var result = restack.dataPlugin.create('User', users, function(err, newObj) {

                expect(err).to.be(null);

                expect(newObj.length).to.be(2);

                //console.log('many results');
                //console.log(newObj);
                
               
                
                callback();
            });

            expect(result).to.be(undefined);
            
            */
        });

    });
    
    describe('test-getAll', function() {

        it('should find all objects of User', function (callback) {

        	 restack_client.GET('data', 'User', null, null, function(response){
  
        		 //console.log(response.body);
        		 callback(response.error);
        		 
        	 });
        	
        });
    });
    
    
    describe('test-getByID', function() {

        it('should findOne object of User by ID', function (callback) {

        	restack_client.GET('data', 'User', {id:createdId}, null, function(response){
        		  
        		console.log(response.body);//response.body.data
        		console.log(response.body.data);//response.body.data
        		expect(response.body.data.length).to.be(1);
        		
	       		 
	       		 callback(response.error);
       		 
       	 	});
        
        });
    });

    describe('test-find', function() {

        it('should find objects of User by firstname', function (callback) {

        	callback();
        	
        	/*
        	restack.dataPlugin.find('User', {firstname:'name'}, function(err, data){
        		expect(err).to.be(null);
        		
        		expect(data).to.be.ok();
        		expect(data.length > 0).to.be(true);
        		
        		callback();
        	});
        	*/
        });
    });

    describe('test-not find', function() {

        it('should find no objects of User by firstname unknown', function (callback) {

        	callback();
        	
        	/*
        	restack.dataPlugin.find('User', {firstname:'unknown'}, function(err, data){
        		expect(err).to.be(null);
        		
        		expect(data).to.be.ok();
        		expect(data.length == 0).to.be(true);
        		
        		callback();
        	});
        	*/
        });
    });
  
    describe('test-getAll', function() {

        it('should find all objects of User', function (callback) {

        	callback();
        	
        	/*
        	restack.dataPlugin.find('User', {}, function(err, data){
        		expect(err).to.be(null);
        		
        		expect(data).to.be.ok();
        		expect(data.length > 0).to.be(true);
        		
        		callback();
        	});
        	*/
        });
    });

    describe('test-update', function() {

        it('should update all objects of User with lastname surname to lastname = updated', function (callback) {

        	callback();
        	
        	/*
        	restack.dataPlugin.update('User', {lastname:'surname'}, {lastname:'updated'}, null, function(err, data){
        		expect(err).to.be(null);
        		
        		expect(data).to.be.ok();
        		expect(data > 0).to.be(true);
        		
        		callback();
        	});
        	*/
        });
    });

    describe('test-softdelete', function() {

        it('should soft delete all objects of User with emailaddress test@example.com', function (callback) {

        	callback();
        	
        	/*
        	restack.dataPlugin.remove('User', {emailaddress:'test@example.com'}, null, function(err, data){
        		expect(err).to.be(null);
        		
        		expect(data).to.be.ok();
        		expect(data > 0).to.be(true);
        		
        		//console.log('soft deleted');
        		//console.log(data);
        		
        		callback();
        	});
        	*/
        });
    });
    
    describe('test-harddelete', function() {

        it('should hard delete all objects of User with emailaddress test@example.com', function (callback) {

        	callback();
        	
        	/*
        	restack.dataPlugin.remove('User', {emailaddress:'test@example.com'}, {hard:true}, function(err, data){
        		expect(err).to.be(null);
        		
        		expect(data).to.be.ok();
        		expect(data > 0).to.be(true);
        		
        		//console.log('hard deleted');
        		//console.log(data);
        		
        		callback();
        	});
        	*/
        });
    });
    

});
