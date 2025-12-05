// Read user input and store API key
async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "";
    // If no city name entered, show a message
    if (city === "") {
        document.getElementById("result").innerHTML = "<p>Please enter a city.</p>";
        return;
    }
     // URL for current weather
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;


}