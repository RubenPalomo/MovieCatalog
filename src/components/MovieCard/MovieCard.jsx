import React, { useState } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import "./MovieCard.scss";

function MovieCard(props) {
  const imgLink = `https://cdn.watchmode.com/posters/0${props.id}_poster_w185.jpg`;
  const infoLink = `https://api.watchmode.com/v1/title/${props.id}/details/?apiKey=${props.APIKey}&append_to_response=sources`;
  const [info, setInfo] = useState("");
  const getInfo = () =>
    axios.get(infoLink).then((response) => setInfo(response.data));

  const goToTrailer = () => window.open(info.trailer, "_blank");

  if (props.title == "Loading...")
    return (
      <div className="center">
        <div className="spinner" />
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className="main-container flex" onMouseEnter={getInfo}>
      <Popup
        position="center"
        trigger={
          <div className="card-container flex">
            <img className="imgMovie" src={imgLink} />
            <div className="info">
              <h3 className="props">{props.title}</h3>
              <p className="props">
                <strong>Year:</strong> {props.year}
              </p>
              <p className="props">
                <strong>Type:</strong> {props.type}
              </p>
            </div>
          </div>
        }
      >
        <div className="popup">
          <h3>{info.title}</h3>
          <hr />
          <div className="infoScroll">
            <p>
              <strong>Genre: </strong>
              {info.genre_names}
            </p>
            <p>
              <strong>Synopsis: </strong>
              {info.plot_overview}
            </p>
            {info.trailer && (
              <p className="linktrailer" onClick={goToTrailer}>
                Trailer
              </p>
            )}
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default MovieCard;
