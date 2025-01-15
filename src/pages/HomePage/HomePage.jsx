import MovieList from "../../components/MovieList/MovieList";
import { useEffect, useState } from "react";
import { fetchTrendMovies } from "../../services/tmdb-api";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const moviesData = await fetchTrendMovies();
      setMovies(moviesData);
    };
    getData();
  }, []);
  return (
    <>
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;
