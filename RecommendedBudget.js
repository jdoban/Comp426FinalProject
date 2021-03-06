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
var income=0;
var allSavings=0;
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
		       dataType: "json",
		       success: function(response, status, jqXHR) {
             allSavings=response;
		       },
		       error: function(jqXHR){
		       	console.log(jqXHR);
		       }
           }
       )
	for (var key in allDebt){
		totalDebt+=allDebt[key];
}

    	
    document.getElementById("PHoN").innerHTML = housing;

	var total_expenses = (housing+insurance+transportation+food+utilities+recreation+personal+health+totalDebt+other);

    document.getElementById("PHoN").innerHTML = "$" + housing.toFixed(2);
    document.getElementById("PIN").innerHTML = "$" + insurance.toFixed(2);

    document.getElementById("PTN").innerHTML = "$" + (total_expenses*2*((1-(housing/total_expenses)-(insurance/total_expenses))/9)).toFixed(2);
    document.getElementById("PFN").innerHTML = "$" + (total_expenses*2*((1-(housing/total_expenses)-(insurance/total_expenses))/9)).toFixed(2);
    document.getElementById("PUN").innerHTML = "$" + (total_expenses*1*((1-(housing/total_expenses)-(insurance/total_expenses))/9)).toFixed(2);
    document.getElementById("PRN").innerHTML = "$" + (total_expenses*1*((1-(housing/total_expenses)-(insurance/total_expenses))/9)).toFixed(2);
    document.getElementById("PPN").innerHTML = "$" + (total_expenses*2*((1-(housing/total_expenses)-(insurance/total_expenses))/9)).toFixed(2);
    document.getElementById("PHeN").innerHTML = "$" + (total_expenses*1*((1-(housing/total_expenses)-(insurance/total_expenses))/9)).toFixed(2);
    document.getElementById("PDN").innerHTML = "$" + totalDebt.toFixed(2);
    document.getElementById("PlannedSum").innerHTML = "$" + total_expenses.toFixed(2);

    

    document.getElementById("PHoP").innerHTML = "(" + (100*(housing/total_expenses)).toFixed(2) + "%)";
    document.getElementById("PIP").innerHTML = "(" + (100*(insurance/total_expenses)).toFixed(2) + "%)";

    document.getElementById("PTP").innerHTML = "(" + (200*((1-(housing/total_expenses)-(insurance/total_expenses))/9)).toFixed(2) + "%)";
    document.getElementById("PFP").innerHTML = "(" + (200*((1-(housing/total_expenses)-(insurance/total_expenses))/9)).toFixed(2) + "%)";
    document.getElementById("PUP").innerHTML = "(" + (100*((1-(housing/total_expenses)-(insurance/total_expenses))/9)).toFixed(2) + "%)";
    document.getElementById("PRP").innerHTML = "(" + (100*((1-(housing/total_expenses)-(insurance/total_expenses))/9)).toFixed(2) + "%)";
    document.getElementById("PPP").innerHTML = "(" + (200*((1-(housing/total_expenses)-(insurance/total_expenses))/9)).toFixed(2) + "%)";
    document.getElementById("PHeP").innerHTML = "(" + (100*((1-(housing/total_expenses)-(insurance/total_expenses))/9)).toFixed(2) + "%)";
    document.getElementById("PDP").innerHTML = "(" + (100*(totalDebt/total_expenses)).toFixed(2) + "%)";

    document.getElementById("note").innerHTML = "Your current total savings is $" + allSavings.toFixed(2) + ". It is recommended that you set aside 15% of your monthly income";



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
        	['Transportation', total_expenses*2*((1-(housing/total_expenses)-(insurance/total_expenses))/9)],
        	['Food', total_expenses*2*((1-(housing/total_expenses)-(insurance/total_expenses))/9)],
        	['Utilities', total_expenses*1*((1-(housing/total_expenses)-(insurance/total_expenses))/9)],
        	['Housing', housing],
        	['Recreation', total_expenses*1*((1-(housing/total_expenses)-(insurance/total_expenses))/9)],
        	['Personal', total_expenses*2*((1-(housing/total_expenses)-(insurance/total_expenses))/9)],
        	['Insurance', insurance],
        	['Health', total_expenses*1*((1-(housing/total_expenses)-(insurance/total_expenses))/9)],
        	['Debt', totalDebt]
        	]);
        // Set chart options
        var options = {'width':1000,
        'height':400};
        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }

});
