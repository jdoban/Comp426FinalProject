$(document).ready(function (){

	var base_url = "https://wwwp.cs.unc.edu/Courses/comp426-f17/users/mtyndall/finalproject";

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
	var allDebt;
	var income;
	var totalSavings = 0;
	var transportation;
	var food;
	var utilities;
	var housing;
	var recreation;
	var personal;
	var insurance;
	var health;
	var other;
	var username;
	var totalDebt=0;

	$.ajax(base_url + "/FindRPByID.php/" + user_id,
		{type: "GET",
		dataType: "json",
		async: false,
		success: function(response, status, jqXHR) {
			transportation=response.Transportation;
			food=response.Food;
			utilities=response.Utilities;
			housing=response.Housing;
			recreation=response.Recreation;
			personal=response.Personal;
			insurance=response.Insurance;
			health=response.Health;
			other=response.Other;
		},
		error: function(jqXHR){
			console.log(jqXHR);
		}
	}
	)

	$.ajax(base_url + "/FindDebtByID.php/" + user_id,
		{type: "GET",
		dataType: "json",
		async: false,
		success: function(response, status, jqXHR) {
			console.log(response);
			allDebt=response;
		},
		error: function(jqXHR){
			console.log(jqXHR);
		}
	}
	)
	$.ajax(base_url + "/Users.php/" + user_id,
		{type: "GET",
		dataType: "json",
		success: function(response, status, jqXHR) {
			username=response.username;
			document.getElementById('welcome').innerHTML="Welcome, "+ username;

		},
		error: function(jqXHR){
			console.log(jqXHR);
		}
	}
	)
	$.ajax(base_url + "/Users.php/" + user_id,
		{type: "GET",
		async:false,
		dataType: "json",
		success: function(response, status, jqXHR) {
			income=response.income;
		},
		error: function(jqXHR){
			console.log(jqXHR);
		}
	}
	)
	$.ajax(base_url + "/FindSavingsByID.php/" + user_id,
		{type: "GET",
		async:false,
		dataType: "json",
		success: function(response, status, jqXHR) {
			console.log(response);
			totalSavings=response;
		},
		error: function(jqXHR){
			console.log(jqXHR);
		}
	}
	)

	for (var key in allDebt)
	{
		totalDebt+=allDebt[key];
	}

	var total_expenses = (housing+insurance+transportation+food+utilities+recreation+personal+health+totalDebt+other);
	var leftover = ((income/12)-total_expenses);

	document.getElementById("PHoN").innerHTML = "$" + housing.toFixed(2);
	document.getElementById("PIN").innerHTML = "$" + insurance.toFixed(2);

	document.getElementById("PTN").innerHTML = "$" + (total_expenses*1.7*((1-(housing/total_expenses)-(insurance/total_expenses)-(totalDebt/total_expenses))/9)).toFixed(2);
	document.getElementById("PFN").innerHTML = "$" + (total_expenses*2.1*((1-(housing/total_expenses)-(insurance/total_expenses)-(totalDebt/total_expenses))/9)).toFixed(2);
	document.getElementById("PUN").innerHTML = "$" + (total_expenses*1.05*((1-(housing/total_expenses)-(insurance/total_expenses)-(totalDebt/total_expenses))/9)).toFixed(2);
	document.getElementById("PRN").innerHTML = "$" + (total_expenses*.95*((1-(housing/total_expenses)-(insurance/total_expenses)-(totalDebt/total_expenses))/9)).toFixed(2);
	document.getElementById("PPN").innerHTML = "$" + (total_expenses*2.2*((1-(housing/total_expenses)-(insurance/total_expenses)-(totalDebt/total_expenses))/9)).toFixed(2);
	document.getElementById("PHeN").innerHTML = "$" + (total_expenses*1*((1-(housing/total_expenses)-(insurance/total_expenses)-(totalDebt/total_expenses))/9)).toFixed(2);
	document.getElementById("PDN").innerHTML = "$" + totalDebt.toFixed(2);
	document.getElementById("PlannedSum").innerHTML = "$" + total_expenses.toFixed(2);



	document.getElementById("PHoP").innerHTML = "(" + (100*(housing/total_expenses)).toFixed(2) + "%)";
	document.getElementById("PIP").innerHTML = "(" + (100*(insurance/total_expenses)).toFixed(2) + "%)";

	document.getElementById("PTP").innerHTML = "(" + (170*((1-(housing/total_expenses)-(insurance/total_expenses)-(totalDebt/total_expenses))/9)).toFixed(2) + "%)";
	document.getElementById("PFP").innerHTML = "(" + (210*((1-(housing/total_expenses)-(insurance/total_expenses)-(totalDebt/total_expenses))/9)).toFixed(2) + "%)";
	document.getElementById("PUP").innerHTML = "(" + (105*((1-(housing/total_expenses)-(insurance/total_expenses)-(totalDebt/total_expenses))/9)).toFixed(2) + "%)";
	document.getElementById("PRP").innerHTML = "(" + (95*((1-(housing/total_expenses)-(insurance/total_expenses)-(totalDebt/total_expenses))/9)).toFixed(2) + "%)";
	document.getElementById("PPP").innerHTML = "(" + (220*((1-(housing/total_expenses)-(insurance/total_expenses)-(totalDebt/total_expenses))/9)).toFixed(2) + "%)";
	document.getElementById("PHeP").innerHTML = "(" + (100*((1-(housing/total_expenses)-(insurance/total_expenses)-(totalDebt/total_expenses))/9)).toFixed(2) + "%)";
	document.getElementById("PDP").innerHTML = "(" + (100*(totalDebt/total_expenses)).toFixed(2) + "%)";

	if(leftover>1000)
	{
		document.getElementById("note").innerHTML = "Your current total savings is $" + totalSavings.toFixed(2) + " and you have plenty of money left over ($" + leftover.toFixed(2) + ") after accounting for monthly expenses. " +
		"It is recommended that you set aside $" + ((leftover*.2).toFixed(2)) + " - $" + ((leftover*.15).toFixed(2)) + " per month.";
	}
	else if(leftover>200)
	{
		document.getElementById("note").innerHTML = "Your current total savings is $" + totalSavings.toFixed(2) + " and you have some money left over ($" + leftover.toFixed(2) + ") after accounting for monthly expenses. " +
		"It is recommended that you set aside $" + ((leftover*.1).toFixed(2)) + " - $" + ((leftover*.05).toFixed(2)) + " per month.";
	}
	else if(leftover>=0)
	{
		document.getElementById("note").innerHTML = "Your current total savings is $" + totalSavings.toFixed(2) + " and you have little to no money left over ($" + leftover.toFixed(2) + ") after accounting for monthly expenses. " +
		"It is recommended that you set aside $" + ((leftover*.05).toFixed(2)) + " per month or keep this money for unexpected expenses.";
	}
	else
	{
		document.getElementById("note").innerHTML = "Your current total savings is $" + totalSavings.toFixed(2) + " and you have no money left over after accounting for monthly expenses. " +
		"You are losing $" + (leftover*-1).toFixed(2) + " per month, and it is highly recommended that you try to decrease your non-essential expenses immidiately!";
	}


	/*google.charts.load('current', {'packages':['corechart']});
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
        	['Transportation', total_expenses*1.7*((1-(housing/total_expenses)-(insurance/total_expenses)-(totalDebt/total_expenses))/9)],
        	['Food', total_expenses*2.1*((1-(housing/total_expenses)-(insurance/total_expenses)-(totalDebt/total_expenses))/9)],
        	['Utilities', total_expenses*1.05*((1-(housing/total_expenses)-(insurance/total_expenses)-(totalDebt/total_expenses))/9)],
        	['Housing', housing],
        	['Recreation', total_expenses*.95*((1-(housing/total_expenses)-(insurance/total_expenses)-(totalDebt/total_expenses))/9)],
        	['Personal', total_expenses*2.2*((1-(housing/total_expenses)-(insurance/total_expenses)-(totalDebt/total_expenses))/9)],
        	['Insurance', insurance],
        	['Health', total_expenses*1*((1-(housing/total_expenses)-(insurance/total_expenses)-(totalDebt/total_expenses))/9)],
        	['Debt', totalDebt]
        	]);
        // Set chart options
        var options = 
        {
        	'width':1000,
        	'height':400,
        	'title': 'Our Recommended Monthly Expense Breakdown',
        	'colors':['#2770e5', '#f23d1d', '#f29113', '#0a9930', '#690fad', '#1dcee5', '#d843a6', '#66e258', '#f70404']
        };
        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }*/

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
        var options = 
        {
        	'width':1000,
        	'height':400,
        	'title': 'Your Current Monthly Expense Breakdown',
        	'colors':['#2770e5', '#f23d1d', '#f29113', '#0a9930', '#690fad', '#1dcee5', '#d843a6', '#66e258', '#f70404']
        };
        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }

});
