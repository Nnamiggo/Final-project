<?php
$connection = mysql_connect("localhost", "root", "stressfree"); // Establishing connection with server..
$db = mysql_select_db("STRESS_FREE_EVENTS", $connection); // Selecting Database.
$name=$_POST['name1']; // Fetching Values from URL.
$phone=$_POST['phone1'];
$city=$_POST['city1'];
$admin=$_POST['admin1'];
$selectedCompany=$_POST['selectedCompany1'];
$query = mysql_query("insert into DECORATION_COMPANIES(Name, Phone_number, City, Admin) values ('$name', '$phone', '$city','$admin')"); // Insert query
if($query){
echo "You have Successfully Registered.....";
}else
{
echo "Error....!!";
}
mysql_close ($connection);
?>
