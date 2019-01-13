// FRONTEND SCRIPT JS FILE FOR NIBBLE

// const fetch = require('node-fetch');
// var mainarr;
$("#searchQuery").on('input',function(){
	console.log("blah");
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
	        headers: { 'Content-Type': 'application/json', 'user-key': '4d85d015e7c7d33f1f4d85edd738bfbb' },

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
	    	while(mainarr.length<5)
	    	{
	    		mainarr.push('');
	    	}
	    	j=0;
	    	y=document.getElementById("list_menu");
	    	if ($("#searchQuery").val()==''){
	    		console.log("khaali");
	    		y.style.display="none";
	    	}
	    	
	    	while(j<5)
	    	{
	    		id="i"+j;
	    		x=document.getElementById(id);
	    		
	    		x.innerHTML=mainarr[j];
	    		if (x.innerHTML==''){
	    			x.style.display="none";
	    			console.log("blank value"+j);
	    		}
	    		else{
	    			x.style.display="block";
	    			y.style.display="block";
	    			if ($("#searchQuery").val()==''){
			    		console.log("khaali");
			    		y.style.display="none";
			    	}
	    		}
	    		j++;
	    	}

	    });
	    

});