function showMenus() {
    if ($(window).width() < 800) {
        $('.nav-right').hide();
        $('#hamburger').show();
        $('nav img').hide();
    } else {
        $('nav img').show();
        $('.nav-right').show();
        $('#hamburger').hide();
    }
}


$(document).ready(function () {
    showMenus();
    $('#myLinks').hide();
    $(window).resize(showMenus);

    $('.nav-left h1').click(function () {
        window.location.href = '/home';
    });

    $('#hamburger').click(function () {
        $('#myLinks').toggle();
    });
});