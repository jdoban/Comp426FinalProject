$(document).ready(function (){

var k=0;
var l=0;
var f=0;
var a=0;

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

$("#registerSubmit").on('click', function(e){
register();
});

$("#loginSubmit").on('click', function(e){
login();
});

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


var register=function(){
var pass=document.getElementById("pass").value;
var pass1=document.getElementById("pass1").value;
var checkPass = (pass==pass1)
if(checkPass==false){
	document.getElementById('passwordCheck').innerHTML="Your passwords do not match. Please try again.";
	document.getElementById('registerForm').reset();
}
else{

}

}

var login=function(){

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



});



