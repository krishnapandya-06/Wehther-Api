// script.js
document.getElementById('searchBtn').addEventListener('click', () => {
 const city = document.getElementById('city').value;
 if (city) {
     getWeather(city);
 } else {
     alert("Please enter a city name.");
 }
});
async function getWeather(city) {
 const apiKey = 'fa03540d6367bd3c1beb67570939876c'; // Your API key
 const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

 try {
     const response = await fetch(url);
     
     // Check if the response is not okay
     if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
     }

     const data = await response.json();

     if (data.cod === 200) {
         displayWeather(data);
     } else {
         alert("City not found. Please enter a valid city.");
     }
 } catch (error) {
     console.error("Error fetching weather data:", error);
     alert("Failed to fetch weather data. Please check the network connection and try again.");
 }
}

function displayWeather(data) {
 const weatherResult = document.getElementById('weather-result');
 const { name, main, weather } = data;
 const { temp, humidity } = main;
 const { description, icon } = weather[0];

 // Update the weather card with the fetched data
 document.getElementById('city-name').textContent = name;
 document.getElementById('temperature').textContent = `${temp} °C`;
 document.getElementById('humidity').textContent = `${humidity}%`;
 document.getElementById('weather-description').textContent = description;
 document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${icon}.png`;
 document.getElementById('weather-icon').alt = description;

 // Show the weather card
 weatherResult.style.display = 'block';
}
// Fetch weather data for London on page load
window.addEventListener('load', () => {
 getWeather('London');
});
