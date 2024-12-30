const apiKey = 'a5f89ba8d900bd4c1139d44cfc84bb47';
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');

async function getWeather(city) {
    try {
        document.getElementById('city-name').textContent = 'INITIALIZING...';
        
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=ru`;
        console.log('Запрос к URL:', url);
        
        const response = await fetch(url);
        const data = await response.json();
        console.log('Полученные данные:', data);
        
        if (data.cod !== 200) {
            throw new Error(data.message || 'Город не найден');
        }

        updateWeatherUI(data);
    } catch (error) {
        console.error('Подробности ошибки:', error);
        clearWeatherUI();
        alert('Город не найден. Пожалуйста, проверьте название.');
    }
}

function updateWeatherUI(data) {
    try {
        document.getElementById('city-name').textContent = data.name;
        document.getElementById('temperature').textContent = 
            Math.round(data.main.temp);
        document.getElementById('weather-description').textContent = 
            data.weather[0].description;
        document.getElementById('humidity').textContent = 
            data.main.humidity;
        document.getElementById('wind-speed').textContent = 
            data.wind.speed;
            
        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.onerror = () => {
            weatherIcon.src = ''; 
        };
        weatherIcon.src = iconUrl;
    } catch (error) {
        console.error('Ошибка при обновлении UI:', error);
        clearWeatherUI();
    }
}

function clearWeatherUI() {
    document.getElementById('city-name').textContent = '-';
    document.getElementById('temperature').textContent = '-';
    document.getElementById('weather-description').textContent = '-';
    document.getElementById('humidity').textContent = '-';
    document.getElementById('wind-speed').textContent = '-';
    document.getElementById('weather-icon').src = '';
}

searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city.length >= 2) {
        if (/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(city)) {
            getWeather(city);
        } else {
            alert('Пожалуйста, используйте только буквы для названия города');
        }
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});

window.addEventListener('load', () => {
    cityInput.value = 'Москва';
    getWeather('Москва');
}); 