import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";

import { SearchContext } from "../App";

import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort, { sortlist } from "../components/Sort";

import { setCurrentPage, setFilters } from "../redux/slices/filterSlice";

const HomePage = () => {
  const { searchValue } = useContext(SearchContext);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const { activeCategory, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSearched = useRef(false);
  const isMounted = useRef(false);

  const category = activeCategory > 0 ? `category=${activeCategory}` : "";
  const order = sort.sortProperty.includes("-") ? "asc" : "desc";
  const sortProperty = sort.sortProperty.replace("-", "");
  const search = searchValue ? `&search=${searchValue}` : "";

  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const fetchPizzas = () => {
    setIsloading(true);
    axios
      .get(
        `https://629601fd810c00c1cb6d3288.mockapi.io/items?limit=4&page=${currentPage}&${category}&sortBy=${sortProperty}&order=${order}${search}`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsloading(false);
      });
  };

  // Если был первый рендер, то проверяем параметры и сохраняем в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortlist.find(
        (el) => el.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );

      isSearched.current = true;
    }
  }, [dispatch]);

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const query = qs.stringify({
        activeCategory,
        sortProperty,
        currentPage,
      });

      navigate(`?${query}`);
    }

    isMounted.current = true;
  }, [sortProperty, currentPage, navigate, activeCategory]);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    if (!isSearched.current) {
      fetchPizzas();
    }

    isSearched.current = false;
  }, [order, category, sortProperty, search, currentPage]);

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
      <Pagination setCurrentPage={onChangePage} currentPage={currentPage} />
    </div>
  );
};

export default HomePage;
