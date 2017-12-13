<?php
require_once('ReoccurringPayments_orm.php');
error_reporting(E_ALL);
ini_set('display_errors', 1);
date_default_timezone_set('America/New_York');

//READ Users.php file to see how all this works, the formatting is very similar. Each method is document there
$path_components = explode('/', $_SERVER['PATH_INFO']);

// Note that since extra path info starts with '/'
// First element of path_components is always defined and always empty.

if ($_SERVER['REQUEST_METHOD'] == "GET") {
  // GET means either instance look up, index generation, or deletion
  if ((count($path_components) >= 2) &&
      ($path_components[1] != "")) {
        header("Content-type: application/json");
        print(ReoccurringPayments::findPaymentsByUserID(intval($path_components[1])));
      }

} else {
  header("HTTP/1.0 400 Bad Request");
  print("Did not understand URL");
}



?>
