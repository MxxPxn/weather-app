type HeaderProps = {
    unit: 'metric' | 'imperial';
    onUnitToggle: () => void;
  };

  function Header({ unit, onUnitToggle }: HeaderProps) {
    return (
      
         <div className="weather__header">
          <div className="weather__logo">Weather Now</div>
          <button
            className="weather__units"
            onClick={onUnitToggle}>
            {unit === "metric" ? "°C / km/h" : "°F / mph"}
          </button>
        </div>
    )
  }
export default Header;