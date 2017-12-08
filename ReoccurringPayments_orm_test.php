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

$t = ReoccurringPayments::create(1, bob2, 1, 1);
?>
$t = ReoccurringPayments::create(bob, test);

<blockquote>
	<?php renderReoccurringPayments($t); ?>
</blockquote>
