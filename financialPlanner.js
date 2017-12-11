$(document).ready(function (){

$("#addAnotherLoan").on('click', function(e){
addAnotherLoan();
});
var k=0;
var l=0;
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
	clone.parentNode.appendChild(addButton);
	children= clone.children;
	children[0].reset();
}


$("#addAnotherPayment").on('click', function(e){
addAnotherPayment();
});
var addAnotherPayment =function(){
	var original=document.getElementById('firstPayment' + k);
	var clone=original.cloneNode(true);
	clone.id= "firstPayment" + ++l; ++j;
	var loan= document.getElementById('first-debt');
	var loans=loan.cloneNode(true);
	var j =l+1;
	loans.innerHTML="Payment "+ j+".";
	original.parentNode.appendChild(loans);
	original.parentNode.appendChild(clone);
	var addButton = document.getElementById('addAnotherPayment');
	clone.parentNode.appendChild(addButton);
	children= clone.children;
	children[0].reset();
}
});



