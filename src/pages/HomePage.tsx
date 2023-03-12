import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";

import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort, { sortlist } from "../components/Sort";

import {
  selectFilter,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSearched = useRef(false);
  const isMounted = useRef(false);

  const { searchValue } = useSelector(selectFilter);

  const { items, status } = useSelector(selectPizzaData);

  const { activeCategory, sort, currentPage } = useSelector(selectFilter);

  const category = activeCategory > 0 ? `category=${activeCategory}` : "";
  const order = sort.sortProperty.includes("-") ? "asc" : "desc";
  const sortProperty = sort.sortProperty.replace("-", "");
  const search = searchValue ? `&search=${searchValue}` : "";

  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = () => {
    dispatch(
      //@ts-ignore
      fetchPizzas({ category, order, sortProperty, search, currentPage })
    );
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

      navigate(`/?${query}`);
    }

    isMounted.current = true;
  }, [sortProperty, currentPage, navigate, activeCategory]);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    getPizzas();

    isSearched.current = false;
  }, [order, category, sortProperty, search, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" && (
        <div className="content__error">
          <h2>Произошла ошибка 😕</h2>
          <p>Попробуйте повторить попытку позже.</p>
        </div>
      )}
      <div className="content__items">
        {status === "loading"
          ? skeleton
          : items.map((pizza: any) => {
              return <PizzaBlock key={pizza.id} {...pizza} />;
            })}
      </div>
      <Pagination setCurrentPage={onChangePage} currentPage={currentPage} />
    </div>
  );
};

export default HomePage;
