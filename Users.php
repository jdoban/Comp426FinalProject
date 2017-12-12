<?php
require_once('Users_orm.php');
error_reporting(E_ALL);
ini_set('display_errors', 1);
date_default_timezone_set('America/New_York');

//path_components is everything that comes after Users.php/ in the url. Allows us to pass in param values through url
$path_components = explode('/', $_SERVER['PATH_INFO']);

// Note that since extra path info starts with '/'
// First element of path_components is always defined and always empty.

if ($_SERVER['REQUEST_METHOD'] == "GET") {
  // GET means either instance look up, index generation, or deletion

  // Following matches instance URL in form
  // /Users.php/<id> or /Users.php/<username>
  // Use if you want info and know the user_id

  //Test if there is an int value following /Users.php/. This int is interpreted as an ID
  if ((count($path_components) >= 2) &&
      ($path_components[1] != "") && is_numeric($path_components[1])) {

    // Interpret <id> as integer
    $Users_id = intval($path_components[1]);

    // Look up object via ORM
    $Users = Users::findByID($Users_id);

    //Tests if that id is in the database
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

    // Normal lookup for username via id
    // Generate JSON encoding as response
    header("Content-type: application/json");
    print($Users->getJSON());
    exit();

    //Failsafe if statement, needs correcting but code within it works
    //Use this if you know the login and password OR just the login
  } else if ((count($path_components) >= 1)) {

        if(isset($_REQUEST['password'])){
          //use for logins, else find by username down below
          //must pass in username and password as data in ajax call
          $username = $_REQUEST['username'];
          $password = $_REQUEST['password'];

          $Users = Users::findByUsername($username);

          //Tests for valid username
          if(!isset($Users)){
            header("HTTP/1.0 404 Not Found");
            print("User: " . $username . " not found.");
            exit();
          }

          //Validates the password.
          //Password_verify compares the password value entered in the $_REQUEST with the hashed pw in database
          if(password_verify($password , $Users->getPassword())){
            // Normal lookup.
            // Generate JSON encoding as response
            header("Content-type: application/json");
            print($Users->getJSON());
            exit();
          } else {
            //Incorrect password. Only prints the two hashed pws for debugging purposes
            header("HTTP/1.0 400 Bad Request");
            print("Bad password" . password_hash($password, PASSWORD_DEFAULT) . "\n" . $Users->getPassword());
            exit();
          }

          // Check to see if deleting
          if (isset($_REQUEST['delete'])) {
            $Users->delete();
            header("Content-type: application/json");
            print(json_encode(true));
            exit();

        }

        //Find a value by username but without knowing password, useful for finding user_id value
      } else {
        $username = $_REQUEST['username'];
        $Users = Users::findByUsername($username);

        if ($Users == null) {
          // User not found.
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
  }

  // ID or username not specified, then must be asking for index of all ids
  header("Content-type: application/json");
  print(json_encode(Users::getAllIDs()));
  exit();

} else if ($_SERVER['REQUEST_METHOD'] == "POST") {

  // Either creating or updating User items in the database
  // SUBMITTED VALUES ARE VALIDATED HERE, don't need to worry about it in JS unless you're debugging

  // Following matches /Users.php/<id> form
  // You must add the user id to the url if you want to update a database entry
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

    // Validate income
    $new_income = false;
    if (isset($_REQUEST['income'])) {
      $new_income = intval($_REQUEST['income']);
      if ($new_income == "" || $new_income < 0) {
          header("HTTP/1.0 400 Bad Request");
          print("Bad income");
          exit();
      }
    }

    // Update via ORM
    if ($new_password) {
      $Users->updatePassword($new_password);
    }

    if($new_income){
      $Users->updateIncome($new_income);
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

    if (!isset($_REQUEST['password'])) {
      header("HTTP/1.0 400 Bad Request");
      print("Missing password");
      exit();
    }

    $plain_password = trim($_REQUEST['password']);
    if ($plain_password == "") {
      header("HTTP/1.0 400 Bad Request");
      print("Bad password" . $password . 'test');
      exit();
    }

    //Takes the plaintext password provided by the user and hashes it for security
    //Password default is just the default hashing method given by php
    $password = password_hash($plain_password, PASSWORD_DEFAULT);

    if (!isset($_REQUEST['income'])) {
      $income = NULL;
    } else {
      $income = intval($_REQUEST['income']);
      if ($income == "") {
        header("HTTP/1.0 400 Bad Request");
        print("Bad income");
        exit();
      }
    }

    // Create new Users via ORM
    $new_Users = Users::create($username, $password, $income);

    if(!isset($new_Users)){
      print("Username already taken");
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
