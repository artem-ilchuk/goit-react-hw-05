import MovieList from "../../components/MovieList/MovieList";
import { useEffect, useState } from "react";
import { fetchTrendMovies } from "../../services/tmdb-api";
import s from "./HomePage.module.css";

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
    <section className={s.home}>
      <h2 className={s.title}>Trending today</h2>
      <MovieList movies={movies} />
    </section>
  );
};

export default HomePage;
