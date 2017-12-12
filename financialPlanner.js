$(document).ready(function (){

var k=0;
var l=0;
var f=0;

$("#addAnotherLoan").on('click', function(e){
addAnotherLoan();
});

$("#addAnotherPayment").on('click', function(e){
addAnotherPayment();
});

$("#addAnotherSavings").on('click', function(e){
addAnotherSavings();
});

$("#registerSubmit").on('click', function(e){
register();
});

$("#loginSubmit").on('click', function(e){
login();
});

$('input:radio[name="consistent"]').change(
	function(){
		if($(this).is(':checked') && $(this).val()=='inconsistent'){
			hideConsistent();
		}
	});

$('input:radio[name="consistent"]').change(
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
		var cloneForm=document.getElementById('firstLoan' + k).getElementById('debtForm');
	cloneForm.id="debtForm"+ k;
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
	var addButton1 = document.getElementById('addAnotherSavings');
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

var hideConsistent=function(){
var inconsistents =document.getElementsByClassName('inconsistentRadio');
for(z=0;z<inconsistents.length;z++){
	if(inconsistents[z].checked){
		var consistents=document.getElementsByClassName('consistent');
		for(y=0;y<consistents.length;y++){
		consistents[y].style.display="none";
		}
	}
}
}


var showConsistent=function(){
var inconsistents =document.getElementsByClassName('consistentRadio');
for(z=0;z<inconsistents.length;z++){
	if(inconsistents[z].checked){
		var consistents=document.getElementsByClassName('consistent');
		for(y=0;y<consistents.length;y++){
		consistents[y].style.display="block";
		}
	}
}
}



});



