import { convertTemp } from "../../utils/Convert";

type HourlyForecastProps = {
  hourlyForecast: {
    time: Date[];
    temperature: number[];
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
      {hourlyForecast.time.map((time: Date, index: number) => (
        <div key={index}>
          {time
            .toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
              timeZone: timezone,
            })
            .slice(0, 5)}
          —{Math.round(convertTemp(hourlyForecast.temperature[index], unit))}°
          {unit === "metric" ? "C" : "F"}
        </div>
      ))}
    </div>
  );
}
export default HourlyForecast;
