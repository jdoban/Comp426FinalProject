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
</ul>
<?php
      }
}

?>
<h1>Transaction Test</h1>

<h2>Retrieving by ID</h2>

<?php

$t = Users::findByUsername(matt5);
?>
<p>
$t = Users::findByID(1);
<blockquote>
	<?php renderUsers($t); ?>
</blockquote>

<?php

$test = $t->getPassword();
?>
<p>
$t = $t::getPassword();
