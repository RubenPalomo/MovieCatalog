import React, { useState, useEffect, useRef } from "react";
import { useIsVisible } from "react-is-visible";
import axios from "axios";
import Header from "./../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MovieCard from "../../components/MovieCard/MovieCard";
import PlatformCard from "../../components/PlatformCard/PlatformCard";
import returnImg from "./../../assets/returnImg.png";
import "./Home.scss";

function Home() {
  const APIKey = "oj9hXQszaFkcPFimmv4e0a9aTCOvF4GFlibJQSCu";
  const baseURLPlatforms = `https://api.watchmode.com/v1/sources/?apiKey=${APIKey}`;
  const baseURLMovies = `https://api.watchmode.com/v1/list-titles/?apiKey=${APIKey}`;
  const searchURL = `https://api.watchmode.com/v1/search/?apiKey=${APIKey}&search_field=name&search_value=`;
  const nodeRef = useRef();
  const isVisible = useIsVisible(nodeRef);
  const [search, setSearch] = useState();
  const [platforms, setPlatforms] = useState([]);
  const [movies, setMovies] = useState([{ title: "Loading..." }]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value == "") {
      setMovies([{ title: "Loading..." }]);
      axios
        .get(baseURLMovies)
        .then((response) => setMovies(response.data.titles));
    } else {
      axios.get(searchURL + e.target[0].value).then((response) => {
        let result = response.data.title_results;
        result.map((element) => (element.title = element.name));

        setMovies(result);
      });
    }
  };

  // Get the films
  useEffect(() => {
    axios
      .get(baseURLMovies)
      .then((response) => setMovies(response.data.titles));
  }, []);

  // Get the different platforms
  useEffect(() => {
    axios.get(baseURLPlatforms).then((response) => setPlatforms(response.data));
  }, []);

  return (
    <div className="home-container">
      <Header changeSearch={setSearch} />
      <div className="scroll">
        <h1 id="title" ref={nodeRef}>
          {search != "platforms" ? "Movies" : "Platforms"}
        </h1>
        {search != "platforms" ? (
          <form onSubmit={handleSubmit}>
            <input></input>
            <button type="submit">Search</button>
          </form>
        ) : (
          <p />
        )}
        {search != "platforms"
          ? movies.map((element) => (
              <MovieCard
                key={element.id}
                APIKey={APIKey}
                id={element.id}
                title={element.title}
                year={element.year}
                type={element.type}
              />
            ))
          : platforms.map((element) => (
              <PlatformCard
                key={element.id}
                name={element.name}
                logo={element.logo_100px}
                url={element.ios_appstore_url}
              />
            ))}
        <a href="#title">
          {!isVisible && <img className="returnImg" src={returnImg} />}
        </a>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
