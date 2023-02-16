import React, { useState } from "react";

import Header from "./components/Header";
import NotFound from "./components/NotFound";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";

import { Route, Routes } from "react-router-dom";

import "./scss/app.scss";

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div className="wrapper">
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
      ;
    </>
  );
}

export default App;
