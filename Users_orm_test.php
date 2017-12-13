<?php
require_once('Users_orm.php');

function renderUsers($t) {
  if (is_null($t)) {
    print("No such user.");
  } else {
?>
<ul>
    <li>id = <?php print($t->getID())?></li>
    <li>username = <?php print($t->getUsername())?></li>
    <li>password = <?php print($t->getPassword())?></li>
    <li>income = <?php print($t->getIncome())?></li>
</ul>
<?php
      }
}

?>
<h1>Transaction Test</h1>

<h3>Creating User</h3>

<?php

$t = Users::create(income1, income, 10000);
?>
<p>
$t = Users::create(income, income, 10000);
<blockquote>
	<?php renderUsers($t); ?>
</blockquote>

<h2>Retrieving by ID</h2>

<?php

$test = Users::findByUsername(mtyndall60);
$test->setIncome(110000);
?>
<p>
$t = Users::findByUsername(income);
<blockquote>
	<?php renderUsers($test); ?>
</blockquote>

<?php

$test = Users::findByUsername(income1);
$test->setIncome(2000);
?>
<p>
$t = Users::findByUsername(income);
<blockquote>
	<?php renderUsers($test); ?>
</blockquote>

<?php

$test = $t->getPassword();
?>
<p>
$t = $t::getPassword();
