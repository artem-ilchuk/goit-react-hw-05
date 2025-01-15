import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCastMovieById } from "../../services/tmdb-api";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w200";
  const defaultImg = "https://via.placeholder.com/200?text=No+Image";
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (!movieId) return;
      try {
        setIsLoading(true);
        setError(null);
        const fetchedCast = await fetchCastMovieById(movieId);
        setCast(fetchedCast);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movie cast. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [movieId]);

  if (isLoading) return <h2>Loading cast...</h2>;
  if (error) return <h2>{error}</h2>;
  if (cast.length === 0)
    return <h2>No cast information available for this movie.</h2>;

  return (
    <section className={s.additional}>
      <ul className={s.list}>
        {cast.map((member) => (
          <li key={member.id || member.cast_id} className={s.listItem}>
            <img
              src={
                member.profile_path
                  ? `${BASE_IMAGE_URL}${member.profile_path}`
                  : defaultImg
              }
              alt={member.name}
              width={100}
              height={150}
              className={s.img}
            />
            <p>
              <strong>{member.name}</strong>
            </p>
            <p>as {member.character || "Unknown role"}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MovieCast;
