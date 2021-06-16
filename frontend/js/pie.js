google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  var data = google.visualization.arrayToDataTable([
    ['Platform', 'Problems Solved'],
    ['Codechef',     2],
    ['Codeforces',      2],
    ['Vjudge',  123],
    ['Mentorpick', 105]
  ]);

  var options = {
    title: 'Problems solved in different platforms.'
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}