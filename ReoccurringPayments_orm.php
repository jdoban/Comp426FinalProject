<?php

class ReoccuringPayments
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

	  $mysqli = ReoccuringPayments::connect();

		$result = $mysqli->query("insert into ReoccuringPayments values (0, " .
			                     $user_id . ", " . $payment_amount . ", " . $payments_per_year . ")");
		if ($result) {
			$new_id = $mysqli->insert_id;
			return new ReoccuringPayments($new_id, $user_id, $name, $payment_amount, $payments_per_year);
		}
		return null;
	}

	public static function findByID($id) {
	  $mysqli = Users::connect();

		$result = $mysqli->query("select * from ReoccuringPayments where id = " . $id);
		if ($result) {
			if ($result->num_rows == 0){
				return null;
			}
			$user_info = $result->fetch_array();
			return new Users($user_info['id'],
					       $user_info['user_id'],
					       $user_info['name'],
                 $user_info['payment_amount']);
		}
		return null;
	}

  public static function findByName($name) {
	  $mysqli = Users::connect();

		$result = $mysqli->query("select * from ReoccuringPayments where id = " . $name);
		if ($result) {
			if ($result->num_rows == 0){
				return null;
			}
			$user_info = $result->fetch_array();
			return new Users($user_info['id'],
					       $user_info['user_id'],
					       $user_info['name'],
                 $user_info['payment_amount'],
                 $user_info['term'],
                 $user_info['annual_interest_rate'],
                 $user_info['$payments_per_year'],
                 $user_info['payment_type']);
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


	private function deleteEntry() {
	  $mysqli = Transaction::connect();

		$result = $mysqli->query("delete from ReoccuringPayments where id = " . $this->id);
		return $result;
	}

}
