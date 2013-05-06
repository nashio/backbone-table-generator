// DEPENDENCIES
// ============
var express = require("express"),
    port = (process.env.PORT || 8001),
    server = module.exports = express(),
    data = require("./data.js"),
		app = express();


// SERVER CONFIGURATION
// ====================


app.use(express.static(__dirname + '/../public'));
app.use(express.bodyParser());
// ROUTE



app.get("/data", function( req, res ){	
	var obj = { rows : [] };
	var limit = data.config.limit;
	var page = req.query.page || data.config.page;
	var start = (page*limit) - limit;
	var end = (Number(start) + Number(limit) ) -1;
	var total = Math.ceil(data.rows.length/limit);

	// add rows 
	if( page <= total ){
		for(var i = start; i <= end; i++){
			obj.rows.push(data.rows[i]);
		}		
	}

	// add config
	obj.config = data.config;
	obj.config.total = total;
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify( obj ));
});



// SERVER
// ======

// Start Node.js Server
app.listen(3001);
console.log('Express server started on port %s', 3001);





