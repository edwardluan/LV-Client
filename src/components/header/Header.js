import React from "react";
import logo from "../../images/logo.png"; 
import Menu from "./Menu";
import { Link } from "react-router-dom";
import Search from "./Search";
import "../../styles/Header.css";

const Header = () => {
  return (
    <div className="header">
      <nav className="navbar px-4">
        <Link className="navbar-brand" to="/" onClick={() => window.scrollTo({top: 0})}>
          <div className="logo-container">
            <img src={logo} alt="logo" height={70} />
            <p>FIXNOW</p>
          </div>
        </Link>
        <Search />
        <Menu />
      </nav>
    </div>
  );
};

export default Header;
