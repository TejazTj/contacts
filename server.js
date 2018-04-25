var mysql = require("mysql");
var express  = require("express")
var app = express();
const path = require('path')

app.use(express.static(path.resolve(__dirname + '/../client')))
//Database connection
app.use(function(req, res, next){
	req.contact = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'contact'
	});
	req.contact.connect()
	next();
});

app.get("/contacts",function(req,res){

	req.contact.query(`select * from contacts where name like '%${req.query.name}%'`,function(err,data){
		if (data.length) {
		var images = []
		data.forEach( function(d){
			if (!d.images)return
			images.push(`data:image/jpeg;base64,${d.images.toString("base64")}`)

		})

		res.send({name: data[0].name,
			phone: data[0].phone,
			email: data[0].email,
			images: images
		})
		

		}
	})
})

 //app.get('*', function(req, res) {
        //res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    //});



app.listen(8080, () => console.log('Server Started!!!!'))