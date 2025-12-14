import { useState, useEffect } from "react";
import { fetchWeather, fetchWeatherByCity } from "./utils/weatherAPI";
import {
  convertTemp,
  convertSpeed,
  convertPrecipitation,
} from "./utils/Convert";

function App() {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [hourlyForrecast, setHourlyForecast] = useState<any>(null);
  const [dailyForecast, setDailyForecast] = useState<any>(null);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [timezone, setTimezone] = useState<string>("UTC");

  // Process weather data from API response

  // Get user's location and fetch weather

   const getUserLocation = () => {
      setLoading(true);
      setError("");
  
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
  
            try {
              const data = await fetchWeather(latitude, longitude);
              setWeatherData(data.weatherData);
              setHourlyForecast(data.hourlyForecast);
              setDailyForecast(data.dailyForecast);
              setTimezone(data.timezone);
              setLoading(false);
            } catch (err) {
              setError(
                "Failed to get location weather: " + (err as Error).message
              );
              setLoading(false);
            }
          },
          () => {
            setError("Please enable location access");
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation not supported");
        setLoading(false);
      }
    };
  
    // Auto-load user location on mount
    useEffect(() => {
      getUserLocation();
    }, []);
  
    const handleCitySearch = async () => {
      if (!city) {
        setError("Please enter a city name");
        return;
      }
  
      setLoading(true);
      setError("");
      try {
        const data = await fetchWeatherByCity(city);

        setWeatherData(data.weatherData);
        setHourlyForecast(data.hourlyForecast);
        setDailyForecast(data.dailyForecast);
        setTimezone(data.timezone);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch weather data");
        setLoading(false);
      }
    };

  return (
    <div>
      <div className="weather__wrapper">
        <div className="weather__header">
          <div className="weather__logo">Weather Now</div>
          <button
            className="weather__units"
            onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
          >
            {unit === "metric" ? "°C / km/h" : "°F / mph"}
          </button>
        </div>

        <div className="weather__title"> How`s the sky looking today?</div>
        <div className="weather__search">
          <input
            type="text"
            placeholder="Search for a place"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="weather__search-btn" onClick={fetchWeather}>
            Search
          </button>
        </div>
        {loading && <div className="weather__loading">Loading...</div>}
        {error && <div className="weather__error">{error}</div>}
        {weatherData && (
          <div className="weather__display">
            <div>
              Temperature:{" "}
              {Math.round(convertTemp(weatherData.temperature, unit))}°
              {unit === "metric" ? "C" : "F"}
            </div>
            <div>Humidity: {Math.round(weatherData.humidity)}%</div>
            <div>
              Wind Speed:{" "}
              {Math.round(convertSpeed(weatherData.windSpeed, unit))}{" "}
              {unit === "metric" ? "km/h" : "mph"}
            </div>
            <div>
              Precipitation:{" "}
              {Math.round(
                convertPrecipitation(weatherData.precipitation, unit)
              )}{" "}
              {unit === "metric" ? "mm" : "inch"}
            </div>
            <div>
              Rain: {Math.round(convertPrecipitation(weatherData.rain, unit))}{" "}
              {unit === "metric" ? "mm" : "inch"}
            </div>
          </div>
        )}
        {hourlyForrecast && (
          <div className="weather__hourly">
            <h3>Hourly forecast</h3>
            {hourlyForrecast.time.map((time: Date, index: number) => (
              <div key={index}>
                {time
                  .toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                    timeZone: timezone,
                  })
                  .slice(0, 5)}
                —
                {Math.round(
                  convertTemp(hourlyForrecast.temperature[index], unit)
                )}
                °{unit === "metric" ? "C" : "F"}
              </div>
            ))}
          </div>
        )}

        {dailyForecast && dailyForecast.maxTemp && (
          <div className="weather__daily">
            <h3>7 Day Forecast</h3>
            {Array.from({
              length: Math.min(7, dailyForecast.maxTemp.length),
            }).map((_, index) => {
              const date = new Date();
              date.setDate(date.getDate() + index);
              const dayName = date.toLocaleDateString("en-US", {
                weekday: "short",
              });
              return (
                <div key={index}>
                  {dayName}:{" "}
                  {Math.round(convertTemp(dailyForecast.minTemp[index], unit))}°
                  {unit === "metric" ? "C" : "F"} — {" "}
                  {Math.round(convertTemp(dailyForecast.maxTemp[index], unit))}°
                  {unit === "metric" ? "C" : "F"}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
