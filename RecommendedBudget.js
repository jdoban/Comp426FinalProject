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


