import './Header.css';

type HeaderProps = {
    unit: 'metric' | 'imperial';
    onUnitToggle: () => void;
  };

  function Header({ unit, onUnitToggle }: HeaderProps) {
    return (
      
         <div className="weather__header">
          <img className='weather__logo' src="/assets/images/logo.svg" alt="" />
          <button
            className="weather__units"
            onClick={onUnitToggle}>
            <img className="weather__units-icon" src='/assets/images/icon-units.svg' alt="units" />
            {unit === "metric" ? "°C / km/h" : "°F / mph"}
          </button>
        </div>
    )
  }
export default Header;