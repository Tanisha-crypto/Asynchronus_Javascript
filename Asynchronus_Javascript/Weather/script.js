const cityInput = document.querySelector("#cityInput")
const searchBtn = document.querySelector("#searchBtn")

const cityName = document.querySelector("#cityName")
const temperature = document.querySelector("#temperature")
const weatherDescription = document.querySelector("#weatherDescription")
const feelsLike = document.querySelector("#feelsLike")
const humidity = document.querySelector("#humidity")
const wind = document.querySelector("#wind")

const loading = document.querySelector("#loading")
const error = document.querySelector("#error")


searchBtn.addEventListener("click", function () {

    const city = cityInput.value

    if (!city) {
        error.textContent = "Please Enter City Name"
        return
    }

    loading.style.display = "block"
    error.textContent = ""


    const geoUrl =
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`


    fetch(geoUrl).then(function(rawData) {

        return rawData.json()

    }).then(function(data) {

        console.log(data)

        const res = data.results[0]

        cityName.textContent = `${res.name}, ${res.country}`

        const latitude = res.latitude
        const longitude = res.longitude


        const weatherUrl =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code`


        fetch(weatherUrl).then(function(rawData) {

            return rawData.json()

        }).then(function(data) {

            const res = data.current

            console.log(res)

            temperature.textContent = res.temperature_2m

            feelsLike.textContent =
                `${res.apparent_temperature}°C`

            humidity.textContent =
                `${res.relative_humidity_2m}%`

            wind.textContent =
                `${res.wind_speed_10m} km/h`

            weatherDescription.textContent =
                getWeatherDescription(res.weather_code)

            loading.style.display = "none"

        }).catch(function(err) {

            console.log(err)

            error.textContent = "Weather data not found"
            loading.style.display = "none"

        })

    }).catch(function(err) {

        console.log(err)

        error.textContent = "City not found"
        loading.style.display = "none"

    })
})


function getWeatherDescription(code) {

    if (code === 0) {
        return "Clear Sky"
    }

    if (code === 1) {
        return "Mainly Clear"
    }

    if (code === 2) {
        return "Partly Cloudy"
    }

    if (code === 3) {
        return "Overcast"
    }

    if (code === 45 || code === 48) {
        return "Foggy"
    }

    if (code >= 51 && code <= 57) {
        return "Drizzle"
    }

    if (code >= 61 && code <= 67) {
        return "Rain"
    }

    if (code >= 71 && code <= 77) {
        return "Snow"
    }

    if (code >= 80 && code <= 82) {
        return "Rain Showers"
    }

    if (code === 95) {
        return "Thunderstorm"
    }

    return "Unknown Weather"
}