$(document).ready(function(){

   
    $("#email").blur(()=>{

            var email=$("#email").val();
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (reg.test(email) == false) 
            {
                $("#email_message").text("Please Enter a Valid email");
                $("#email_message").css("color","red");
            }
            else{

                $("#email_message").text("")
                return true;

            }
         
    });

    $("#password").blur(()=>{

        var password=$("#password").val();
        var reg = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/i;

        var validLength = /.{8}/.test(password);
        var hasCaps = /[A-Z]/.test(password);
        var hasNums = /\d/.test(password);
        var hasSpecials = /[~!,@#%&_\$\^\*\?\-]/.test(password);
		
        if (!(validLength && hasCaps && hasNums && hasSpecials))
        {
            $("#password_message").text("(Password must be more than 8 character and must include atleast 1 of each Special Char, Uppercase, Lowercase , Number)");
            $("#password_message").css("color","red");
         }  
        else{
            $("#password_message").text("")
            return true;

        }
     
});



});