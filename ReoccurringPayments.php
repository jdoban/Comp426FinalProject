<?php
require_once('ReoccurringPayments_orm.php');
error_reporting(E_ALL);
ini_set('display_errors', 1);
date_default_timezone_set('America/New_York');


$path_components = explode('/', $_SERVER['PATH_INFO']);

// Note that since extra path info starts with '/'
// First element of path_components is always defined and always empty.

if ($_SERVER['REQUEST_METHOD'] == "GET") {
  // GET means either instance look up, index generation, or deletion

  // Following matches instance URL in form
  // /ReoccurringPayments.php/<id>

  if ((count($path_components) >= 2) &&
      ($path_components[1] != "")) {

    // Interpret <id> as integer
    $ReoccurringPayments_id = intval($path_components[1]);

    // Look up object via ORM
    $ReoccurringPayments = ReoccurringPayments::findByID($ReoccurringPayments_id);

    if ($ReoccurringPayments == null) {
      // ReoccurringPayments not found.
      header("HTTP/1.0 404 Not Found");
      print("ReoccurringPayments id: " . $ReoccurringPayments_id . " not found.");
      exit();
    }

    // Check to see if deleting
    if (isset($_REQUEST['delete'])) {
      $ReoccurringPayments->delete();
      header("Content-type: application/json");
      print(json_encode(true));
      exit();
    }

    // Normal lookup.
    // Generate JSON encoding as response
    header("Content-type: application/json");
    print($ReoccurringPayments->getJSON());
    exit();

  }

  // ID not specified, then must be asking for index
  header("Content-type: application/json");
  print(json_encode(ReoccurringPayments::getAllIDs()));
  exit();

} else if ($_SERVER['REQUEST_METHOD'] == "POST") {

  // Either creating or updating

  // Following matches /ReoccurringPayments.php/<id> form
  if ((count($path_components) >= 2) &&
      ($path_components[1] != "")) {

    //Interpret <id> as integer and look up via ORM
    $ReoccurringPayments_id = intval($path_components[1]);
    $ReoccurringPayments = ReoccurringPayments::findByID($ReoccurringPayments_id);

    if ($ReoccurringPayments == null) {
      // ReoccurringPayments not found.
      header("HTTP/1.0 404 Not Found");
      print("ReoccurringPayments id: " . $ReoccurringPayments_id . " not found while attempting update.");
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

    //Validate payment_amount
    $new_payment_amount = false;
    if (isset($_REQUEST['payment_amount'])) {
      $payment_amount_raw = floatval($_REQUEST['payment_amount']);
      $new_payment_amount = round($payment_amount_raw, 2);
      if ($new_payment_amount == "") {
        	header("HTTP/1.0 400 Bad Request");
        	print("Bad payment_amount");
        	exit();
      }
    }

    //Validate payments_per_year
    $new_payments_per_year = false;
    if (isset($_REQUEST['payments_per_year'])) {
      $new_payments_per_year = intval($_REQUEST['payments_per_year']);
      if ($new_payments_per_year == "" || $payments_per_year < 0) {
        	header("HTTP/1.0 400 Bad Request");
        	print("Bad payments_per_year");
        	exit();
      }
    }

    // Update via ORM
    if ($new_name) {
      $ReoccurringPayments->setName($new_name);
    }
    if ($new_payment_amount) {
      $ReoccurringPayments->setPaymentAmount($new_payment_amount);
    }
    if ($new_payments_per_year) {
      $ReoccurringPayments->setPaymentsPerYear($new_payments_per_year);
    }

    // Return JSON encoding of updated ReoccurringPayments
    header("Content-type: application/json");
    print($ReoccurringPayments->getJSON());
    exit();
  } else {

    // Creating a new ReoccurringPayments item

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

    if (!isset($_REQUEST['payment_amount'])) {
      header("HTTP/1.0 400 Bad Request");
      print("Missing payment_amount");
      exit();
    }

    $payment_amount = floatval($_REQUEST['payment_amount']);
    if ($payment_amount == "") {
      header("HTTP/1.0 400 Bad Request");
      print("Bad payment_amount");
      exit();
    }

    if (!isset($_REQUEST['payments_per_year'])) {
      header("HTTP/1.0 400 Bad Request");
      print("Missing payments_per_year");
      exit();
    }

    $payments_per_year = intval($_REQUEST['payments_per_year']);
    if ($payments_per_year == "") {
      header("HTTP/1.0 400 Bad Request");
      print("Bad payments_per_year");
      exit();
    }

    // Create new ReoccurringPayments via ORM
    $new_ReoccurringPayments = ReoccurringPayments::create($user_id, $name, $payment_amount, $payments_per_year);

    // Report if failed
    if ($new_ReoccurringPayments == null) {
      header("HTTP/1.0 500 Server Error");
      print("Server couldn't create new ReoccurringPayments.");
      exit();
    }

    //Generate JSON encoding of new ReoccurringPayments
    header("Content-type: application/json");
    print($new_ReoccurringPayments->getJSON());
    exit();
  }
}

// If here, none of the above applied and URL could
// not be interpreted with respect to RESTful conventions.

header("HTTP/1.0 400 Bad Request");
print("Did not understand URL");

?>
