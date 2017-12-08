<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
date_default_timezone_set('America/New_York');

class Users
{
	private $id;
	private $username;
	private $password;

	public static function connect() {
		return new mysqli("classroom.cs.unc.edu",
			      	     "mtyndall",
                   "do!1goAh1234",
				           "mtyndalldb");
	}

	public static function create($username, $password) {
	  $mysqli = Users::connect();

    //Query to database to create a new entry. If it works, create a new User object
		$result = $mysqli->query("insert into Users (username, password) values (" .
			                    "'" . $username . "'" . ", " . "'" . $password . "'" . ")");
		if ($result) {
			$new_id = $mysqli->insert_id;
			return new Users($new_id, $username, $password);
		}
		return null;
	}

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
					       $user_info['password']);
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

  public static function findByUsername($username) {
	  $mysqli = Users::connect();

		$result = $mysqli->query("select * from Users where username = " . $username);
		if ($result) {
			if ($result->num_rows == 0){
				return null;
			}
			$user_info = $result->fetch_array();
			return new Users($user_info['id'],
					       $user_info['username'],
					       $user_info['password']);
		}
		return null;
	}

  //Private constructor, accessed through Create function
	private function __construct($id, $username, $password) {
		$this->id = $id;
		$this->username = $username;
		$this->password = $password;
	}

	public function getID() {
		return $this->id;
	}

	public function getUsername() {
		return $this->username;
	}

	public function getPassword() {
		return $this->password;
	}

	public function setPassword($new_password) {

		$this->password = $new_price;
		// Implicit style updating
		return $this->update();
	}

	private function updatePassword() {
	  $mysqli = Users::connect();

		$result = $mysqli->query("update Users set password = " . $this->password . " where id = " . $this->id);
		return $result;
	}

}
