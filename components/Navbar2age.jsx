"use client";

import { Search, ShoppingCart } from "lucide-react";

const Navbar2age = ({ onSearch, onCartClick }) => {

  return (

    <div className="navbar">

      {/* LOGO */}
      <h1 className="logo">
        SABO ADMIN
      </h1>


      {/* QIDIRUV */}
      <div className="search">

        <Search size={20} />

        <input
          type="text"
          placeholder="ID qidirish..."
          onChange={(e) => onSearch(e.target.value)}
        />

      </div>


      {/* LANG */}
      <select className="lang-select">

        <option>Uzb</option>

        <option>Rus</option>

      </select>


      {/* SAVATCHA */}
      <ShoppingCart

        size={30}

        onClick={onCartClick}

        style={{ cursor: "pointer" }}

      />

    </div>

  );

};

export default Navbar2age;