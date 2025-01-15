import s from "./MovieReviews.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviewsMovieById } from "../../services/tmdb-api";
import Loader from "../Loader/Loader";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (!movieId) return;
      try {
        setIsLoading(true);
        setError(null);
        const fetchedReviews = await fetchReviewsMovieById(movieId);
        setReviews(fetchedReviews);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movie reviews. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [movieId]);

  if (isLoading) return <Loader />;
  if (error) return <h2>{error}</h2>;
  if (reviews.length === 0)
    return <h2>No reviews available for this movie.</h2>;

  return (
    <section className={s.reviews}>
      <ul className={s.list}>
        {reviews.map((review) => (
          <li key={review.id} className={s.item}>
            <p className={s.text}>
              <strong>Author:</strong> {review.author}
            </p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MovieReviews;
