import { fetchWeatherApi } from "openmeteo";

export const processWeatherData = (response: any) => {
  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;
  const now = new Date(Date.now());
  const timezoneName = response.timezone();

  const allHourlyTimes = Array.from(
    { length: 168 },
    (_, i) => new Date((Number(hourly.time()) + i * hourly.interval()) * 1000)
  );
  const currentHour = allHourlyTimes.findIndex((time) => time >= now);

  const hourlyData = {
    time: allHourlyTimes.slice(currentHour, currentHour + 8),
    temperature:
      hourly
        .variables(0)
        ?.valuesArray()
        ?.slice(currentHour, currentHour + 8) ?? [],
    precipitation:
      hourly
        .variables(1)
        ?.valuesArray()
        ?.slice(currentHour, currentHour + 8) ?? [],
        weather_code:
        hourly
        .variables(2)
        ?.valuesArray()
        ?.slice(currentHour, currentHour + 8) ?? [],
  };

  const dailyData = {
    maxTemp: daily.variables(0)!.valuesArray(),
    minTemp: daily.variables(1)!.valuesArray(),
    precipitation: daily.variables(2)!.valuesArray(),
    weather_code: daily.variables(3)!.valuesArray(),
  };

  const weather = {
    temperature: current.variables(0)!.value(),
    humidity: current.variables(1)!.value(),
    windSpeed: current.variables(2)!.value(),
    feelsLike: current.variables(3)!.value(),
    rainChance: current.variables(4)!.value(),
    weather_code: current.variables(5)!.value(),
  };
  return {
    weatherData: weather,
    hourlyForecast: hourlyData,
    dailyForecast: dailyData,
    timezone: timezoneName,
  };
};

export const fetchWeather = async (latitude: number, longitude: number) => {
  const params = {
    latitude,
    longitude,
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "wind_speed_10m",
      "apparent_temperature",
      "precipitation_probability",
      "weather_code",
    ],
    hourly: ["temperature_2m", "precipitation", "weather_code"],
    daily: ["temperature_2m_max", "temperature_2m_min", "precipitation_sum", "weather_code"],
    forecast_days: 9,
    timezone: "auto",
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);
  return processWeatherData(responses[0]);
};

export const fetchWeatherByCity = async (city: string) => {
  const geoResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
  );
  const geoData = await geoResponse.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("City not found");
  }

  const { latitude, longitude } = geoData.results[0];
  return fetchWeather(latitude, longitude);
};
