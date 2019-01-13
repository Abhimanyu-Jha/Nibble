//NODE MODULES
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
	    headers: { 'Content-Type': 'application/json', 'user-key': '36da13412751dbe1d60d070e8b57be60' },

	})
	.then(res => res.json())
	.then(function(json){ 
	    var myarr=json.restaurants;
	    for (i=0;i<myarr.length;i++){
	    	var x=myarr[i];
	    	// console.log(x);
	    	var a=0;
	    	// console.log(x.restaurant.name.toLowerCase(),"blah");
	    	if (x.restaurant.name.toLowerCase()==searchQuery){
	    		
	    		a=Math.abs(latitude-x.restaurant.location.latitude)+Math.abs(longitude-x.restaurant.location.longitude);
	    		if (a<minval){
	    			minval=a;
	    			finalname=x.restaurant.name;
	    			branch=x.restaurant.location.locality;
	    		}
	    	}
	    }
	    // console.log(finalname+' '+branch);
	});




	data={
		'restaurant-name':'Burger Singh',
		'location':'Kalkaji Mandir',
		'menu':{'Potato Crunch Burger':['description',['₹68','₹100']]},
		'links':['swiggy.com','zomato.com'],
		'photo-link':'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/wkk9tk1udabalhibu0og'
	};

	//THIS SHOULD BE AT THE END
	res.render('results',{data: data});

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