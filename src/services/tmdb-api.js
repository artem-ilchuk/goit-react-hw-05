import axios from "axios";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmI4ZDU2ZjUyM2ZkZGFkN2IwNDk3YzkxZjU1MDljYyIsIm5iZiI6MTczNjM0MDU4My41NTUsInN1YiI6IjY3N2U3NDY3YjExZDA4ODExMTdiMGQ4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ErEJZJCVBs7RJpuYS50vsXTBwV5Km9x9E7MQ_AfCdbY";
const BASE_URL = "https://api.themoviedb.org/3";
const options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
  params: {
    language: "en-US",
  },
};

export const fetchTrendMovies = async () => {
  const { data } = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return data.results;
};

export const fetchMovieById = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/movie/${id}`, options);
  return data;
};

export const fetchCastMovieById = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/movie/${id}/credits`, options);
  return data.cast;
};

export const fetchReviewsMovieById = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/movie/${id}/reviews`, options);
  return data.results;
};

export const fetchSearchMovie = async (query) => {
  const { data } = await axios.get(
    `${BASE_URL}/search/movie?query=${query}&include_adult=false&page=1`,
    options
  );
  return data.results;
};
