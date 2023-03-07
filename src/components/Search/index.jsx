import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import searchIcon from "../../assets/img/search_icon.png";
import deleteIcon from "../../assets/img/delete_icon.png";

import { setSearchValue } from "../../redux/slices/filterSlice";

import styles from "./Search.module.scss";

const Search = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState("");

  const inputRef = useRef();

  const handleSetSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 500),
    []
  );

  const handleClearInput = () => {
    setValue("");
    dispatch(setSearchValue(""));
    inputRef.current.focus();
  };

  const handleChangeInput = (e) => {
    setValue(e.target.value);
    handleSetSearchValue(e.target.value);
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
