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

	var total_expenses = (housing+insurance+transportation+food+utilities+recreation+personal+health+totalDebt+other);
	var total_expenses2 = (housing+insurance+transportation+food+utilities+recreation+personal+health+totalDebt+other);

    document.getElementById("PHoN").innerHTML = "$" + housing;
    document.getElementById("PIN").innerHTML = "$" + insurance;

    document.getElementById("PSN").innerHTML = "$" + (income-total_expenses)/2;

    document.getElementById("PTN").innerHTML = "$" + transportation;
    document.getElementById("PFN").innerHTML = "$" + food;
    document.getElementById("PUN").innerHTML = "$" + utilities;
    document.getElementById("PRN").innerHTML = "$" + recreation;
    document.getElementById("PPN").innerHTML = "$" + personal;
    document.getElementById("PHeN").innerHTML = "$" + health;
    document.getElementById("PDN").innerHTML = "$" + totalDebt;
    document.getElementById("PlannedSum").innerHTML = "$" + total_expenses;

    

    document.getElementById("PHoP").innerHTML = "(" + 100*(housing/total_expenses) + "%)";
    document.getElementById("PIP").innerHTML = "(" + 100*(insurance/total_expenses) + "%)";

    document.getElementById("PSP").innerHTML = "(" + ((income-total_expenses)/2)/(((income-total_expenses)/2)+total_expenses) "%)";

    document.getElementById("PTP").innerHTML = "(" + 200*((1-(housing/total_expenses)-(insurance/total_expenses))/9) + "%)";
    document.getElementById("PFP").innerHTML = "(" + 200*((1-(housing/total_expenses)-(insurance/total_expenses))/9) + "%)";
    document.getElementById("PUP").innerHTML = "(" + 100*((1-(housing/total_expenses)-(insurance/total_expenses))/9) + "%)";
    document.getElementById("PRP").innerHTML = "(" + 100*((1-(housing/total_expenses)-(insurance/total_expenses))/9) + "%)";
    document.getElementById("PPP").innerHTML = "(" + 200*((1-(housing/total_expenses)-(insurance/total_expenses))/9) + "%)";
    document.getElementById("PHeP").innerHTML = "(" + 100*((1-(housing/total_expenses)-(insurance/total_expenses))/9) + "%)";
    document.getElementById("PDP").innerHTML = "(" + 100*(totalDebt/total_expenses) + "%)";



google.charts.load('current', {'packages':['corechart']});
      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);
      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Attribute');
        data.addColumn('number', 'Percentage');
        data.addRows([
        	['Savings', ((income-total_expenses)/2)],
        	['Transportation', transportation],
        	['Food', food],
        	['Utilities', utilities],
        	['Housing', housing],
        	['Recreation', recreation],
        	['Personal', personal],
        	['Insurance', insurance],
        	['Health', health],
        	['Debt', totalDebt]
        	]);
        // Set chart options
        var options = {'width':1000,
        'height':400};
        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }

	


}
);