import iconSunny from "/assets/images/icon-sunny.webp";
import iconPartlyCloudy from "/assets/images/icon-partly-cloudy.webp";
import iconOvercast from "/assets/images/icon-overcast.webp";
import iconRain from "/assets/images/icon-rain.webp";
import iconDrizzle from "/assets/images/icon-drizzle.webp";
import iconSnow from "/assets/images/icon-snow.webp";
import iconFog from "/assets/images/icon-fog.webp";
import iconStorm from "/assets/images/icon-storm.webp";


export const getWeatherIcon = (code: number): string => {
  if (code === 0) return iconSunny;
  if (code === 1 || code === 2) return iconPartlyCloudy;
  if (code === 3) return iconOvercast;
  if (code >= 45 && code <= 48) return iconFog;
  if (code >= 51 && code <= 57) return iconDrizzle;
  if (code >= 61 && code <= 67) return iconRain;
  if (code >= 71 && code <= 77) return iconSnow;
  if (code >= 80 && code <= 82) return iconRain;
  if (code >= 85 && code <= 86) return iconSnow;
  if (code >= 95) return iconStorm;
  return iconOvercast;
};