import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./App.css";
import SearchIcon from "./search.svg";
//de46b319 - api key

const API_URL = "http://www.omdbapi.com?apikey=de46b319";

const movie = {
  Title: "Superman, Spiderman or Batman",
  Year: "2011",
  imdbID: "tt2084949",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg",
};
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //creating afunction for which goona etch the movies
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`); // call API
    // Once we get the response we have to get data from it

    const data = await response.json();

    setMovies(data.Search); //we need it in movies arrays that is collecting a list of movies
  };

  //we need to fetch the data from the API as soon as the componenet load so for that we have used here the useeffect hook
  useEffect(() => {
    searchMovies("");
  }, []);

  return (
    <div className="app">
      <h1>Movies First</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <img src={SearchIcon}
         alt="search"
          onClick={() => searchMovies(searchTerm)}
           />
      </div>

      {movies?.length > 0 
      ? (
        <div className="container">
         {movies.map((movie)=>(
          <MovieCard movie={movie}/>
         ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Search for the series or movies</h2>
        </div>
      )}
    </div>
  );
};
export default App;
