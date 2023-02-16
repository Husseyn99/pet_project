import React, { useEffect, useState } from "react";

import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";

const HomePage = ({ searchValue, setSearchValue }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [selected, setSelected] = useState({
    name: "популярности",
    typeProperty: "rating",
  });

  const category = activeCategory ? `category=${activeCategory}` : "";
  const order = selected.typeProperty.includes("-") ? "asc" : "desc";
  const sortBy = selected.typeProperty.replace("-", "");
  const search = searchValue ? `&search=${searchValue}` : "";

  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  useEffect(() => {
    setIsloading(true);
    fetch(
      `https://629601fd810c00c1cb6d3288.mockapi.io/items?limit=4&page=${currentPage}${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data);
        setIsloading(false);
      });
  }, [order, category, sortBy, search, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <Sort selected={selected} setSelected={setSelected} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? skeleton
          : pizzas.map((pizza) => {
              return <PizzaBlock key={pizza.id} {...pizza} />;
            })}
      </div>
      <Pagination setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default HomePage;
