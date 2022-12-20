import React from "react";
import "./PlatformCard.scss";

function PlatformCard(props) {
  const goTo = () => window.open(props.url, "_blank");
  return (
    <div className="main-container">
      <div className="card-container" onClick={goTo}>
        <img className="imgPlatform" src={props.logo} />
        <p> {props.name}</p>
      </div>
    </div>
  );
}

export default PlatformCard;
