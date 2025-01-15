import { useEffect, useState } from "react";
import { FcSearch } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { fetchSearchMovie } from "../../services/tmdb-api";
import s from "./MoviesPage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [queryInput, setQueryInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    const getData = async () => {
      if (!query) return;
      try {
        setIsLoading(true);
        const data = await fetchSearchMovie(query);
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [query]);

  const handleChangeQuery = (newQuery) => {
    if (newQuery.trim() === "") {
      toast.error("Plese fill in the search movie field.");
      return;
    }
    if (newQuery === query) {
      toast.error("Please change query!.");
      return;
    }
    setSearchParams({ query: newQuery });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChangeQuery(queryInput);
  };

  return (
    <section className={s.looks}>
      <div className={s.bar}>
        <form onSubmit={handleSubmit} className={s.form}>
          <div className={s.inputWrapper}>
            <input
              className={s.input}
              onChange={(e) => setQueryInput(e.target.value)}
              value={queryInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search movies"
            />
            <FcSearch className={s.search} size={32} onClick={handleSubmit} />
          </div>
        </form>
      </div>
      <MovieList movies={movies} />
      {isLoading && <Loader />}
    </section>
  );
};

export default MoviesPage;
