import { convertTemp, convertSpeed, convertPrecipitation } from "../../utils/Convert";

type CurrentWeatherProps = {
    weatherData:{
        temperature: number;
        windSpeed: number;
        precipitation: number;
        humidity: number;
        rain: number;
    };
    unit: "metric" | "imperial";
};

 function CurrentWeather({ weatherData, unit }: CurrentWeatherProps) {
    return (
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
    );
}
export default CurrentWeather;
