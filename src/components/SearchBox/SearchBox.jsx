import s from "./SearchBox.module.css";
const SearchBox = ({ searchTerm, onSearchChange }) => {
  return (
    <div>
      <div>
        <input
          onChange={onSearchChange}
          value={searchTerm}
          placeholder="пошук"
          className={s.inputSearchIcon}
          type="text"
          name="searchInput"
        />
      </div>
    </div>
  );
};

export default SearchBox;
