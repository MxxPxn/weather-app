import { useState, useEffect } from "react";
import { fetchWeather, fetchWeatherByCity } from "./utils/weatherAPI";
import {
  convertTemp,
  convertSpeed,
  convertPrecipitation,
} from "./utils/Convert";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { CurrentWeather } from "./components/CurrentWeather";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";

function App() {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [hourlyForrecast, setHourlyForecast] = useState<any>(null);
  const [dailyForecast, setDailyForecast] = useState<any>(null);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [timezone, setTimezone] = useState<string>("UTC");

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
        <Header
          unit={unit}
          onUnitToggle={() =>
          setUnit(unit === "metric" ? "imperial" : "metric")
          }
        />
        <div className="weather__title"> How`s the sky looking today?</div>
        <SearchBar
          city={city}
          onCityChange={setCity}
          onSearch={handleCitySearch}
        />
        {loading && <div className="weather__loading">Loading...</div>}
        {error && <div className="weather__error">{error}</div>}
        {weatherData && (
          <CurrentWeather weatherData={weatherData} unit={unit} />
        )}
        {hourlyForrecast && (
          <HourlyForecast
            hourlyForecast={hourlyForrecast}
            unit={unit}
            timezone={timezone}
          />
        )}

        {dailyForecast && dailyForecast.maxTemp && (
          <DailyForecast dailyForecast={dailyForecast} unit={unit} />
        )}
      </div>
    </div>
  );
}

export default App;
