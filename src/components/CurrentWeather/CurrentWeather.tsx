import {convertTemp,convertSpeed} from "../../utils/Convert";
import "./CurrentWeather.css";
import { getWeatherIcon } from "../../utils/weatherIcons";

type CurrentWeatherProps = {
  weatherData: {
    temperature: number;
    windSpeed: number;
    humidity: number;
    feelsLike: number;
    rainChance: number;
    weather_code: number;
  };
  unit: "metric" | "imperial";
  city: string;
};

function CurrentWeather({ weatherData, unit, city }: CurrentWeatherProps) {
  const now = new Date();
  const dayOfWeek = now.toLocaleDateString("en-US", { weekday: "long" });
  const date = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const weatherItems = [
    {
      label: "Temperature",
      value: Math.round(convertTemp(weatherData.temperature, unit)),
      unit: unit === "metric" ? "°C" : "°F",
      city: city || "Your Location",
      day: dayOfWeek,
      date: date,
      isFeatured: true,
    },
    {
      label: "Feels Like",
      value: Math.round(convertTemp(weatherData.feelsLike, unit)),
      unit: unit === "metric" ? "°C" : "°F",
    },
    {
      label: "Humidity",
      value: Math.round(weatherData.humidity),
      unit: "%",
    },
    {
      label: "Wind Speed",
      value: Math.round(convertSpeed(weatherData.windSpeed, unit)),
      unit: unit === "metric" ? "km/h" : "mph",
    },
    {
      label: "Rain Chance",
      value: Math.round(weatherData.rainChance),
      unit: "%",
    },
  ];

  const featuredItem = weatherItems.find(item => item.isFeatured);
  const regularItems = weatherItems.filter(item => !item.isFeatured);

  return (
    <>
      {featuredItem && (
        <div className="weather__featured-item">
          <div className="weather__location">{featuredItem.city}</div>
          <div className="weather__date">
            {featuredItem.day}, {featuredItem.date}
          </div>
          <div className="weather__temp-container">
            <img
              src={getWeatherIcon(weatherData.weather_code)}
              alt="weather icon"
              className="weather__current-icon"
            />
            <div className="weather__temp">
              {featuredItem.value}
              {featuredItem.unit}
            </div>
          </div>
        </div>
      )}

      <div className="weather__info-container">
        {regularItems.map((item, index) => (
          <div key={index} className="weather__display-content">
            <div className="weather__display-info">
              <span className="weather__label">{item.label}</span>
              <span className="weather__value">
                {item.value}
                {item.unit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CurrentWeather;
