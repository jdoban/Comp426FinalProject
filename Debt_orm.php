<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
date_default_timezone_set('America/New_York');

class Debt
{
	private $id;
	private $user_id;
	private $name;
  private $principal;
	private $term;
	private $annual_interest_rate;
  private $payments_per_year;
	private $payment_type;

	public static function connect() {
		return new mysqli("classroom.cs.unc.edu",
			      	     "mtyndall",
                   "do!1goAh1234",
				           "mtyndalldb");
	}

	public static function create($user_id, $name,
   $principal,
	 $term,
	 $annual_interest_rate,
   $payments_per_year,
	 $payment_type) {

	  $mysqli = Debt::connect();

    //Query to database to create a new entry. If it works, create a new Debt object
		$result = $mysqli->query("insert into Debt (user_id, name, principal, term, annual_interest_rate, payments_per_year, payment_type)
                           values (" . $user_id . "," . "'" . $name . "'" . "," . $principal . "," . $term .
                           "," . $annual_interest_rate . "," . $payments_per_year .
                           "," . $payment_type . ")");
		if ($result) {
			$new_id = $mysqli->insert_id;
			return new Debt($new_id, $user_id, $name, $principal, $term, $annual_interest_rate, $payments_per_year, $payment_type);
		}
		return null;
	}

	public static function findByID($id) {
	  $mysqli = Debt::connect();

		$result = $mysqli->query("select * from Debt where id = " . $id);
		if ($result) {
			if ($result->num_rows == 0){
				return null;
			}
			$user_info = $result->fetch_array();
			return new Debt($user_info['id'],
					       $user_info['user_id'],
					       $user_info['name'],
                 $user_info['principal'],
                 $user_info['term'],
                 $user_info['annual_interest_rate'],
                 $user_info['payments_per_year'],
                 $user_info['payment_type']);
		}
		return null;
	}

  public static function findByName($name) {
	  $mysqli = Debt::connect();

		$result = $mysqli->query("select * from Debt where id = " . $name);
		if ($result) {
			if ($result->num_rows == 0){
				return null;
			}
			$user_info = $result->fetch_array();
			return new Debt($user_info['id'],
					       $user_info['user_id'],
					       $user_info['name'],
                 $user_info['principal'],
                 $user_info['term'],
                 $user_info['annual_interest_rate'],
                 $user_info['payments_per_year'],
                 $user_info['payment_type']);
		}
		return null;
	}

	private function __construct($id, $user_id, $name, $principal, $term, $annual_interest_rate, $payments_per_year, $payment_type) {
		$this->id = $id;
		$this->user_id = $user_id;
		$this->name = $name;
    $this->principal = $principal;
		$this->term = $term;
		$this->annual_interest_rate = $annual_interest_rate;
    $this->payments_per_year = $payments_per_year;
		$this->payment_type = $payment_type;
	}

	public function getID() {
		return $this->id;
	}

	public function getUserID() {
		return $this->user_id;
	}

	public function getName() {
		return $this->name;
	}

  public function getPrincipal() {
		return $this->principal;
	}

  public function getTerm() {
		return $this->term;
	}

  public function getAnnualInterestRate() {
		return $this->annual_interest_rate;
	}

  public function getPaymentsPerYear() {
		return $this->payments_per_year;
	}

  public function getPaymentType() {
		return $this->payment_type;
	}

  public function setName($name) {
    $this->name = $name;
    return $this->update();
  }

  public function setPrincipal($principal) {
    $this->principal = $principal;
    return $this->update();
  }

  public function setTerm($term) {
    $this->term = $term;
    return $this->update();
  }

  public function setAnnualInterestRate($annual_interest_rate) {
    $this->annual_interest_rate = $annual_interest_rate;
    return $this->update();
  }

  public function setPaymentsPerYear($payments_per_year) {
    $this->payments_per_year = $payments_per_year;
    return $this->update();
  }

  public function setPaymentType($payment_type) {
    $this->payment_type = $payment_type;
    return $this->update();
  }

  //Deletes the entry in database, hasn't been tested yet
	private function deleteEntry() {
	  $mysqli = Debt::connect();

		$result = $mysqli->query("delete from Debt where id = " . $this->id);
		return $result;
	}

  //TODO Test this
	private function update() {
    $mysqli = Debt::connect();

    $result = $mysqli->query("update Debt set " .
			     "name=" .
			     "'" . $mysqli->real_escape_string($this->name) . "', " .
           "principal=" . $principal . ", " .
           "term=" . $term . ", " .
           "annual_interest_rate=" . $annual_interest_rate . ", " .
					 "payments_per_year=" . $payments_per_year . ", " .
					 "payment_type=" . $payment_type);
    return $result;
  }
  
	public function getJSON() {

    $json_obj = array('id' => $this->id,
		      'user_id' => $this->user_id,
		      'name' => $this->name,
		      'principal' => $this->principal,
          'term' => $this->term,
          'annual_interest_rate' => $this->annual_interest_rate,
          'payments_per_year' => $this->payments_per_year,
		      'payment_type' => $this->payment_type);
    return json_encode($json_obj);
  }

}
