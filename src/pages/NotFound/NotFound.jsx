import React from "react";
import omgIcon from "./../../assets/omg-icon.png";
import "./NotFound.scss";

function NotFound() {
  return (
    <div className="error404">
      <h1>Error 404</h1>
      <h2>Page not found</h2>
      <img src={omgIcon} />
    </div>
  );
}

export default NotFound;
