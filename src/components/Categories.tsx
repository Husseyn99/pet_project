import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectFilter, setCategory } from "../redux/slices/filterSlice";

const Categories: React.FC = () => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const dispatch = useDispatch();
  const { activeCategory } = useSelector(selectFilter);

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => {
          return (
            <li
              key={category}
              onClick={() => dispatch(setCategory(i))}
              className={activeCategory === i ? "active" : ""}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
