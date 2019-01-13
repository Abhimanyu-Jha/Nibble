// FRONTEND SCRIPT JS FILE FOR NIBBLE

// const fetch = require('node-fetch');
// var mainarr;
$("#searchQuery").on('input',function(){
	function inside(arr,s)
	{
		for(i=0;i<arr.length;i++)
		{
			if(arr[i].toLowerCase()===s.toLowerCase())
			{
				return true;
			}
		}
		return false;
	}
	var value=$("#searchQuery").val();
	var arr=value.split(" ");
	var q="";
	var longitude=77.284218;
	var latitude=28.523520;
	for (i=0; i<arr.length; i++){
		if (i!=arr.length-1){	
			q+=arr[i]+"+";}
		else{
			q+=arr[i];
		}
	}
	fetch('https://developers.zomato.com/api/v2.1/search?q='+q+'&lat='+latitude+'&lon='+longitude, {
	        method: 'get',
	        headers: { 'Content-Type': 'application/json', 'user-key': '5cdc9aed20a04f2f6310c10ca2b7dfd84d85d015e7c7d33f1f4d85edd738bfbb' },

	})
	.then((res) => res.json())
	    .then(function(json){ 
	    	var mainarr=[];
	    	var myarr=json.restaurants;
	    	
	    	var i=0;
	    	while(i<myarr.length&&mainarr.length<5)
	    	{
	    		var rest=myarr[i];
	    		if(myarr[i]==null)
	    		{
	    			break;
	    		} 
	    		if(!inside(mainarr,rest.restaurant.name)) 
	    		{
	    			mainarr.push(rest.restaurant.name);
	    		}
	    		i++;
	    	}
	    	console.log(mainarr);
	    });
	    

});