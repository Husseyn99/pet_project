import React from "react";

import searchIcon from "../../assets/img/search_icon.png";
import deleteIcon from "../../assets/img/delete_icon.png";

import styles from "./Search.module.scss";

const Search = ({ searchValue, setSearchValue }) => {
  return (
    <div className={styles.root}>
      <div>
        <img src={searchIcon} alt="search_icon" />
      </div>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={styles.input}
        type="text"
        placeholder="Поиск пицц..."
      />
      {searchValue && (
        <div onClick={() => setSearchValue("")}>
          <img src={deleteIcon} alt="delete_icon" />
        </div>
      )}
    </div>
  );
};

export default Search;
