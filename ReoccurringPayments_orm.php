<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
date_default_timezone_set('America/New_York');

class ReoccurringPayments
{
	private $id;
	private $user_id;
	private $name;
	private $payment_amount;
	private $payments_per_year;

	public static function connect() {
		return new mysqli("classroom.cs.unc.edu",
			      	     "mtyndall",
                   "do!1goAh1234",
				           "mtyndalldb");
	}

	public static function create($user_id, $name,
   $payment_amount,
   $payments_per_year) {

	  $mysqli = ReoccurringPayments::connect();

		//Query to database to create a new entry. If it works, create a new ReoccurringPayments object
		$result = $mysqli->query("insert into ReoccurringPayments (user_id, name, payment_amount, payments_per_year)
                           values (" . $user_id . "," . "'" . $name . "'" . "," . $payment_amount . "," . $payments_per_year . ")");
		if ($result) {
			$new_id = $mysqli->insert_id;
			return new ReoccurringPayments($new_id, $user_id, $name, $payment_amount, $payments_per_year);
		}
		return null;
	}

	public static function findByID($id) {
	  $mysqli = ReoccurringPayments::connect();

		$result = $mysqli->query("select * from ReoccurringPayments where id = " . $id);
		if ($result) {
			if ($result->num_rows == 0){
				return null;
			}
			$user_info = $result->fetch_array();
			return new ReoccurringPayments($user_info['id'],
					       $user_info['user_id'],
					       $user_info['name'],
                 $user_info['payment_amount'],
                 $user_info['payments_per_year']);
		}
		return null;
	}

  public static function findByName($name) {
	  $mysqli = ReoccurringPayments::connect();

		$result = $mysqli->query("select * from ReoccurringPayments where id = " . $name);
		if ($result) {
			if ($result->num_rows == 0){
				return null;
			}
			$user_info = $result->fetch_array();
			return new ReoccurringPayments($user_info['id'],
					       $user_info['user_id'],
					       $user_info['name'],
                 $user_info['payment_amount'],
                 $user_info['payments_per_year']);
		}
		return null;
	}

	private function __construct($id, $user_id, $name, $payment_amount, $payments_per_year) {
		$this->id = $id;
		$this->user_id = $user_id;
		$this->name = $name;
    $this->payment_amount = $payment_amount;
    $this->payments_per_year = $payments_per_year;
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

	public function getPaymentAmount() {
		return $this->payment_amount;
	}

  public function GetPaymentsPerYear() {
		return $this->payments_pey_year;
	}

	//Should delete the entity in the database, has yet to be tested
	private function deleteEntry() {
	  $mysqli = ReoccurringPayments::connect();

		$result = $mysqli->query("delete from ReoccurringPayments where id = " . $this->id);
		return $result;
	}

}
