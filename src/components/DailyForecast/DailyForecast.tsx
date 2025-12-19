import { convertTemp } from "../../utils/Convert";

type DailyForecastProps = {
  dailyForecast: {
    date: string;
    minTemp: number[];
    maxTemp: number[];
    precipitation: number[];
  };
  unit: "metric" | "imperial";
};

function DailyForecast({ dailyForecast, unit }: DailyForecastProps) {
  return (
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
  );
}
export default DailyForecast;
