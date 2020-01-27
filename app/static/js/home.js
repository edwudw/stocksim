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

var chartData;

function getCurrentPrice(code) {
    $.ajax({
        'url': 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&' + 
            'symbol=ASX:' + code + '&interval=5min&apikey=U048DSV5V28BACQA',
        'success': function (data) {
            console.log(data);
            $('#stock-title').text('ASX:' + code + ' - $' + 
            data['Time Series (5min)'][Object.keys(data['Time Series (5min)'])[0]]['4. close'].toString())
        }

    });

    $.ajax({
        'url': 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=ASX:' + code + '&apikey=U048DSV5V28BACQA',
        'success': function (data) {
            console.log(data);
            chartArray = [];
            var timeSeriesData = data['Time Series (Daily)'];
            var counter = 0;
            for (var key of Object.keys(timeSeriesData)) {
                if (counter == 5) {
                    break;
                }
                var todayArray = [];
                todayArray.push(key);
                todayArray.push(parseFloat(timeSeriesData[key]["3. low"]));
                todayArray.push(parseFloat(timeSeriesData[key]['1. open']));
                todayArray.push(parseFloat(timeSeriesData[key]['4. close']));
                todayArray.push(parseFloat(timeSeriesData[key]['2. high']));
                chartArray.push(todayArray);
                counter += 1
            }
            chartData = chartArray;
            console.log('chartData', chartData);
            setupChart();
        }
    });
}

var testVar = 'Mon';

function drawChart() {
    var data;
    if (chartData == null) {
        data = google.visualization.arrayToDataTable([
            [testVar, 20, 28, 38, 45],
            ['Tue', 31, 38, 55, 66],
            ['Wed', 50, 55, 77, 80],
            ['Thu', 77, 77, 66, 50],
            ['Fri', 68, 66, 22, 15]
            // Treat first row as data as well.
        ], true);
    } else {
        data = google.visualization.arrayToDataTable(chartData, true);
    }
    

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
    getCurrentPrice('CBA');
    $('#show-button').click(function () {
        getCurrentPrice($('#stock-code-input').val());
    });
});