// 
// const invocation = new XMLHttpRequest();
// const url = 'http://bar.other/resources/public-data/';
//
// function callOtherDomain() {
//   if(invocation) {
//     invocation.open('GET', url, true);
//     invocation.onreadystatechange = handler;
//     invocation.send();
//   }
// }

$(document).ready(function(){
$("#login").click(function(){
var user_name = $("#uname").val();
var password = $("#password").val();
// Checking for blank fields.
if( user_name =='' || password ==''){
$('input[type="text"],input[type="password"]').css("border","2px solid red");
$('input[type="text"],input[type="password"]').css("box-shadow","0 0 3px red");
alert("Please fill all fields...!!!!!!");
}
else {
$.post("login.php",{ user_name1: user_name, password1:password},
function(data) {
if(data=='Invalid Username.......') {
$('input[type="text"]').css({"border":"2px solid red","box-shadow":"0 0 3px red"});
$('input[type="password"]').css({"border":"2px solid #00F5FF","box-shadow":"0 0 5px #00F5FF"});
alert(data);
}
else if(data=='Username or Password is wrong...!!!!'){
$('input[type="text"],input[type="password"]').css({"border":"2px solid red","box-shadow":"0 0 3px red"});
alert(data);
// try again or signup
}
else if(data=='Successfully Logged in...'){
$("form")[0].reset();
$('input[type="text"],input[type="password"]').css({"border":"2px solid #00F5FF","box-shadow":"0 0 5px #00F5FF"});
alert(data);
// } else{
// alert(data);}
}
}
);
}
});
});
