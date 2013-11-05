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
   
    it('should create the test User', function(callback) {

    	this.timeout(10000);
    	
        var user = {
            emailaddress: 'southbite@gmail.com',
            username: 'User ' + uniqueTestKey,
            secret: uniqueTestKey,
            names: 'Simon Bishop'
        };

        restack_client.POST('User', user, {"return-confirm-key":"true"}, function(response){
        	
        	//console.log(response.body);
        	expect(response.error).to.be(null);
        	expect(response.body.data.length).to.be(1);
        	createdUser = response.body.data[0];
        	
        	callback(response.error);
        	
        }.bind(this)); 

    });
 

    it('should confirm user', function(callback) {
    	
    	console.log(createdUser);
    	
    	restack_client.GET('User', {confirmKey:createdUser.confirmKey}, {}, function(response){
    		expect(response.error).to.be(null);
    		expect(response.body.data[0].status).to.be('Confirmed');//cool we are confirmed
    		
    		callback();
    		
    	}.bind(this));
    	
    });
    

    it('should log in', function(callback) {
    	
    	restack_client.POST('Login', {secret:uniqueTestKey, username:createdUser.username}, {}, function(response){
			expect(response.error).to.be(null);
			expect(response.body.data[0].token.length > 0).to.be(true);
			userToken = response.body.data[0].token;
			
			console.log('logged in and have token ' + response.body.data[0].token);
			
			callback();
			
		}.bind(this));
    	
    });

    
    it('should create the test Account', function(callback) {

        var account = {
        	name: 'Account ' + uniqueTestKey,
        	description: 'Test Account ' + uniqueTestKey
        };

        restack_client.POST('Account', account, {token:userToken}, function(response){
        	
        	console.log(response.body);
        	expect(response.error).to.be(null);
        	createdAccount = response.body.data;
        	
        	callback(response.error);
        	
        });

    });
    
    /*
    
	describe('test-harddelete-useraccounts', function() {

        it('should hard delete all objects of UserAccount', function (callback) {

        	restack_client.DELETE('UserAccount', {}, {"delete-type":"hard", token:userToken}, function(response){
        		
        		expect(response.error).to.be(null);
        		console.log(response.body.data + ' UserAccounts deleted');
        		callback();
        		
        	});
        });
    });
    
    describe('test-harddelete-users', function() {

        it('should hard delete all objects of User', function (callback) {

        	restack_client.DELETE('User', {}, {"delete-type":"hard", token:userToken}, function(response){
        		
        		expect(response.error).to.be(null);
        		console.log(response.body.data + ' Users deleted');
        		callback();
        		
        	});
        });
    });
    
    describe('test-harddelete-accounts', function() {

        it('should hard delete all objects of Account', function (callback) {

        	restack_client.DELETE('Account', {}, {"delete-type":"hard", token:userToken}, function(response){
        		
        		expect(response.error).to.be(null);
        		console.log(response.body.data + ' Accounts deleted');
        		callback();
        		
        	});
        });
    });

*/

});
