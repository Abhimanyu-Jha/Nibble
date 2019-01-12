//NODE MODULES
const express=require('express');
const bodyParser = require('body-parser');
const app=express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// Start Express


//SERVING STATIC CONTENT
app.use('/css',express.static('css'));
app.use('/js',express.static('js'));
app.use('/images',express.static('images'));
app.use('/',express.static(__dirname));
app.use(bodyParser.json());

//SETTING THE VIEW ENGINE
app.set('view engine','ejs');

//SERVING HTML PAGES
app.get('/',function(req,res){
	// {club: req.params.club, dp:req.user.thumbnail }
	res.render('index',{club: '', dp:'' });
	
	
	

});
app.post('/search',urlencodedParser,(req,res)=>{
	var details=req.body;

	//SEARCH QUERY "q"
	searchQuery= details.searchQuery;
	longitude= details.longitude;
	latitude= details.latitude;
	

	//FETCH API







	//THIS SHOULD BE AT THE END
	res.render('results',{searchQuery: searchQuery, dp:'dp' });

});





// 404 if no other route
// THIS ROUTE SHOULD BE AT THE END OF THE FILE
app.use(function (req, res) {
  res.status(404).sendFile(__dirname+'/404.html');
})

// gets local IP
const ip = require("ip"); 
var port = process.env.PORT || 8000

app.listen(port, function() {
	console.log('Running now on ' + ip.address() + ":" + port);
});