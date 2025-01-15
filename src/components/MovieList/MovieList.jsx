import s from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";

const MovieList = ({ movies }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/w200";
  const defaultImg =
    "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";
  const location = useLocation();
  if (!movies) {
    return <Loader />;
  }
  return (
    <section className={s.movies}>
      <ul className={s.list}>
        {movies.map((movie) => (
          <li key={movie.id} className={s.item}>
            <Link
              to={`/movies/${movie.id}`}
              state={location}
              className={s.link}
            >
              <img
                src={
                  movie.poster_path
                    ? `${BASE_URL}${movie.poster_path}`
                    : defaultImg
                }
                width={200}
                alt="poster"
                className={s.img}
              />
              <div className={s.desc}>
                <p className={s.title}>{movie.title || "Untitled Movie"}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MovieList;
