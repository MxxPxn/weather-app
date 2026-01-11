# Weather App

A modern, responsive weather application built with React, TypeScript, and Vite. Get real-time weather information, forecasts, and detailed metrics for any location worldwide.

![Weather App Preview](./preview.jpg)

## 🌟 Features

### Current Weather
- **Real-time weather conditions** with location detection
- **Featured temperature card** with weather icons
- **Feels Like temperature** - apparent temperature based on wind chill and humidity
- **Humidity percentage** - current moisture level in the air
- **Wind speed** - with unit conversion (km/h or mph)
- **Rain chance** - precipitation probability percentage

### Weather Forecasts
- **Hourly forecast** - 8-hour forecast with temperature and weather icons
- **Daily forecast** - 7-day forecast with high/low temperatures
- **Weather icons** - dynamic icons based on weather conditions (sunny, cloudy, rain, snow, fog, storm)

### User Experience
- **Location auto-detection** - automatically fetches weather for your current location
- **City search** - search for weather in any city worldwide
- **Enter key support** - press Enter to search
- **Unit switching** - toggle between Metric (°C, km/h, mm) and Imperial (°F, mph, inch)
- **Responsive design** - optimized layouts for mobile and desktop
- **Error handling** - comprehensive error messages with retry functionality
- **Loading states** - smooth loading overlay while fetching data

## 🚀 Live Demo

[View Live App](https://weather-app-s1im.vercel.app/)

## 🛠️ Built With

- **React 18** - UI library
- **TypeScript** - type-safe JavaScript
- **Vite** - fast build tool and dev server
- **OpenMeteo API** - weather data provider
- **CSS3** - custom styling with Grid and Flexbox
- **Vercel** - deployment platform

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/MxxPxn/weather-app.git
cd weather-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📱 Responsive Design

### Mobile
- Vertical stack layout
- Touch-optimized buttons
- Full-width weather cards

### Desktop (992px+)
- Two-column grid layout
- Featured weather and info cards on the left
- Hourly forecast sidebar on the right
- Daily forecast below
- Centered search bar and title

## 🎨 Component Structure

```
src/
├── components/
│   ├── Header/           # App logo and unit switcher
│   ├── SearchBar/        # City search input and button
│   ├── CurrentWeather/   # Featured temp card + info cards
│   ├── HourlyForecast/   # 8-hour forecast list
│   └── DailyForecast/    # 7-day forecast grid
├── utils/
│   ├── weatherAPI.tsx    # OpenMeteo API integration
│   ├── weatherIcons.tsx  # Weather code to icon mapping
│   └── Convert.tsx       # Unit conversion utilities
├── App.tsx               # Main app component
├── App.css               # Global styles and grid layout
└── style.css             # Font and CSS reset
```

## 🌐 API Integration

This app uses the [Open-Meteo API](https://open-meteo.com/) for weather data:

- **Current weather**: temperature, humidity, wind speed, rain chance, feels like
- **Hourly forecast**: 8 hours of temperature and precipitation data
- **Daily forecast**: 7-day high/low temperatures and weather codes
- **Geocoding**: city name to coordinates conversion

## 🎯 Key Features Implemented

✅ Geolocation API for auto-detection
✅ City search with geocoding
✅ Metric/Imperial unit conversion
✅ Error handling with retry functionality
✅ Loading states with spinner overlay
✅ Responsive grid layout (mobile & desktop)
✅ Enter key search support
✅ Weather icons for all conditions
✅ Feels like temperature
✅ Rain chance percentage
✅ Custom font (Bricolage Grotesque)

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Max**
- GitHub: [@MxxPxn](https://github.com/MxxPxn)

## 🙏 Acknowledgments

- Weather data provided by [Open-Meteo API](https://open-meteo.com/)
- Design inspired by Frontend Mentor challenge
- Icons and assets from the original design

## 📚 Useful Resources

### Documentation & References
- [React Documentation](https://react.dev/) - Official React docs
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript guide
- [Vite Documentation](https://vitejs.dev/) - Vite build tool docs
- [MDN Web Docs](https://developer.mozilla.org/) - Web development reference

### Learning Platforms
- [W3Schools](https://www.w3schools.com/) - Web development tutorials
- [GeeksforGeeks](https://www.geeksforgeeks.org/) - Programming tutorials and articles
- [freeCodeCamp](https://www.freecodecamp.org/) - Free coding courses
- [JavaScript.info](https://javascript.info/) - Modern JavaScript tutorial

### CSS & Design
- [CSS-Tricks](https://css-tricks.com/) - CSS tips and techniques
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - Complete guide to Flexbox
- [Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/) - Complete guide to CSS Grid
- [Can I Use](https://caniuse.com/) - Browser compatibility checker

### API & Data
- [Open-Meteo API Docs](https://open-meteo.com/en/docs) - Weather API documentation
- [Postman](https://www.postman.com/) - API testing tool

---

**Built with ❤️ using React + TypeScript + Vite**
