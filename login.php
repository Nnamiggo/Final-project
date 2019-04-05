<?php
$connection = mysql_connect("localhost", "root", "stressfree"); // Establishing connection with server..
$db = mysql_select_db("STRESS_FREE_EVENTS", $connection); // Selecting Database.
$user_name=$_POST['user_name1']; // Fetching Values from URL.
$password= sha1($_POST['password1']); // Password Encryption, If you like you can also leave sha1.

// Matching user input email and password with stored email and password in database.
$result = mysql_query("SELECT * FROM LOGIN WHERE User_name='$user_name' AND password='$password'");
$data = mysql_num_rows($result);
if($data==1){
echo "Successfully Logged in...";
}else{
echo "Email or Password is wrong...!!!!";
//sugest sign up or try anagain
}
mysql_close ($connection); // Connection Closed.

?>
