// // FRONTEND SCRIPT JS FILE FOR NIBBLE

// // const fetch = require('node-fetch');
// // var mainarr;
// $("#searchQuery").on('input',function(){
// 	// var mainarr;
// 	console.log("blah");
// 	var value=$("#searchQuery").val();
// 	var arr=value.split(" ");
// 	var q="";
// 	var longitude=77.284218;
// 	var latitude=28.523520;
// 	for (i=0; i<arr.length; i++){
// 		if (i!=arr.length-1){	
// 			q+=arr[i]+"+";}
// 		else{
// 			q+=arr[i];
// 		}
// 	}
// 	fetch('https://developers.zomato.com/api/v2.1/search?q='+q+'&lat='+latitude+'&lon='+longitude, {
// 	        method: 'get',
// 	        headers: { 'Content-Type': 'application/json', 'user-key': '36da13412751dbe1d60d070e8b57be60' },

// 	})
// 	.then((res) => res.json())
// 	    .then(function(json){ 
// 	    	var mainarr=[];
// 	    	var myarr=json.restaurants;
// 	    	console.log('mainarr',mainarr);
// 	    	console.log('myarr',myarr);
// 	    	count=0;
// 	    	i=0;
// 	    	var temp=[];
// 	    	while (true && myarr.length!=0){
// 	    		if (count==5){
// 	    			console.log("breaking");
// 	    			break;
// 	    		}
// 	    		var x=myarr[i];
// 	    		if(x==null){
// 	    			console.log("donedone");
// 	    			break;
// 	    		}
// 	    		console.log('x',x);
// 	    		if (i==0){
// 	    			console.log(mainarr+"tring");
// 	    			mainarr.push(x.restaurant.name);
// 	    			temp.push(x.restaurant.name);
// 	    			count++;
// 	    		}
// 	    		else if (temp[i-1]!=x.restaurant.name){
// 	    			console.log(mainarr+"tringu");
// 	    			mainarr.push(x.restaurant.name);
// 	    			temp.push(x.restaurant.name);
// 	    			count++;
// 	    		}
// 	    		i++;


// 	    	}console.log(mainarr+"myaar");


	    
// 	    });
	    

// });