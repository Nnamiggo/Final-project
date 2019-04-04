$(document).ready(function(){
$("#submit").click(function(event){
  event.preventDefault();
  var username = $("#uname").val();
  var password = $("#psw").val();
  var id = Math.floor(Math.random() * 10000000000);
  var status = true;
//   var name = $("#name").val();
// var email = $("#email").val();
// var password = $("#password").val();
// var contact = $("#contact").val();
// Returns successful data submission message when the entered information is stored in database.
var dataString = 'name1='+ username +  '&password1='+ password + '&id1='+ id + '&status1='+ status;
if(username==''||password=='')
{
alert("Please Fill All Fields");
}
else
{
// AJAX Code To Submit Form.
$.ajax({
type: "POST",
url: "login.php",
data: dataString,
cache: false,
success: function(result){
alert(result);
}
});// close .ajax
}
return false;
}); //close click function
});
