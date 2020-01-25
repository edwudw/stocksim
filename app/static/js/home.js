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

var testVar = 'Mon';

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        [testVar, 20, 28, 38, 45],
        ['Tue', 31, 38, 55, 66],
        ['Wed', 50, 55, 77, 80],
        ['Thu', 77, 77, 66, 50],
        ['Fri', 68, 66, 22, 15]
        // Treat first row as data as well.
    ], true);

    var options = {
    legend:'none'
    };

    var chart = new google.visualization.CandlestickChart(document.getElementById('chart'));

    chart.draw(data, options);
}

function setupChart() {
    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);
    
}

$(document).ready(function () {
    showMenus();
    $('#myLinks').hide();
    $(window).resize(showMenus);

    $('#hamburger').click(function () {
        $('#myLinks').toggle();
    });

    setupChart();
});