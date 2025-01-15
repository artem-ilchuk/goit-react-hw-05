import s from "./MovieDetailsPage.module.css";
import { useState, useEffect, useRef } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchMovieById } from "../../services/tmdb-api";
import Loader from "../../components/Loader/Loader";

const MovieDetailsPage = () => {
  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();

  const goBackRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    const getData = async () => {
      if (!movieId) return;
      try {
        setIsLoading(true);
        setError(false);
        const movie = await fetchMovieById(movieId);
        setMovie(movie);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch movie details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [movieId]);

  if (!movie) {
    return <Loader />;
  }
  return (
    <section className={s.details}>
      <NavLink to={goBackRef.current} className={s.goBackLink}>
        Go back
      </NavLink>
      <div className={s.description}>
        <div className={s.card}>
          <img
            src={
              movie.poster_path
                ? `${BASE_IMAGE_URL}${movie.poster_path}`
                : defaultImg
            }
            width={200}
            alt={`${movie.title || "Movie"} poster`}
            className={s.img}
          />
          <h2 className={s.card_title}>{movie.title}</h2>
        </div>
        <div className={s.about}>
          <h2 className={s.movie_title}>{movie.title}</h2>
          <p>Realease date: {movie.release_date || "Unknown"}</p>
          <p>Score: {movie.vote_average || "Unknown"}</p>
          <p>Overview: {movie.overview || "Unknown"}</p>
        </div>
      </div>
      <nav className={s.navi}>
        <Link to="cast" className={s.link}>
          Cast
        </Link>
        <Link to="reviews" className={s.link}>
          Reviews
        </Link>
      </nav>
      <div>
        <Outlet />
      </div>
      {isLoading && <Loader />}
      {error && <h2>{error}</h2>}
    </section>
  );
};

export default MovieDetailsPage;
