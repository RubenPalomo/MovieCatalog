import React from "react";
import pelisLogo from "./../../assets/pelis-logo.png";
import "./Header.scss";

function Header(props) {
  const changeSearch = props.changeSearch;
  const handleClick = (e) => changeSearch(e.target.textContent.toLowerCase());

  return (
    <div className="header-container">
      <div className="title-logo">
        <img className="logo" src={pelisLogo} />
        <h1 className="header-title">Pelis</h1>
      </div>
      <div className="hamburger-menu">
        <input id="menu__toggle" type="checkbox" />
        <label className="menu__btn" htmlFor="menu__toggle">
          <span></span>
        </label>

        <ul className="menu__box">
          <li>
            <p className="menu__item" onClick={handleClick}>
              Platforms
            </p>
          </li>
          <li>
            <p className="menu__item" onClick={handleClick}>
              Movies
            </p>
          </li>
          <li>
            <img src={pelisLogo} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
