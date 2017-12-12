<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
date_default_timezone_set('America/New_York');

class Users
{
	private $id;
	private $username;
	private $password;
	private $income;

	public static function connect() {
		return new mysqli("classroom.cs.unc.edu",
			      	     "mtyndall",
                   "do!1goAh1234",
				           "mtyndalldb");
	}

	//Creates a new Users object, adds parameter values into the Users database. Automatically increments id
	public static function create($username, $password, $income) {
	  $mysqli = Users::connect();

    //Query to database to create a new entry. If it works, create a new User object
		$result = $mysqli->query("insert into Users (username, password, income) values (" .
			                    "'" . $username . "'" . ", " . "'" . $password . "'" . ", " . $income . ")");
		if ($result) {
			$new_id = $mysqli->insert_id;
			return new Users($new_id, $username, $password, $income);
		}
		return null;
	}

	//Returns a Users object with matching id
	public static function findByID($id) {
	  $mysqli = Users::connect();

		$result = $mysqli->query("select * from Users where id = " . $id);
		if ($result) {
			if ($result->num_rows == 0){
				return null;
			}
			$user_info = $result->fetch_array();
			return new Users($user_info['id'],
					       $user_info['username'],
					       $user_info['password'],
							 	 $user_info['income']);
		}
		return null;
	}

  public static function getAllIDs() {
    $mysqli = Users::connect();

    $result = $mysqli->query("select id from Users");
    $id_array = array();

    if ($result) {
      while ($next_row = $result->fetch_array()) {
	       $id_array[] = intval($next_row['id']);
      }
    }
    return $id_array;
  }

	//Returns a Users object with matching username
  public static function findByUsername($username) {
	  $mysqli = Users::connect();

		$result = $mysqli->query("select * from Users where username = " . "'". $username . "'");
		if ($result) {
			if ($result->num_rows == 0){
				return null;
			}
			$user_info = $result->fetch_array();
			return new Users($user_info['id'],
					       $user_info['username'],
					       $user_info['password'],
							 	 $user_info['income']);
		}
		return null;
	}

  //Private constructor, accessed through Create function
	private function __construct($id, $username, $password, $income) {
		$this->id = $id;
		$this->username = $username;
		$this->password = $password;
		$this->income = $income;
	}

	//Public getters and setters. Values ARE NOT validated/tested here, validated in Users.php
	public function getID() {
		return $this->id;
	}

	public function getUsername() {
		return $this->username;
	}

	public function getPassword() {
		return $this->password;
	}

	public function getIncome() {
		return $this->income;
	}

	public function setPassword($new_password) {

		$this->password = $new_password;
		// Implicit style updating
		return $this->updatePassword();
	}

	public function setIncome($new_income) {

		$this->income = $new_income;
		// Implicit style updating
		return $this->updateIncome();
	}

	//Option to update password. Private because functionality is done accessed in Users.php
	private function updatePassword() {
	  $mysqli = Users::connect();

		$result = $mysqli->query("update Users set password = " . $this->password . " where id = " . $this->id);
		return $result;
	}

	//Allows for updating income. Functionality is in Users.php
	private function updateIncome() {
	  $mysqli = Users::connect();

		$result = $mysqli->query("update Users set income = " . $this->income . " where id = " . $this->id);
		return $result;
	}

	//Returns a JSON response, this is the response that we'll get back from $.ajax calls
	public function getJSON() {

    $json_obj = array('id' => $this->id,
		      'username' => $this->username,
		      'password' => $this->password,
				  'income' => $this->income);
    return json_encode($json_obj);
  }

}
