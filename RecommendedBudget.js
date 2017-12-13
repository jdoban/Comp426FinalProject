$(document).ready(function ()
{

	var base_url = "https://wwwp.cs.unc.edu/Courses/comp426-f17/users/mtyndall/finalproject";

	function PlannedFunction() 
	{
		var x = document.getElementById("PlannedEvent");
		var y = document.getElementById("SpentEvent");
		var z = document.getElementById("RemainingEvent");
		if (x.style.display === "none") 
		{
			x.style.display = "block";
			y.style.display = "none";
			z.style.display = "none";
		} 
	}

	function SpentFunction() 
	{
		var x = document.getElementById("PlannedEvent");
		var y = document.getElementById("SpentEvent");
		var z = document.getElementById("RemainingEvent");
		if (y.style.display === "none") 
		{
			x.style.display = "none";
			y.style.display = "block";
			z.style.display = "none";
		} 
	}

	function RemainingFunction() 
	{
		var x = document.getElementById("PlannedEvent");
		var y = document.getElementById("SpentEvent");
		var z = document.getElementById("RemainingEvent");
		if (z.style.display === "none") 
		{
			x.style.display = "none";
			y.style.display = "none";
			z.style.display = "block";
		} 
	}

	var getUser=function(user)
	{
		var name= user+"=";
		var decodedCookie=decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i=0;i<ca.length;i++)
		{
			var c=ca[i];
			while(c.charAt(0)==' ')
			{
				c=c.substring(1);
			}
			if(c.indexOf(name)==0)
			{
				return c.substring(name.length, c.length);
			}
		} 
		return "";
	}
	
	var user_id=getUser("user");

	var all_recurring_payments;

	$.ajax(base_url + "/FindRPByID.php/" + user_id,
	{
		type: "GET",
		dataType: "json",

		success: function(response, status, jqXHR) 
		{
			console.log(JSON.stringify(response));
			all_recurring_payments=response;
		}
	}
	)

	function PHoN() 
	{
    	document.getElementById("PHoN").innerHTML = housing;
	}


}
);