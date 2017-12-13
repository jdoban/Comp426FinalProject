<?php
require_once('ReoccurringPayments_orm.php');

function renderReoccurringPayments($t) {
  if (is_null($t)) {
    print("No such user.");
  } else {
?>
<ul>
    <li>id = <?php print($t->getID())?></li>
    <li>user_id = <?php print($t->getUserID())?></li>
    <li>name = <?php print($t->GetName())?></li>
    <li>payments_per_year = <?php print($t->GetPaymentsPerYear())?></li>
</ul>
<?php
      }
}

?>
<h1>Transaction Test</h1>

<h2>Retrieving by ID</h2>

<?php

$t = ReoccurringPayments::findByID(1);
?>
<p>
$t = ReoccurringPayments::findByID(1);
<blockquote>
	<?php renderReoccurringPayments($t); ?>
</blockquote>

<?php

$t = ReoccurringPayments::findPaymentsByUserID(87);
echo($t);
?>
