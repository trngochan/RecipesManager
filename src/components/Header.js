import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li
              className={`nav-item ${
                location.pathname === "/" ? "active-custom" : ""
              }`}
            >
              <Link className="nav-link" to="/">
                Recipes Book
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/recipes" ? "active-custom" : ""
              }`}
            >
              <Link className="nav-link" to="/recipes">
                Recipes
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/shopping-list" ? "active-custom" : ""
              }`}
            >
              <Link className="nav-link" to="/shopping-list">
                Shopping List
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
