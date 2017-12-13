$(document).ready(function (){

var k=0;
var l=0;
var f=0;
var a=0;
var base_url = "https://wwwp.cs.unc.edu/Courses/comp426-f17/users/mtyndall/finalproject";
var username;
var password;
var user_id;

$("#addAnotherLoan").on('click', function(e){
addAnotherLoan();
});

$("#addAnotherPayment").on('click', function(e){
addAnotherPayment();
});

$("#addAnotherSavings").on('click', function(e){
addAnotherSavings();
});

$("#addAnotherIncome").on('click', function(e){
addAnotherIncome();
});

$("#registerForm").on('submit', function(e){
register(e);
});

$("#submitDebts").on('click', function(e){
  submit(e);
});

//Use submit instead of click for forms so we can serialize the data with jquery
$("#login_form").on('submit', function(e){
  login(e);
});
/*
$("#loginSubmit").on('click', function(e){
login(e);
});
*/

$('input:radio[name="consistent0"]').change(
	function(){
		if($(this).is(':checked') && $(this).val()=='inconsistent'){
			hideConsistent();
		}
	});

$('input:radio[name="consistent0"]').change(
	function(){
		if($(this).is(':checked') && $(this).val()=='consistent'){
			showConsistent();
		}
	});

var addAnotherLoan =function(){
	var original=document.getElementById('firstLoan' + k);
	var clone=original.cloneNode(true);
	clone.id= "firstLoan" + ++k; ++j;
	var loan= document.getElementById('first-debt');
	var loans=loan.cloneNode(true);
	var j =k+1;
	loans.innerHTML="Loan "+ j+".";
	original.parentNode.appendChild(loans);
	original.parentNode.appendChild(clone);
	$("#firstLoan"+k).find("#debtForm"+ (k-1)).attr("id", "debtForm"+k);
	$("#debtForm"+k).find("#inputPrincipal"+(k-1)).attr("id", "inputPrincipal"+k);
	$("#debtForm"+k).find("#inputTerm"+(k-1)).attr("id", "inputTerm"+k);
	$("#debtForm"+k).find("#inputName"+(k-1)).attr("id", "inputName"+k);
	$("#debtForm"+k).find("#inputAIR"+(k-1)).attr("id", "inputAIR"+k);
	$("#debtForm"+k).find("#inputPmts"+(k-1)).attr("id", "inputPmts"+k);
	$("#debtForm"+k).find("#inputType"+(k-1)).attr("id", "inputType"+k);

	var addButton = document.getElementById('addAnotherLoan');
	clone.parentNode.appendChild(addButton);

	children= clone.children;
	children[0].reset();
}


var addAnotherPayment =function(){
	var original1=document.getElementById('firstPayment' + l);
	var clone1=original1.cloneNode(true);
	clone1.id= "firstPayment" + ++l; ++m;
	var loan1= document.getElementById('firstRecurring');
	var loans1=loan1.cloneNode(true);
	var m =l+1;
	loans1.innerHTML="Payment "+ m+".";
	original1.parentNode.appendChild(loans1);
	original1.parentNode.appendChild(clone1);
	$("#firstPayment"+l).find("#paymentForm"+ (l-1)).attr("id", "paymentForm"+l);
	$("#paymentForm"+l).find("#inputRecurringName"+(l-1)).attr("id", "inputRecurringName"+l);
	$("#paymentForm"+l).find("#inputRecurringAmount"+(l-1)).attr("id", "inputRecurringAmount"+l);
	$("#paymentForm"+l).find("#inputRecurringPmts"+(l-1)).attr("id", "inputRecurringPmts"+l);


	var addButton1 = document.getElementById('addAnotherPayment');
	clone1.parentNode.appendChild(addButton1);

	children1= clone1.children;
	children1[0].reset();
}

var addAnotherSavings =function(){
	var original1=document.getElementById('firstSavings' + f);
	var clone1=original1.cloneNode(true);
	clone1.id= "firstSavings" + ++f; ++e;
	var loan1= document.getElementById('firstSavings');
	var loans1=loan1.cloneNode(true);
	var e =f+1;
	loans1.innerHTML="Source "+ e+".";
	original1.parentNode.appendChild(loans1);
	original1.parentNode.appendChild(clone1);
	$("#firstSavings"+f).find("#savingsForm"+ (f-1)).attr("id", "savingsForm"+f);
	$("#savingsForm"+f).find("#inputSavingsName"+(f-1)).attr("id", "inputSavingsName"+f);
	$("#savingsForm"+f).find("#inputSavingsAmount"+(f-1)).attr("id", "inputSavingsAmount"+f);
	$("#savingsForm"+f).find("#consistent"+(f-1)).attr("id", "consistent"+f);
	$("#savingsForm"+f).find("#consistent"+ f).attr("name", "consistent"+f);
	$("#savingsForm"+f).find("#inconsistent"+(f-1)).attr("id", "inconsistent"+f);
	$("#savingsForm"+f).find("#inconsistent"+f).attr("name", "consistent"+f);
	$("#savingsForm"+f).find("#inputSavingsAIR"+(f-1)).attr("id", "inputSavingsAIR"+f);
	$("#savingsForm"+f).find("#inputSavingsPmts"+(f-1)).attr("id", "inputSavingsPmts"+f);
	$("#savingsForm"+f).find("#inputSavingsType"+(f-1)).attr("id", "inputSavingsType"+f);


	var addButton1 = document.getElementById('addAnotherSavings');
	clone1.parentNode.appendChild(addButton1);
	var radioName="consistent"+f;
	children1= clone1.children;
	children1[0].reset();

	$('input:radio[name='+radioName+']').change(
	function(){
		if($(this).is(':checked') && $(this).val()=='inconsistent'){
			hideConsistent();
		}
	});

	$('input:radio[name='+radioName+']').change(
	function(){
		if($(this).is(':checked') && $(this).val()=='consistent'){
			showConsistent();
		}
	});
}

var addAnotherIncome =function(){
	var original1=document.getElementById('firstIncome' + a);
	var clone1=original1.cloneNode(true);
	clone1.id= "firstIncome" + ++a; ++b;
	var loan1= document.getElementById('firstIncome');
	var loans1=loan1.cloneNode(true);
	var b =a+1;
	loans1.innerHTML="Income "+ b+".";
	original1.parentNode.appendChild(loans1);
	original1.parentNode.appendChild(clone1);
	$("#firstIncome"+a).find("#incomeForm"+ (a-1)).attr("id", "incomeForm"+a);
	$("#incomeForm"+a).find("#inputIncomeName"+(a-1)).attr("id", "inputIncomeName"+a);
	$("#incomeForm"+a).find("#inputIncomeAmount"+(a-1)).attr("id", "inputIncomeAmount"+a);
	$("#incomeForm"+a).find("#inputIncomePmts"+(a-1)).attr("id", "inputIncomePmts"+a);


	var addButton1 = document.getElementById('addAnotherIncome');
	clone1.parentNode.appendChild(addButton1);

	children1= clone1.children;
	children1[0].reset();
}


var register=function(e){
var pass=document.getElementById("pass").value;
var pass1=document.getElementById("pass1").value;
var checkPass = (pass==pass1)
if(checkPass==false){
	e.preventDefault();
	document.getElementById('passwordCheck').innerHTML="Your passwords do not match. Please try again.";
	document.getElementById('registerForm').reset();
}
else{
	e.preventDefault();
	document.getElementById('pass1').remove();

	$.ajax({
			url: base_url + "/Users.php/",
	       type: "POST",
		       data: $('#registerForm').serialize(),
		       success: function(response) {
             	console.log(response);
              username = $('#username').val();
              password = $('#pass').val();
              user_id = response.id;
              console.log(user_id);
              document.getElementById('registerButton').style.display="none";
			document.getElementById('loginButton').style.display="none";
              document.getElementById('welcome').innerHTML="Welcome, "+ username;


             },
		error: function(xhr){console.log("nope");}

});
	

}
}

var login=function(e){
  e.preventDefault();
  var login_array = {username: $("#login_username").val(), password: $("#login_password").val()};
  console.log(login_array);
  console.log(JSON.stringify(login_array));
  console.log($('#login_form').serialize());

  //This works
  $.ajax(base_url + "/Users.php/",
	       {type: "GET",
		       dataType: "json",
           data: $('#login_form').serialize(),
		       success: function(response, status, jqXHR) {
             console.log("valid id");
             console.log(response);
             username = response.username;
             password = response.password;
             user_id = response.id;
             document.getElementById('registerButton').style.display="none";
			document.getElementById('loginButton').style.display="none";
			document.getElementById('welcome').innerHTML="Welcome, "+ username;
		       },
           error: function(exception){
             alert('Invalid username or password');
           }
     })

}
	$("#savingsForm"+f).find("#inputSavingsType"+(f-1)).attr("id", "inputSavingsType"+f);

var hideConsistent=function(){
var inconsistents =document.getElementsByClassName('inconsistentRadio');
for(z=0;z<inconsistents.length;z++){
	if(inconsistents[z].checked){
		var consistents=inconsistents[z].id.slice(12);
		var consistentArray=$("#savingsForm"+consistents).find(".consistent");
		for(y=0;y<consistentArray.length;y++){
		consistentArray[y].style.display="none";
		}
	}
}
}


var showConsistent=function(){
var inconsistents =document.getElementsByClassName('consistentRadio');
for(x=0;x<inconsistents.length;x++){
	if(inconsistents[x].checked){
		var consistents=inconsistents[x].id.slice(10);
		var consistentArray=$("#savingsForm"+consistents).find(".consistent");
		for(u=0;u<consistentArray.length;u++){
		consistentArray[u].style.display="block";
		}
	}
}
}

var submit = function(e){
  //Debt/loan form
  //Works, but need to replace user_id so it's not hardcoded in
  for(var i = 0; i <= k; i++){
    var formData = $('#debtForm'+i).serializeArray();
    user_id = 1;
    formData.push({name: "user_id", value: user_id});
    console.log(formData);

    $.ajax({
             url: base_url + '/Debt.php/',
             type: "POST", //send it through post method
             data: formData,
             success: function(response) {
               console.log(response);
               console.log('it worked');
             },
             error: function(xhr) {
               console.log("nope");
             }
     });
  }

  //Reoccurring payments form
  //Think it works
  for(var i = 0; i <= l; i++){
    var formData = $('#paymentForm'+i).serializeArray();
    user_id = 1;
    formData.push({name: "user_id", value: user_id});
    console.log(formData);

    $.ajax({
             url: base_url + '/ReoccurringPayments.php/',
             type: "POST", //send it through post method
             data: formData,
             success: function(response) {
               console.log(response);
               console.log('it worked');
             },
             error: function(xhr) {
               console.log("nope");
             }
     });
  }

  //Savings form
  for(var i = 0; i <= f; i++){
    var formData = $('#savingsForm'+i).serializeArray();

    user_id = 1;
    formData.push({name: "user_id", value: user_id});
    console.log(formData);

    $.ajax({
             url: base_url + '/Savings.php/',
             type: "POST", //send it through post method
             data: formData,
             success: function(response) {
               console.log(response);
               console.log('it worked');
             },
             error: function(xhr) {
               console.log("nope");
             }
     });
  }
  var totalIncome=0;
  for(var i=0;i<=a; i++){
  	var income=$('#inputIncomeAmount'+i).val();
  	var pmts=$('#inputIncomePmts'+i).val();
  	var total=income*pmts;
  	totalIncome+=total;
  }
}

});