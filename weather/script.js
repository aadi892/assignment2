document.getElementById('submitBtn').addEventListener('click', getWeather);

function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = "7cbb748f02b23b996d3bd18ab36f5c5c";
    const unit = 'metric';  // For Celsius. Use 'imperial' for Fahrenheit.

    if (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`)
            .then(response => response.json())
            .then(data => {
                // Check if the city is found
                if (data.cod === 200) {
                    const tempCelsius = data.main.temp;
                    const tempFahrenheit = (tempCelsius * 9/5) + 32;
                    const weatherCondition = data.weather[0].description;
                    const weatherIcon = data.weather[0].icon;

                    // Update UI with weather data
                    document.getElementById('cityName').textContent = `Weather in ${data.name}`;
                    document.getElementById('temp').textContent = `Temperature: ${tempCelsius}°C / ${tempFahrenheit.toFixed(1)}°F`;
                    document.getElementById('weatherCondition').textContent = `Condition: ${weatherCondition}`;
                    document.getElementById('weatherImage').src = `http://openweathermap.org/img/wn/${weatherIcon}.png`;

                    // Show the weather results
                    document.getElementById('weatherResult').style.display = 'block';
                } else {
                    alert('City not found!');
                }
            })
            .catch(error => alert('Error fetching weather data: ' + error));
    } else {
        alert('Please enter a city name!');
    }
}
