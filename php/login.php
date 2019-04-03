<?php
$connection = mysql_connect("localhost", "root", "stressfree"); // Establishing Connection with Server..
$db = mysql_select_db("STRESS_FREE_EVENTS", $connection); // Selecting Database
//Fetching Values from URL
$name2=$_POST['name1'];
$email2=$_POST['email1'];
$password2=$_POST['password1'];
$contact2=$_POST['contact1'];
//Insert query
$query = mysql_query("insert into LOGIN(Status, User_name, Password, ID) values ('$name2', '$email2', '$password2','$contact2')");
echo "Login successful";
mysql_close($connection); // Connection Closed
?>
