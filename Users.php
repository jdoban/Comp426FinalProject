<?php
require_once('Users_orm.php');
error_reporting(E_ALL);
ini_set('display_errors', 1);
date_default_timezone_set('America/New_York');


$path_components = explode('/', $_SERVER['PATH_INFO']);

// Note that since extra path info starts with '/'
// First element of path_components is always defined and always empty.

if ($_SERVER['REQUEST_METHOD'] == "GET") {
  // GET means either instance look up, index generation, or deletion

  // Following matches instance URL in form
  // /Users.php/<id> or /Users.php/<username>

  if ((count($path_components) >= 2) &&
      ($path_components[1] != "" && is_int($path_components[1]))) {

    // Interpret <id> as integer
    $Users_id = intval($path_components[1]);

    // Look up object via ORM
    $Users = Users::findByID($Users_id);

    if ($Users == null) {
      // Users not found.
      header("HTTP/1.0 404 Not Found");
      print("Users id: " . $Users_id . " not found.");
      exit();
    }

    // Check to see if deleting
    if (isset($_REQUEST['delete'])) {
      $Users->delete();
      header("Content-type: application/json");
      print(json_encode(true));
      exit();
    }

    // Normal lookup.
    // Generate JSON encoding as response
    header("Content-type: application/json");
    print($Users->getJSON());
    exit();

  } else if ((count($path_components) >= 2) &&
      ($path_components[1] != "")) {
        $username = trim($path_components[1]);

        $Users = Users::findByUsername($username);

        if ($Users == null) {
          // Users not found.
          header("HTTP/1.0 404 Not Found");
          print("Users id: " . $Users_id . " not found.");
          exit();
        }

        // Check to see if deleting
        if (isset($_REQUEST['delete'])) {
          $Users->delete();
          header("Content-type: application/json");
          print(json_encode(true));
          exit();
        }

        // Normal lookup.
        // Generate JSON encoding as response
        header("Content-type: application/json");
        print($Users->getJSON());
        exit();
  }

  // ID not specified, then must be asking for index
  header("Content-type: application/json");
  print(json_encode(Users::getAllIDs()));
  exit();

} else if ($_SERVER['REQUEST_METHOD'] == "POST") {

  // Either creating or updating

  // Following matches /Users.php/<id> form
  if ((count($path_components) >= 2) &&
      ($path_components[1] != "")) {

    //Interpret <id> as integer and look up via ORM
    $Users_id = intval($path_components[1]);
    $Users = Users::findByID($Users_id);

    if ($Users == null) {
      // Users not found.
      header("HTTP/1.0 404 Not Found");
      print("Users id: " . $Users_id . " not found while attempting update.");
      exit();
    }


    $username = trim($_REQUEST['username']);
    // Validate password
    $new_password = false;
    if (isset($_REQUEST['password'])) {
      $new_password = trim($_REQUEST['password']);
      if ($new_password == "") {
        	header("HTTP/1.0 400 Bad Request");
        	print("Bad password");
        	exit();
      }
    }

    // Update via ORM
    if ($new_password) {
      $Users->updatePassword($new_password);
    }

    // Return JSON encoding of updated Users
    header("Content-type: application/json");
    print($Users->getJSON());
    exit();
  } else {

    // Creating a new Users item

    // Validate values
    if (!isset($_REQUEST['username'])) {
      header("HTTP/1.0 400 Bad Request");
      print("Missing username");
      exit();
    }

    $username = trim($_REQUEST['username']);
    if ($username == "") {
      header("HTTP/1.0 400 Bad Request");
      print("Bad username");
      exit();
    }

    $password = "";
    if (isset($_REQUEST['password'])) {
      $password = trim($_REQUEST['password']);
    } else {
      header("HTTP/1.0 400 Bad Request");
      print("Password required");
    }

    // Create new Users via ORM
    $new_Users = Users::create($username, $password);

    // Report if failed
    if ($new_Users == null) {
      header("HTTP/1.0 500 Server Error");
      print("Server couldn't create new Users.");
      exit();
    }

    //Generate JSON encoding of new Users
    header("Content-type: application/json");
    print($new_Users->getJSON());
    exit();
  }
}

// If here, none of the above applied and URL could
// not be interpreted with respect to RESTful conventions.

header("HTTP/1.0 400 Bad Request");
print("Did not understand URL");

?>
