$(document).ready(function (){


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

var getUser=function(user){
	var name= user+"=";
	var decodedCookie=decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i=0;i<ca.length;i++){
		var c=ca[i];
		while(c.charAt(0)==' '){
			c=c.substring(1);
		}
		if(c.indexOf(name)==0){
			return c.substring(name.length, c.length);
		}
	} 
	return "";
}
var user_id=getUser("user");

});
