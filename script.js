function getWeather() {
    var cityInput = document.getElementById('city');
    var city = cityInput.value; // Correctly get the value of the input element
    // console.log(city);

    var apiKey = 'eb0c12573a92c4d578c3e5ee634ed1ee';
    var geocodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + apiKey;

    fetch(geocodeUrl)
        .then(function(response) {
            
            return response.json();
        })
        .then(function(Data) {
            if (Data.length === 0) {
                throw new Error('City not found');
            }

            var lat = Data[0].lat;
            var lon = Data[0].lon;
            var country=Data[0].country;
            console.log(country);
            var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

            return fetch(weatherUrl);
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(weatherData) {
            displayWeather(weatherData);
        })
        .catch(function(error) {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather').innerHTML = 'Error fetching weather data.';
        });
}

function displayWeather(data) {
    var weatherDiv = document.getElementById('weather');
    var weatherDescription = data.weather[0].description;
    var temperature = (data.main.temp - 273.15).toFixed(2); // Convert from Kelvin to Celsius
    var feelslike=(data.main.feels_like-273.15).toFixed(2);
    var cityname=(data.name);
    console.log(cityname);
    weatherDiv.innerHTML = `
        <p>You Entered:${cityname}</p>
        <p>Weather: ${weatherDescription}</p>
        <p>Temperature: ${temperature}°C</p>
        <p>Feels Like ${feelslike}°C</p>
        
    `;
}
