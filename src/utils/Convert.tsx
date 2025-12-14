export const convertTemp = (celsuis: number, unit: 'metric' | 'imperial'): number => {
  if (unit === 'imperial') {
    return celsuis * 9/5 + 32; // Convert to Fahrenheit
  }
  return celsuis; // Return Celsius
};
 export const convertSpeed = (kmh: number, unit: 'metric' | 'imperial'): number => {
  if (unit === 'imperial') {
    return kmh * 0.621371; // Convert to mph
  }
  return kmh; // Return km/h
}
export const convertPrecipitation = (mm: number, unit: 'metric' | 'imperial'): number => {
  if (unit === 'imperial') {
    return mm * 0.0393701; // Convert to inches
  }
  return mm; // Return mm
}

export const getTempUnit = (unit: 'metric' | 'imperial'): string => {
  return unit === 'imperial' ? '°F' : '°C';
}
export const getSpeedUnit = (unit: 'metric' | 'imperial'): string => {
  return unit === 'imperial' ? 'mph' : 'km/h';
}

export const getPrecipitationUnit = (unit: 'metric' | 'imperial'): string => {
  return unit === 'imperial' ? 'inches' : 'mm';
}