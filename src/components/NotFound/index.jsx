import React from "react";

import styles from './NotFound.module.scss'

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <span>😕</span>
      <p>К сожалению ничего не найдено</p>
    </div>
  );
};

export default NotFound;
