<?php
$connection = mysql_connect("localhost", "root", "stressfree"); // Establishing Connection with Server..
$db = mysql_select_db("STRESS_FREE_EVENTS", $connection); // Selecting Database
//Fetching Values from URL
$name2=$_POST['name1'];
$password2=$_POST['password1'];
$id2=$_POST['id1'];
$status2=$_POST['status1'];
//Insert query
$query = mysql_query("insert into LOGIN(Status, User_name, Password, ID) values ('$status2', '$name2', '$password2','$id2')");
echo "Login successful";
mysql_close($connection); // Connection Closed
?>
