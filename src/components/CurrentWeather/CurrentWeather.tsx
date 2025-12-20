import {
  convertTemp,
  convertSpeed,
  convertPrecipitation,
} from "../../utils/Convert";

import "./CurrentWeather.css";

type CurrentWeatherProps = {
  weatherData: {
    temperature: number;
    windSpeed: number;
    precipitation: number;
    humidity: number;
    rain: number;
  };
  unit: "metric" | "imperial";
  city: string;
};

function CurrentWeather({ weatherData, unit, city}: CurrentWeatherProps) {
  const now = new Date();
  const dayOfWeek = now.toLocaleDateString("en-US", { weekday: "long" });
  const date = now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
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
      label: "Humidity",
      value: Math.round(weatherData.humidity),
      unit: "%"
    },
    {
      label: "Wind Speed",
      value: Math.round(convertSpeed(weatherData.windSpeed, unit)),
      unit: unit === "metric" ? "km/h" : "mph"
    },
    {
      label: "Precipitation",
      value: Math.round(convertPrecipitation(weatherData.precipitation, unit)),
      unit: unit === "metric" ? "mm" : "inch"
    },
    {
      label: "Rain",
      value: Math.round(convertPrecipitation(weatherData.rain, unit)),
      unit: unit === "metric" ? "mm" : "inch"
    }
  ];

  return (
    <div className="weather__info-container">
      {weatherItems.map((item, index) => (
  <div key={index} className="weather__display-content">
    {item.isFeatured ? (
      <>
        <div className="weather__location">{item.city}</div>
        <div className="weather__date">{item.day}, {item.date}</div>
        <div className="weather__temp">{item.value}{item.unit}</div>
      </>
    ) : (
      <>
        <span className="weather__label">{item.label}</span>
        <span className="weather__value">{item.value}{item.unit}</span>
      </>
    )}
  </div>
))}
    </div>
  );
}

export default CurrentWeather;
