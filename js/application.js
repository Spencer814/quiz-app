$(document).ready(function() {

//check box
    $(':checkbox').on('change',function() {
        var th = $(this), name = th.attr('name');
        if(th.is(':checked')) {
            $(':checkbox[name="'  + name + '"]').not(th).prop('checked',false);
        }
    });

//chart
    

//date
    var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    var newDate = new Date();

    newDate.setDate(newDate.getDate());    

    $('#date').html(dayNames[newDate.getDay()] + ", " + monthNames[newDate.getMonth()] + ' ' + newDate.getDate() + ', ' + newDate.getFullYear());

});


//chart
google.setOnLoadCallback(drawChart);
function drawChart() {

var data = google.visualization.arrayToDataTable([
  ['Score', 'Answers'],
  ['Right',     3],
  ['Wrong',      2]
]);

var options = {
  'title': '',
  'backgroundColor': 'none',
  legendTextStyle: {color: 'white'},
};

var chart = new google.visualization.PieChart(document.getElementById('piechart'));

chart.draw(data, options);
}