$(document).ready(function() {
  $("#register").click(function() {
    var company_name = $("#company").val();
    var phone = $("#phone").val();
    var city = $("#city").val();
    var admin = $("#admin").val();
    var selectedCompany;
    $("select.company").change(function() {
      selectedCompany = $(this).children("option:selected").val();
      //alert("You have selected the country - " + selectedCompany);
    });
    if (company_name === '' || phone === '' || city === '' || admin === '' || selectedCompany === '') {
      alert("Please fill all fields...!!!!!!");
    }
    //  else if ((password.length) < 8) {
    // alert("Password should atleast 8 character in length...!!!!!!");
    // } else if (!(password).match(cpassword)) {
    // alert("Your passwords don't match. Try again?");
    // }
    else {
      $.post("register.php", {
        name1: company_name,
        Phone1: phone,
        city1: city,
        admin1: admin,
        selectedCompany1: selectedCompany
      }, function(data) {
        if (data == 'You have Successfully Registered.....') {
          $("form")[0].reset();
        }
        alert(data);
      });
    }
  });
});
