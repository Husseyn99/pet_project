import React from "react";

import Header from "./components/Header";
import NotFound from "./components/NotFound";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";

import { Route, Routes } from "react-router-dom";

import "./scss/app.scss";

function App() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      ;
    </>
  );
}

export default App;
