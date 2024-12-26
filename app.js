const API_KEY = 'bbdbb7e6d7112df15a325f7b6f994f70';
const weatherInfo = document.getElementById('weatherInfo');

async function getWeather() {
    const location = document.getElementById('locationInput').value.trim();

    if (!location) {
        weatherInfo.innerHTML = "<p>Please enter a location.</p>";
        return;
    }

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error('Location not found');
        }

        const data = await response.json();
        const { name, main, weather, wind } = data;

        weatherInfo.innerHTML = `
            <h2>${name}</h2>
            <p>${weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1)}</p>
            <p><strong>Temperature:</strong> ${main.temp}°C</p>
            <p><strong>Feels Like:</strong> ${main.feels_like}°C</p>
            <p><strong>Humidity:</strong> ${main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
        `;
    } catch (error) {
        weatherInfo.innerHTML = `<p>Error: ${error.message}. Please try again.</p>`;
    }
}
