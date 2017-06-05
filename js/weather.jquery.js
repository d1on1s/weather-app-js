$(function() {

  var lat;
  var lon;

  $.getJSON("http://ip-api.com/json", function(loc_data) {
    lat = loc_data.lat;
    lon = loc_data.lon;

    var api = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=bf8dde3b4c7495903d792514d170e98e";
    
    $.getJSON(api, function(data) {
      var kTemp = data.main.temp;
      var fTemp = ((kTemp)*(9/5)-459.67).toFixed(0);
      var cTemp = (kTemp-273).toFixed(0);
      var city = data.name;
      var windSpeed = (2.237*(data.wind.speed)).toFixed(0);
      var weatherDesc = data.weather[0].description;
      var tempToggle = true;
      var weatherType = parseInt(data.weather[0].id.toString());

      if (weatherType == 800) {
        weatherType = 8;
      }
      else if (weatherType > 800 && weatherType < 900) {
        weatherType = 9;
      }
      else {
        weatherType = parseInt(weatherType.toString().charAt(0));
      }

      $("#city").html(city);
      $("#fTemp").html(fTemp + " F");
      $("#fTemp").click(function() {

        if (tempToggle) {
          $("#fTemp").html(cTemp + " C");
          tempToggle = false;
        }
        else {
          $("#fTemp").html(fTemp + " F");
          tempToggle = true;
        }

      });

        switch (weatherType) {
          case 2:
            $("#weatherIcon").addClass("wi wi-thunderstorm");
            break;
          case 3:
            $("#weatherIcon").addClass("wi wi-sprinkle");
            break;
          case 5:
            $("#weatherIcon").addClass("wi wi-rain");
            break;
          case 6:
            $("#weatherIcon").addClass("wi wi-snow");
            break;
          case 7:
            $("#weatherIcon").addClass("wi wi-fog");
            break;
          case 8:
            $("#weatherIcon").addClass("wi wi-day-sunny");                        
            break;
          case 9:
            $("#weatherIcon").addClass("wi wi-cloudy");            
            break;
        }

    });
  });

});