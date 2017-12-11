$(document).ready(function (){

var k=0;
var l=0;

$("#addAnotherLoan").on('click', function(e){
addAnotherLoan();
});

$("#addAnotherPayment").on('click', function(e){
addAnotherPayment();
});

$("#submitDebts").on('click', function(e){
submitDebts();
});

$("#registerButton").on('click', function(e){
register();
});

$("#loginButton").on('click', function(e){
login();
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
	var addButton = document.getElementById('addAnotherLoan');
	var submitButton=document.getElementById('submitDebts');
	clone.parentNode.appendChild(addButton);
	clone.parentNode.appendChild(submitButton);

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
	var submitButton1=document.getElementById('submitPayments');
	clone1.parentNode.appendChild(addButton1);
	clone1.parentNode.appendChild(submitButton1);

	children1= clone1.children;
	children1[0].reset();
}

var submitDebts=function(){

}

var register=function(){

}

});



