
$(document).ready(function () {
    console.log('ready!');
    var alertShown = false;
    $('#sign-up-button').click(function (event) {
        event.preventDefault();
        var email = $('#email-box').val();
        var password = $('#password-box').val();
        var confirmPassword = $('#confirm-password-box').val();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        $(this).val('Loading...');
        $.ajax({
            type: 'POST',
            url: '/signup',
            contentType: 'application/json',
            data: JSON.stringify({
                'email': email,
                'password': password
            }),
            success: function (data) {
                $('#sign-up-button').val('Sign Up')
                console.log('data', data);
                result = JSON.parse(data);
                if (result.success == true) {
                    window.location.href = '/home';
                } else {
                    console.log(result.error);
                    if (alertShown == false) {
                        $('#welcome-title').after('<div id="error" class="alert alert-danger" role="alert"' +
                        ">Error: " + result['error']  + "</div>");
                        alertShown = true;
                    } else {
                        $('#error').val(result.error);
                    }
                    
                }

            }
        });
    });
});