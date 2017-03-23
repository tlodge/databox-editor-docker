var fs = require('fs');
var path =require('path');
var request= require('superagent');

var _saveToAppStore = function(store, manifest){
	request
  		.post(store + "/app/post")
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

if (process.argv.length < 4) {
        console.log("node recreateappstore  <manifestdirectory> <store eg: http://store.upintheclouds.org>");
        process.exit(1);
}

var dir = process.argv[2];
console.log("reading dir " + dir);
var store = process.argv[3];
console.log("writing to store");
console.log(store);

fs.readdir(dir, function(err, items) {
	items.filter(function(item){
	   return item.indexOf("json") != -1
	}).forEach(function(name){
	    
	    fs.readFile(dir+"/"+name, 'utf8', function (err,data) {
		var manifest = JSON.parse(data);
		console.log("sending manifest:");
		console.log(manifest);
		var data = {
			manifest: JSON.stringify(manifest),
										
			poster: JSON.stringify({
				username:'tlodge'
			}),
										
			postDate:  JSON.stringify((new Date()).toISOString()),
										
			queries: JSON.stringify(0),
		}; 
      		_saveToAppStore(store,data);
    	    });	
	});
});
