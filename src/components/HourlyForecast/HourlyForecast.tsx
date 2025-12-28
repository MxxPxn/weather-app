import { convertTemp } from "../../utils/Convert";
import "./HourlyForecast.css";
import { getWeatherIcon } from "../../utils/weatherIcons";

type HourlyForecastProps = {
  hourlyForecast: {
    time: Date[];
    temperature: number[];
    weather_code: number[];
  };
  unit: "metric" | "imperial";
  timezone: string;
};

function HourlyForecast({
  unit,
  hourlyForecast,
  timezone,
}: HourlyForecastProps) {
  return (
    <div className="weather__hourly">
      <h3>Hourly forecast</h3>
      <div className="weather__hourly-list">
        {hourlyForecast.time.map((time: Date, index: number) => (
          <div className="weather__hourly-item" key={index}>
            <div className="weather__hourly-time">
              <img
                src={getWeatherIcon(hourlyForecast.weather_code[index])}
                alt="weather icon"
              />
              {time
                .toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  timeZone: timezone,
                })
                .slice(0, 5)}
            </div>
            <div className="weather__hourly-temp">
              {Math.round(convertTemp(hourlyForecast.temperature[index], unit))}
              °{unit === "metric" ? "C" : "F"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HourlyForecast;
