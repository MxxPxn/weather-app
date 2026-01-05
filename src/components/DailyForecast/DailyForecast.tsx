import { convertTemp } from "../../utils/Convert";
import "./DailyForecast.css";
import { getWeatherIcon } from "../../utils/weatherIcons";

type DailyForecastProps = {
  dailyForecast: {
    date: string;
    minTemp: number[];
    maxTemp: number[];
    precipitation: number[];
    weather_code: number[];
  };
  unit: "metric" | "imperial";
};


function DailyForecast({ dailyForecast, unit }: DailyForecastProps) {
  return (
    <div className="weather__daily">
      <h3>7 Day Forecast</h3>
      <div className="weather__daily-grid">
        {Array.from({
          length: Math.min(9, dailyForecast.maxTemp.length),
        }).map((_, index) => {
          const date = new Date();
          date.setDate(date.getDate() + index);
          const dayName =
            index === 0
              ? "Today"
              : date.toLocaleDateString("en-US", {
                  weekday: "short",
                });
          return (
            <div key={index} className="weather__daily-card">
              <div className="weather__daily-day">{dayName}</div>
              <img 
              src={getWeatherIcon(dailyForecast.weather_code[index])} 
              alt="weather icon"
              className="weather__daily-icon"
              />

              <div className="weather__daily-temps">
                <div className="weather__daily-high">
                  {Math.round(convertTemp(dailyForecast.maxTemp[index], unit))}°
                  {unit === "metric" ? "C" : "F"}
                </div>
                <div className="weather__daily-low">
                  {Math.round(convertTemp(dailyForecast.minTemp[index], unit))}°
                  {unit === "metric" ? "C" : "F"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default DailyForecast;
