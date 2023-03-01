import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

const Pagination = ({ setCurrentPage, currentPage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => setCurrentPage(e.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
