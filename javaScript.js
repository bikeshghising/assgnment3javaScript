// Read user input and store API key
async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "d2a65936efb5994cffb125c83024fe48";
    // If no city name entered, show a message
    if (city === "") {
        document.getElementById("result").innerHTML = "<p>Please enter a city.</p>";
        return;
    }
     // URL for current weather
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
    // Fetch API data
    const response = await fetch(url);
    const data = await response.json();
    
    // If API returns an error code
    if (data.cod !== 200) {
        document.getElementById("result").innerHTML = `<p>Error: ${data.message}</p>`;
        return;
    }

    console.log(data);

    // Extract needed fields
    const temp = data.main.temp;
    const weather = data.weather[0].description;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const icon = data.weather[0].icon;

    // Convert Unix time to readable time
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
            
    // Display weather result
    document.getElementById("result").innerHTML = `
        <h2>${data.name}</h2>
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Weather:</strong> ${weather}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${wind} m/s</p>
        <p><strong>Sunrise:</strong> ${sunrise}</p>
        <p><strong>Sunset:</strong> ${sunset}</p>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
        `;
    // Load 5-day forecast
    getForecast(city, apiKey);

    } catch (error) {
        document.getElementById("result").innerHTML = "<p>Failed to fetch data.</p>";
    }
}

// Function to load 5-day forecast
async function getForecast(city, apiKey) {

    // Forecast API URL
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    // Fetch forecast data
    const response = await fetch(url);
    const data = await response.json();

    // Show message if forecast is unavailable
    if (data.cod !== "200") {
        document.getElementById("forecast").innerHTML = "<p>Forecast not available.</p>";
        return;
    }

    // Clear previous forecast
    document.getElementById("forecast").innerHTML = "";

    const list = data.list;

    // Loop through every 8th entry (one per day)
    for (let i = 0; i < list.length; i += 8) {
        const dayData = list[i];

        // Convert timestamp → day of week
        const date = new Date(dayData.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

        const temp = dayData.main.temp;
        const desc = dayData.weather[0].description;
        const icon = dayData.weather[0].icon;

        // Add forecast card to page
        document.getElementById("forecast").innerHTML += `
            <div class="forecast-card">
                <h3>${dayName}</h3>
                <p><strong>${temp}°C</strong></p>
                <p>${desc}</p>
                <img src="https://openweathermap.org/img/wn/${icon}.png">
            q</div>
        `;
    }
}

