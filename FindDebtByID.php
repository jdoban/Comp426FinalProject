<?php
require_once('Debt_orm.php');
error_reporting(E_ALL);
ini_set('display_errors', 1);
date_default_timezone_set('America/New_York');

//Given a user_id, returns associative array for values
$path_components = explode('/', $_SERVER['PATH_INFO']);

// Note that since extra path info starts with '/'
// First element of path_components is always defined and always empty.

if ($_SERVER['REQUEST_METHOD'] == "GET") {
  // GET means either instance look up, index generation, or deletion
  if ((count($path_components) >= 2) &&
      ($path_components[1] != "")) {
        header("Content-type: application/json");
        print(json_encode(Debt::findDebtByUserID(intval($path_components[1]))));
        exit();
      }

} else {
  header("HTTP/1.0 400 Bad Request");
  print("Did not understand URL");
  exit();
}



?>
