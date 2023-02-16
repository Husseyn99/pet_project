import React, { useState } from "react";

import Header from "./components/Header";
import NotFound from "./components/NotFound";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";

import { Route, Routes } from "react-router-dom";

import "./scss/app.scss";

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div className="wrapper">
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              }
            />
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
