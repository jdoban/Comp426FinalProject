<?php
require_once('Debt_orm.php');

function renderDebt($t) {
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

$t = Debt::findByID(1);
?>
<p>
$t = Debt::findByID(1);
<blockquote>
	<?php renderDebt($t); ?>
</blockquote>

<?php

$t = Debt::create(1, bob2, 1, 1, 5.22, 1, 1);
?>
$t = Debt::create(bob, test);

<blockquote>
	<?php renderDebt($t); ?>
</blockquote>
