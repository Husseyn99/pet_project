import React from "react";
import { Route, Routes } from "react-router-dom";

import NotFound from "./components/NotFound";
import PizzaPage from "./components/PizzaPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";

import MainLayout from "./layouts/MainLayout";

import "./scss/app.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="/pizzaPage/:id" element={<PizzaPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      ;
    </>
  );
}

export default App;
