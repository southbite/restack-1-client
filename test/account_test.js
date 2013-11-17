var restack_client = require('../lib/restack_client');
var expect = require('expect.js');
var uuid = require('node-uuid');

describe('client-tests', function() {

    before(function(callback) {
    	restack_client.initialize({api_url:'http://localhost:7777'}, function(e){
    		callback(e);
    	});
    });

    var createdUser = null;
    var uniqueTestKey = uuid.v4();
    var userToken = null;
    var createdAccount = null;
    var testObjectId = null;
    
    var createdUserOther = null;
    var uniqueTestKeyOther = uuid.v4();
    var userTokenOther = null;
    var createdAccountOther = null;
    var testObjectIdOther = null;
    
    it('should create the test User', function(callback) {

    	this.timeout(10000);
    	
        var user = {
            emailaddress: 'southbite@gmail.com',
            username: 'User ' + uniqueTestKey,
            secret: uniqueTestKey,
            names: 'Simon Bishop'
        };

        restack_client.POST('User', user, {"return-confirm-key":"true"}, function(response){
        	
        	////console.log(response.body);
        	expect(response.error).to.be(null);
        	expect(response.body.status).to.be('OK');
        	expect(response.body.data.length).to.be(1);
        	createdUser = response.body.data[0];
        	
        	callback(response.error);
        	
        }.bind(this)); 

    });
 

    it('should confirm user', function(callback) {
    	
    	//console.log(createdUser);
    	
    	restack_client.GET('User', {confirmKey:createdUser.confirmKey}, {}, function(response){
    		expect(response.error).to.be(null);
    		expect(response.body.status).to.be('OK');
    		expect(response.body.data[0].status).to.be('Confirmed');//cool we are confirmed
    		
    		callback();
    		
    	}.bind(this));
    	
    });
    
    it('should create the other test User', function(callback) {

    	this.timeout(10000);
    	
        var user = {
            emailaddress: 'southbite@gmail.com',
            username: 'User ' + uniqueTestKeyOther,
            secret: uniqueTestKeyOther,
            names: 'Simon Bishop'
        };

        restack_client.POST('User', user, {"return-confirm-key":"true"}, function(response){
        	
        	////console.log(response.body);
        	expect(response.error).to.be(null);
        	expect(response.body.status).to.be('OK');
        	expect(response.body.data.length).to.be(1);
        	createdUserOther = response.body.data[0];
        	
        	callback(response.error);
        	
        }.bind(this)); 

    });
 

    it('should confirm the other user', function(callback) {
    	
    	//console.log(createdUser);
    	
    	restack_client.GET('User', {confirmKey:createdUserOther.confirmKey}, {}, function(response){
    		expect(response.error).to.be(null);
    		expect(response.body.status).to.be('OK');
    		expect(response.body.data[0].status).to.be('Confirmed');//cool we are confirmed
    		
    		callback();
    		
    	}.bind(this));
    	
    });

    it('should log in the main user', function(callback) {
    	
    	restack_client.POST('Login', {secret:uniqueTestKey, username:createdUser.username}, {}, function(response){
			expect(response.error).to.be(null);
			expect(response.body.status).to.be('OK');
			expect(response.body.data[0].token.length > 0).to.be(true);
			userToken = response.body.data[0].token;
			
			//console.log('logged in and have token ' + response.body.data[0].token);
			
			callback();
			
		}.bind(this));
    	
    });
    
it('should log in the other user', function(callback) {
    	
    	restack_client.POST('Login', {secret:uniqueTestKeyOther, username:createdUserOther.username}, {}, function(response){
			expect(response.error).to.be(null);
			expect(response.body.status).to.be('OK');
			expect(response.body.data[0].token.length > 0).to.be(true);
			userTokenOther = response.body.data[0].token;
			
			//console.log('logged in and have token ' + response.body.data[0].token);
			
			callback();
			
		}.bind(this));
    	
    });

    
    it('should create the test Account', function(callback) {

        var account = {
        	name: 'Account ' + uniqueTestKey,
        	description: 'Test Account ' + uniqueTestKey
        };

        restack_client.POST('Account', account, {token:userToken}, function(response){
        	
        	//console.log(response.body);
        	expect(response.error).to.be(null);
        	expect(response.body.status).to.be('OK');
        	expect(response.body.data.length == 1).to.be(true);
        	createdAccount = response.body.data[0];
        	
        	callback(response.error);
        	
        });

    });
    
    describe('test-create', function() {

        it('should create object of Test', function(callback) {

            var testObject = {
                testProperty1: 'test@example.com',
                testProperty2: 'test@example.com'
            };

            restack_client.POST('Test', testObject, {token:userToken, 'user-account':createdAccount.userAccount.id}, function(response){
            	
            	//console.log(response.body);
            	expect(response.error).to.be(null);
            	expect(response.body.status).to.be('OK');
            	if (response.error == null)
            		testObjectId = response.body.data[0].id;
            	
            	callback(response.error);
            	
            });

        });

    });
    
    describe('test-create-fail', function() {

        it('should fail to create object of Test', function(callback) {

            var testObject = {
                testProperty1: 'test@example.com',
                testProperty2: 'test@example.com'
            };

            restack_client.POST('Test', testObject, {token:userTokenOther, 'user-account':createdAccount.userAccount.id}, function(response){
            	
            	//console.log(response.body);
            	expect(response.error).to.be(null);
            	expect(response.body.status).to.be('FAILED');
            	//console.log(response.body.status);
            	
            	callback(response.error);
            	
            });

        });

    });
    
    describe('test-create-many-static', function() {

        it('should create 2 object of StaticTest', function(callback) {

            var statics = [{
                property1: 'value1',
                property2: 'value2'
            },{
                property1: 'value1',
                property2: 'value2'
            }];

            //POST:function(area, type, data, headers, done){
            restack_client.POST('StaticTest', statics, {token:userToken, 'user-account':createdAccount.userAccount.id}, function(response){
            	
            	//console.log(response.body);
            	
            	expect(response.error).to.be(null);
            	expect(response.body.status).to.be('OK');
            	expect(response.body.data.length).to.be(2);
            	
            	callback();
            });
            
        });

    });
    
    describe('test-getAll', function() {

        it('should find all objects of static', function (callback) {

        	 restack_client.GET('StaticTest', null, {token:userToken, 'user-account':createdAccount.userAccount.id}, function(response){
        		 
        		 //console.log(response.body);
        		 
        		 expect(response.error).to.be(null);
        		 expect(response.body.status).to.be('OK');
             	 expect(response.body.data.length == 2).to.be(true);
             	 
        		 callback();
        		 
        	 });
        	
        });
    });
    
    describe('test-getAll', function() {

        it('should find all objects of static', function (callback) {

        	 restack_client.GET('StaticTest', null, {token:userToken, 'user-account':createdAccount.userAccount.id}, function(response){
        		 
        		 //console.log(response.body);
        		 
        		 expect(response.error).to.be(null);
        		 expect(response.body.status).to.be('OK');
             	 expect(response.body.data.length == 2).to.be(true);
             	 
        		 callback();
        		 
        	 });
        	
        });
    });
    
    var concurrencyObject;
    
    describe('test-check concurrency', function() {

        it('should create and update an object called ConcurrencyTest', function (callback) {

        	var testObject = {
        			property1: 'property1Val',
        			property2: 'property2Val'
                };

                restack_client.POST('ConcurrencyTest', testObject, {token:userToken, 'user-account':createdAccount.userAccount.id}, function(response){
                	
                	console.log(response.body);
                	expect(response.error).to.be(null);
                	expect(response.body.status).to.be('OK');
                	if (response.error == null)
                		concurrencyObject = response.body.data[0];
                	
                	restack_client.PUT('ConcurrencyTest', null, concurrencyObject, {token:userToken, 'user-account':createdAccount.userAccount.id}, function(response){
                		  
                		console.log(response.body);//response.body.data
                	//console.log(response.body.data);//response.body.data
                		expect(response.error).to.be(null);
                		expect(response.body.data.count).to.be(1);
                		expect(response.body.data.versionUpdates[concurrencyObject.id]).to.be(1);
                		
                		callback(response.error);
 
               	 	});

                });
        	
        });
    });
    
    describe('test-check concurrency failed version number', function() {

        it('should fail updating ConcurrencyTest as we have an old systemVersion', function (callback) {

        	//we try update again - with the same 
    		restack_client.PUT('ConcurrencyTest', null, concurrencyObject, {token:userToken, 'user-account':createdAccount.userAccount.id}, function(response){
      		  
        		console.log(response.body);//response.body.data
        		expect(response.body.status).to.be('FAILED');
 
        		callback(response.error);
       		 
       	 	});
        	
        });
    });
    
    
    /*
    
	describe('test-harddelete-useraccounts', function() {

        it('should hard delete all objects of UserAccount', function (callback) {

        	restack_client.DELETE('UserAccount', {}, {"delete-type":"hard", token:userToken}, function(response){
        		
        		expect(response.error).to.be(null);
        		//console.log(response.body.data + ' UserAccounts deleted');
        		callback();
        		
        	});
        });
    });
    
    describe('test-harddelete-users', function() {

        it('should hard delete all objects of User', function (callback) {

        	restack_client.DELETE('User', {}, {"delete-type":"hard", token:userToken}, function(response){
        		
        		expect(response.error).to.be(null);
        		//console.log(response.body.data + ' Users deleted');
        		callback();
        		
        	});
        });
    });
    
    describe('test-harddelete-accounts', function() {

        it('should hard delete all objects of Account', function (callback) {

        	restack_client.DELETE('Account', {}, {"delete-type":"hard", token:userToken}, function(response){
        		
        		expect(response.error).to.be(null);
        		//console.log(response.body.data + ' Accounts deleted');
        		callback();
        		
        	});
        });
    });

*/

});
