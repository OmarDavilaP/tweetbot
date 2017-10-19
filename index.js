var conf = require('./configuration.js');

console.log("The bot is running");
var Twit = require('twit');

var T = new Twit(conf);

var groseria=[{'palabra':'cristiano'},{'palabra':'malo'}];

/*T.post('statuses/update', { status: 'vamos rayos #Necaxa' }, function(err, data, response) {
	if(err){
		console.log(err);
		console.log(response);
	}else{
		console.log(data);
	}
  
});*/

T.get('search/tweets', { q: 'Real Madrid since:2017-10-18', count: 100 }, function(err, data, response) {
	if(err){
		console.log(err);
	}else{
	  for(var i=0;i<data.statuses[i].text.length;i++){
	  		//console.log(data.statuses[i].text);
	  		var message=data.statuses[i].text.split(" ");
	  	    for(var ii=0;ii<message.length;ii++){
	  	    	var result=groseria.map(function(data){ return data.palabra; }).indexOf(message[ii].toLowerCase()); 
	  	    	if(result!==-1){
					  console.log("id"+data.statuses[i].id);
					  console.log("user: @"+data.statuses[i].user.screen_name);
					  console.log("Message: ",data.statuses[i].text);
					  console.log("-------------------------------");	
		  		      retweet(data.statuses[i].id_str);
	  	    	}
	  	    	}

	  	    }
	  	 }

	});

function retweet(rId){

T.post('statuses/retweet', { id: rId }, function(err, data, response) {
	if(err){
		console.log(err);
	}else{
		console.log(data);
	}
  
});

}