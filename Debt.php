<?php
require_once('Debt_orm.php');
error_reporting(E_ALL);
ini_set('display_errors', 1);
date_default_timezone_set('America/New_York');


$path_components = explode('/', $_SERVER['PATH_INFO']);

// Note that since extra path info starts with '/'
// First element of path_components is always defined and always empty.

if ($_SERVER['REQUEST_METHOD'] == "GET") {
  // GET means either instance look up, index generation, or deletion

  // Following matches instance URL in form
  // /Debt.php/<id>

  if ((count($path_components) >= 2) &&
      ($path_components[1] != "")) {

    // Interpret <id> as integer
    $Debt_id = intval($path_components[1]);

    // Look up object via ORM
    $Debt = Debt::findByID($Debt_id);

    if ($Debt == null) {
      // Debt not found.
      header("HTTP/1.0 404 Not Found");
      print("Debt id: " . $Debt_id . " not found.");
      exit();
    }

    // Check to see if deleting
    if (isset($_REQUEST['delete'])) {
      $Debt->delete();
      header("Content-type: application/json");
      print(json_encode(true));
      exit();
    }

    // Normal lookup.
    // Generate JSON encoding as response
    header("Content-type: application/json");
    print($Debt->getJSON());
    exit();

  }

  // ID not specified, then must be asking for index
  header("Content-type: application/json");
  print(json_encode(Debt::getAllIDs()));
  exit();

} else if ($_SERVER['REQUEST_METHOD'] == "POST") {

  // Either creating or updating

  // Following matches /Debt.php/<id> form
  if ((count($path_components) >= 2) &&
      ($path_components[1] != "")) {

    //Interpret <id> as integer and look up via ORM
    $Debt_id = intval($path_components[1]);
    $Debt = Debt::findByID($Debt_id);

    if ($Debt == null) {
      // Debt not found.
      header("HTTP/1.0 404 Not Found");
      print("Debt id: " . $Debt_id . " not found while attempting update.");
      exit();
    }

    //Validate user_id
    $new_user_id = false;
    if (isset($_REQUEST['user_id'])) {
      $new_user_id = intval($_REQUEST['user_id']);
      if ($new_user_id == "") {
        	header("HTTP/1.0 400 Bad Request");
        	print("Bad user_id");
        	exit();
      }
    }

    //Validate name
    $new_name = false;
    if (isset($_REQUEST['name'])) {
      $new_name = trim($_REQUEST['name']);
      if ($new_name == "") {
        	header("HTTP/1.0 400 Bad Request");
        	print("Bad name");
        	exit();
      }
    }

    //Validate principal
    $new_principal = false;
    if (isset($_REQUEST['principal'])) {
      $new_principal = intval($_REQUEST['principal']);
      if ($new_principal == "") {
        	header("HTTP/1.0 400 Bad Request");
        	print("Bad principal");
        	exit();
      }
    }

    //Validate payments_per_year
    $new_term = false;
    if (isset($_REQUEST['term'])) {
      $new_term = intval($_REQUEST['term']);
      if ($new_term == "" || $new_term < 0) {
        	header("HTTP/1.0 400 Bad Request");
        	print("Bad term");
        	exit();
      }
    }

    //Validate annual_interest_rate
    $new_annual_interest_rate = false;
    if (isset($_REQUEST['annual_interest_rate'])) {
      $new_annual_interest_rate = round(floatval($_REQUEST['annual_interest_rate']), 2);
      if ($new_annual_interest_rate == "") {
        	header("HTTP/1.0 400 Bad Request");
        	print("Bad annual_interest_rate");
        	exit();
      }
    }

    //Validate payments_per_year
    $new_payments_per_year = false;
    if (isset($_REQUEST['payments_per_year'])) {
      $new_payments_per_year = intval($_REQUEST['payments_per_year']);
      if ($new_payments_per_year == "" || $new_payments_per_year < 0) {
        	header("HTTP/1.0 400 Bad Request");
        	print("Bad payments_per_year");
        	exit();
      }
    }

    //Validate payment_type
    $payment_type = false;
    if (isset($_REQUEST['payment_type'])) {
      $pyment_type = intval($_REQUEST['payment_type']);
      if ($payment_type == "" && ($payment_type != 1 || $payment_type != 0)) {
        	header("HTTP/1.0 400 Bad Request");
        	print("Bad payment_type");
        	exit();
      }
    }

    // Update via ORM
    if ($new_name) {
      $Debt->setName($new_name);
    }
    if ($new_principal) {
      $Debt->setPrincipal($new_principal);
    }
    if ($new_term) {
      $Debt->setTerm($new_term);
    }
    if ($new_annual_interest_rate) {
      $Debt->setAnnualInterestRate($new_annual_interest_rate);
    }
    if ($new_payments_per_year) {
      $Debt->setPaymentsPerYear($new_payments_per_year);
    }
    if ($payment_type) {
      $Debt->setPaymentType($new_payment_type);
    }

    // Return JSON encoding of updated Debt
    header("Content-type: application/json");
    print($Debt->getJSON());
    exit();
  } else {

    // Creating a new Debt item

    // Validate values
    if (!isset($_REQUEST['user_id'])) {
      header("HTTP/1.0 400 Bad Request");
      print("Missing user_id");
      exit();
    }

    $user_id = intval($_REQUEST['user_id']);
    if ($user_id == "") {
      header("HTTP/1.0 400 Bad Request");
      print("Bad user_id");
      exit();
    }

    if (!isset($_REQUEST['name'])) {
      header("HTTP/1.0 400 Bad Request");
      print("Missing name");
      exit();
    }

    $name = trim($_REQUEST['name']);
    if ($name == "") {
      header("HTTP/1.0 400 Bad Request");
      print("Bad name");
      exit();
    }

    if (!isset($_REQUEST['principal'])) {
      header("HTTP/1.0 400 Bad Request");
      print("Missing principal");
      exit();
    }

    $principal = intval($_REQUEST['principal']);
    if ($principal == "") {
      header("HTTP/1.0 400 Bad Request");
      print("Bad principal");
      exit();
    }

    if (!isset($_REQUEST['term'])) {
      header("HTTP/1.0 400 Bad Request");
      print("Missing term");
      exit();
    }

    $term = intval($_REQUEST['term']);
    if ($term == "" || $term < 0) {
      header("HTTP/1.0 400 Bad Request");
      print("Bad term");
      exit();
    }

    if (!isset($_REQUEST['annual_interest_rate'])) {
      header("HTTP/1.0 400 Bad Request");
      print("Missing annual_interest_rate");
      exit();
    }

    $annual_interest_rate = floatval($_REQUEST['annual_interest_rate']);
    if ($annual_interest_rate == "" || $annual_interest_rate < 0) {
      header("HTTP/1.0 400 Bad Request");
      print("Bad annual_interest_rate");
      exit();
    }

    if (!isset($_REQUEST['payments_per_year'])) {
      header("HTTP/1.0 400 Bad Request");
      print("Missing payments_per_year");
      exit();
    }

    $payments_per_year = intval($_REQUEST['payments_per_year']);
    if ($payments_per_year == "" || $payments_per_year < 0) {
      header("HTTP/1.0 400 Bad Request");
      print("Bad payments_per_year");
      exit();
    }

    if (!isset($_REQUEST['payment_type'])) {
      header("HTTP/1.0 400 Bad Request");
      print("Missing term");
      exit();
    }

    $payment_type = intval($_REQUEST['payment_type']);
    if ($payment_type == "" || $payment_type > 1 || $payment_type < 0) {
      header("HTTP/1.0 400 Bad Request");
      print("Bad/invalid payment_type");
      exit();
    }

    // Create new Debt via ORM
    $new_Debt = Debt::create($user_id, $name, $principal, $term, $annual_interest_rate, $payments_per_year, $payment_type);

    // Report if failed
    if ($new_Debt == null) {
      header("HTTP/1.0 500 Server Error");
      print("Server couldn't create new Debt.");
      exit();
    }

    //Generate JSON encoding of new Debt
    header("Content-type: application/json");
    print($new_Debt->getJSON());
    exit();
  }
}

// If here, none of the above applied and URL could
// not be interpreted with respect to RESTful conventions.

header("HTTP/1.0 400 Bad Request");
print("Did not understand URL");

?>
