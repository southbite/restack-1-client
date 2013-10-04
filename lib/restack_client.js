var restack_client = {
	request:require('request'),
	querystring:require('querystring'),
	options:{},
	session:{},
	parseJSON:function(b){
		try
		{
			if (b != null && b != undefined)
			{
				return JSON.parse(b);
			}
			else 
				throw 'b is null';
		}
		catch(e)
		{
			return b;
		}
	},
	requestURL:function(area, type, criteria){
		var api_url = this.getOption('api_url') + '/' + area + '/' + type;
		
		if (criteria != null)
			api_url += "?" + this.querystring.stringify(criteria);
		
		console.log('got request url: ' + api_url);
		
		return api_url;
		
	},
	requestHeaders:function(headers, appendAuthHeaders){
		//for now return options, but we will want to add session info for security to auth headers
		//use appendAuthHeaders to add header items
		
		var returnHeaders = {};
		
		if (headers != null)
			for (var headerProperty in headers)
				returnHeaders[headerProperty] = headers[headerProperty];
		
		return returnHeaders;
	},
	getOption:function(optionName){
		if (this.options[optionName] == undefined)
			throw('Option ' + optionName + ' not configured');
		else
			return this.options[optionName];
	},
	initialize:function(options, done){
		try
		{
			for (var optionName in options)
				this.options[optionName] = options[optionName];
			
			if (options['login'])
				this.login(this.getOption('username'), this.getOption('password'), done);
			else
				done();
		}
		catch(e)
		{
			done(e);
		}
			
	},
	login:function(username, password, done){
		
	},
	GET:function(area, type, criteria, headers, done){
		console.log('doing get with headers');
		console.log(this.requestHeaders(headers));
		this.request(
				{uri:this.requestURL(area, type, criteria),
				 method:'GET',
				 headers:this.requestHeaders(headers)
				}, 
				function(e, r, b){
					done({error:e, response:r, body:this.parseJSON(b)});
				}.bind(this));
	},
	PUT:function(area, type, criteria, data, headers, done){
		this.request(
				{uri:this.requestURL(area, type, criteria),
				 method:'PUT',
				 headers:this.requestHeaders(headers),
				 json:data
				}, 
				function(e, r, b){
					done({error:e, response:r, body:this.parseJSON(b)});
				}.bind(this));
	},
	POST:function(area, type, data, headers, done){
		
		console.log(this);
		console.log('doing post');
		
		this.request(
				{uri:this.requestURL(area, type),
				 method:'POST',
				 headers:this.requestHeaders(headers),
				 json:data
				}, 
				function(e, r, b){
					console.log('got response');
					done({error:e, response:r, body:this.parseJSON(b)});
				}.bind(this));
	},
	DELETE:function(area, type, criteria, headers, done){
		this.request(
				{uri:this.requestURL(area, type, criteria),
				 method:'DELETE',
				 headers:this.requestHeaders(headers)
				}, 
				function(e, r, b){
					done({error:e, response:r, body:this.parseJSON(b)});
				}.bind(this));
	}
	
}

module.exports = restack_client;