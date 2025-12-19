import './SearchBar.css'

type SearchBarProps = {
    city: string;
    onCityChange: (city: string) => void;
    onSearch: () => void;
  };

  function SearchBar ({ city, onCityChange, onSearch }: SearchBarProps) {
    return (
      <div className="weather__search">
          <input
            className="weather__search-input"
            type="text"
            placeholder="Search for a place..."
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
          />
          <button className="weather__search-btn" onClick={onSearch}>
            Search 
          </button>
        </div>
    );
    
}
export default SearchBar;