//NODE MODULES
var fs = require("fs");
const express=require('express');
const fetch = require('node-fetch');
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
	// console.log(searchQuery);
	var longitude= details.longitude;
	// console.log(longitude);
	var latitude=details.latitude;
	// console.log(latitude);

	//FETCH API
	var minval=Number.MAX_VALUE;
	var finalname;
	var branch;
	var jsonData = {temp:"ok"};
	var arr=searchQuery.split(" ");
	var q="";
	for (i=0; i<arr.length; i++){
		if (i!=arr.length-1){
			q+=arr[i]+"+";}
		else{
			q+=arr[i];
		}
	}
	// console.log(q);
	//'https://developers.zomato.com/api/v2.1/search?q='+q+'&lat='+lat+'&lon='+long
	fetch('https://developers.zomato.com/api/v2.1/search?q='+q+'&lat='+latitude+'&lon='+longitude, {
	    method: 'get',
	    headers: { 'Content-Type': 'application/json', 'user-key': '5cdc9aed20a04f2f6310c10ca2b7dfd8' },

	})
	.then(res => res.json())
	.then(function(json){
		// EXTRACT NAME OF CLOSEST AND MOST RELVANT RESTAURANT
		function is_inside(s1,s2)
		{	s1=s1.toLowerCase();
			s2=s2.toLowerCase();

			s2=s2.replace(/[^a-zA-Z0-9 ]/g, "");
			s1=s1.replace(/[^a-zA-Z0-9 ]/g, "");
			return s2.includes(s1);
		}
		console.log(json);
		   var myarr=json.restaurants;
		   for (i=0;i<myarr.length;i++){
		   	var x=myarr[i];
		   	// console.log(x);
		   	var a=0;
		   	// console.log(x.restaurant.name.toLowerCase(),"blah");
		   	if (is_inside(searchQuery,x.restaurant.name)!=-1){
		   		a=Math.abs(latitude-x.restaurant.location.latitude)+Math.abs(longitude-x.restaurant.location.longitude);
		   		if (a<minval){
		   			minval=a;
		   			finalname=x.restaurant.name;
		   			branch=x.restaurant.location.locality;
		   		}
		   	}
		   }
		   console.log('OUTLET',finalname+' '+branch);
		return [finalname,branch];

		// return ['Burger Singh','Kalkaji'];
	}).then(function(finalname_branch){
		//SIDHANT AND AYAAN USE FILENAME FOR RESTERAUNT NAME AND BRANCH FOR LOCATION
		//
		var spawn = require("child_process").spawn;
		console.log('NAMES',finalname_branch[0],finalname_branch[1]);

		var process = spawn('python',["./main.py",finalname_branch[0],finalname_branch[1]]);

		process.stdout.on('data', function(data) {
	        jsonData = JSON.parse(data.toString());
	        console.log('jsonDATA',jsonData);
		});

		// return data={
		// 	restaurant_name:'Burger Singh',
		// 	location:'Kalkaji Mandir',
		// 	menu:{'Potato Crunch Burger':['description',['₹68','₹100']]},
		// 	links:['swiggy.com','zomato.com'],
		// 	photo_link:"http://www.dwarka21.com/uploads/images/burger-1.jpg"
		// };
		return jsonData;
	}).then((jsonData)=>{
		res.render('results',{data: jsonData})
	});

});


// app.get('/dev',function(req,res){
// 	// {club: req.params.club, dp:req.user.thumbnail }
// 	res.render('results',{data: ''});
// });


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
