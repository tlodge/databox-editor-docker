var fs = require('fs');
var path =require('path');
var request= require('superagent');

var _saveToAppStore = function(manifest){
	request
  		.post("https://store.iotdatabox.com/app/post")
  		.send(manifest)
 		.set('Accept', 'application/json')
  		.type('form')
  		.end(function(err, res){
  			if (err){
  		        	console.log(err);
  			}else{
          		        return res.body;
  	 		}
  	 	})	
};

if (process.argv.length < 3) {
        console.log("node recreateappstore  <manifestdirectory>");
        process.exit(1);
}

var dir = process.argv[2];

console.log("reading dir " + dir);

fs.readdir(dir, function(err, items) {
	items.filter(function(item){
	   return item.indexOf("json") != -1
	}).forEach(function(name){
	    
	    fs.readFile(dir+"/"+name, 'utf8', function (err,data) {
		var manifest = JSON.parse(data);
		var data = {
			manifest: JSON.stringify(manifest),
										
			poster: JSON.stringify({
				username:'tlodge'
			}),
										
			postDate:  JSON.stringify((new Date()).toISOString()),
										
			queries: JSON.stringify(0),
		}; 
      		_saveToAppStore(data);
    	    });	
	});
});
