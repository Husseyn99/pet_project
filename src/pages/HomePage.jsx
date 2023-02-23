import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { SearchContext } from "../App";

import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";

import { setCurrentPage } from "../redux/slices/filterSlice";

const HomePage = () => {
  const { searchValue } = useContext(SearchContext);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const { activeCategory, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  const dispatch = useDispatch();

  const category = activeCategory ? `&category=${activeCategory}` : "";
  const order = sort.typeProperty.includes("-") ? "asc" : "desc";
  const sortBy = sort.typeProperty.replace("-", "");
  const search = searchValue ? `&search=${searchValue}` : "";

  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    setIsloading(true);
    axios
      .get(
        `https://629601fd810c00c1cb6d3288.mockapi.io/items?limit=4&page=${currentPage}${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsloading(false);
      });
  }, [order, category, sortBy, search, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? skeleton
          : pizzas.map((pizza) => {
              return <PizzaBlock key={pizza.id} {...pizza} />;
            })}
      </div>
      <Pagination setCurrentPage={onChangePage} />
    </div>
  );
};

export default HomePage;
