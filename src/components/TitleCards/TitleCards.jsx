import React, { useEffect, useRef, useState } from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import "./TitleCards.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faCircleArrowLeft, faCircleArrowRight);

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const btnLeft = () => {
    cardsRef.current.scrollLeft += -150
  }

  const btnRight = () => {
    cardsRef.current.scrollLeft += 150
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDE2NjM2YzlhYjI1MDBmNDI2YTY0NTE1MDQyYjM2NCIsIm5iZiI6MTcyMDY0OTc3MC42MTgwMTEsInN1YiI6IjY2OGYwNzA3MjUyNDlkNGY3N2NlMzVhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FYHtLZYSWT80M2qhf-0kmQFuzMCgOWTfrCktQIn3v0k",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    // cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results))
      .catch((err) => console.error(err));

    // cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <FontAwesomeIcon className="btns left-btn" onClick={btnLeft} icon="fa-solid fa-circle-arrow-left" />
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
      <FontAwesomeIcon className="btns right-btn" onClick={btnRight} icon="fa-solid fa-circle-arrow-right" />
    </div>
  );
};

export default TitleCards;
