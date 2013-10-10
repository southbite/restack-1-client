var restack_client = require('../lib/restack_client');
var expect = require('expect.js');

describe('client-tests', function() {

    before(function(callback) {
    	restack_client.initialize({api_url:'http://localhost:7777'}, function(e){
    		callback(e);
    	});
    });

    var createdId = null;
    
    describe('test-validation', function() {

        it('should check validation constraints for User', function(callback) {

            var user = {
                emailaddress: 'test@example.com',
               // username: 'test@example.com',
                password: 'whatevs',
                firstname: 'name',
                lastname: 'surname'
            };

            //POST:function(area, type, data, headers, done){
            restack_client.POST('data', 'User', user, null, function(response){
            	
            	console.log(response.body);
            	expect(response.error).to.be(null);
            	expect(response.body.status).to.be('FAILED');
            	expect(response.body.data.checks.length > 0).to.be(true);	
            	
            	for (var checkIndex in response.body.data.checks)
            	{
            		var checkInstance = response.body.data.checks[checkIndex];
            		console.log('checkInstance');
            		console.log(checkInstance);
            	}
            	
            	user.username = 0;
            	
            	//check type constraint validation
            	restack_client.POST('data', 'User', user, null, function(response){
            	
            		expect(response.body.status).to.be('FAILED');
                	expect(response.body.data.checks.length > 0).to.be(true);	
            		
                	for (var checkIndex in response.body.data.checks)
                	{
                		var checkInstance = response.body.data.checks[checkIndex];
                		console.log('checkInstance');
                		console.log(checkInstance);
                	}
                	
                	callback();
                	
            	});
            	
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
    

});
