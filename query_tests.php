<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
date_default_timezone_set('America/New_York');

$conn = new mysqli("classroom.cs.unc.edu",
               "mtyndall",
               "do!1goAh1234",
               "mtyndalldb");

              if ($conn->connect_error) {
                                    die("Connection failed: " . $conn->connect_error);
                                    echo("Connection failed");
                                } else {
                                  echo("Connected");

$array = array();
$sql = "SELECT `payment_amount` FROM `ReoccurringPayments` WHERE user_id = 87";
$result = $conn->query($sql);

while(($x =  mysql_fetch_assoc($result))) {
    $array[] = $x;
}

echo(json_encode($array));
