import React, { useCallback, useContext, useRef, useState } from "react";
import debounce from "lodash.debounce";

import { SearchContext } from "../../App";

import searchIcon from "../../assets/img/search_icon.png";
import deleteIcon from "../../assets/img/delete_icon.png";

import styles from "./Search.module.scss";

const Search = () => {
  const { setSearchValue } = useContext(SearchContext);

  const [value, setValue] = useState("");

  const inputRef = useRef();

  const handleSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 500),
    []
  );

  const handleClearInput = () => {
    setValue("");
    setSearchValue("");
    inputRef.current.focus();
  };

  const handleChangeInput = (e) => {
    setValue(e.target.value);
    handleSearchValue(e.target.value);
  };

  return (
    <div className={styles.root}>
      <div>
        <img src={searchIcon} alt="search_icon" />
      </div>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => handleChangeInput(e)}
        className={styles.input}
        type="text"
        placeholder="Поиск пицц..."
      />
      {value && (
        <div onClick={handleClearInput}>
          <img src={deleteIcon} alt="delete_icon" />
        </div>
      )}
    </div>
  );
};

export default Search;
