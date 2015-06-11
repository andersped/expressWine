var express = require("express"),
	app = express(),
	methodOverride = require("method-override"),
	bodyParser = require("body-parser");

var morgan = require("morgan");
app.use(morgan("tiny"));

var db = require("./models")

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({enteded:true}));
app.use(methodOverride('_method'));

/************Start App**************/
console.log(bodyParser);
console.log(methodOverride);

app.get("/", function(req,res){
	res.redirect("/wines")
});

app.get("/wines", function(req,res){
	db.Wine.find({}, function(err, wines){
		if(err){
			console.log(err)
		} else{
			res.render('index', {wines:wines})
		}
	})
});

app.get("/wines/new", function(req,res){
	res.render('new');
});

app.post("/wines", function(req,res){
	console.log("In the create route")
	console.log(req.body)
	db.Wine.create(req.body.wines, function(err,wine){
		if(err){
			console.log(err)
		} else{
			res.redirect("/wines")
		}
	})
})

app.get("/wines/:id", function(req,res){
	db.Wine.findById(req.params.id, function(err, wine){
		if(err){
			console.log(err)
		} else{
			res.render('show', {wine:wine})
		}
	})
});

app.get("/wines/:id/edit", function(req,res){
	db.Wine.findById(req.params.id, function(err, wine){
		if(err){
			console.log(err)
		} else{
			res.render("edit", {wine:wine})
		}
	})
});

app.put("wines/:id", function(req,res){
	db.Wine.findByIdAndUpdate(req.param.id, req.body.wines, function(err, wine){
		if(err){
			console.log(err)
		} else{
			res.redirect("/wines")
		}
	})
});

app.delete("/wines/:id", function(req,res){
	db.Wine.findByIdAndRemove(req.params.id, function(err, wine){
		if(err){
			console.log(err)
		} else{
			res.redirect("/wines");
		}
	})
});

app.get('*', function(req,res){
	res.redirect("/wines")
});



app.listen(3000, function(){
	'Server is listening on port 3000'
});