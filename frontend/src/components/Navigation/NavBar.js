import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="title">
        [Home]
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/Marketplace">Marketplace</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
