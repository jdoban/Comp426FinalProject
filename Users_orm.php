<?php

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

		$result = $mysqli->query("insert into Users values (0, " .
			                     $username . ", " . $password . ")");
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

  public static function findByUsername($id) {
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

	private function update() {
	  $mysqli = Transaction::connect();

		$result = $mysqli->query("update Users set password = " . $this->password . " where id = " . $this->id);
		return $result;
	}

}
