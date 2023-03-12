import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PizzaPage = () => {
  const [pizza, setPizza] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizzaById() {
      try {
        const { data } = await axios.get(
          `https://629601fd810c00c1cb6d3288.mockapi.io/items/${params.id}`
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при выполнении запроса");
        navigate("/");
      }
    }

    fetchPizzaById();
  }, []);

  if (!pizza) {
    return (
      <div className="container">
        <h1>Загрузка...</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h1>{pizza.title}</h1>
      <p>Цена {pizza.price} ₽</p>
    </div>
  );
};

export default PizzaPage;
