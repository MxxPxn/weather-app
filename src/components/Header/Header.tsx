import './Header.css';

type HeaderProps = {
    unit: 'metric' | 'imperial';
    onUnitToggle: () => void;
  };

  function Header({ unit, onUnitToggle }: HeaderProps) {
    return (
      
         <div className="weather__header">
          <img className='weather__logo' src="/assets/images/logo.svg" alt="" />

          <div className="weather__units-container">
            <img className="weather__units-icon" src='/assets/images/icon-units.svg' alt="units" />
            <select
              name="units"
              id="units"
              onChange={onUnitToggle}
              className="weather__units"
              value={unit}
            >
              <option value="metric">°C Km/H</option>
              <option value="imperial">°F Mph</option>
            </select>
          </div>
        </div>
    )
  }
export default Header;