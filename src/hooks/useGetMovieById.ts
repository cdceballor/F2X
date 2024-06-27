import axios from "axios";
import { useEffect, useState } from "react";
import { API, API_KEY } from "../constants/apis";

type UseGetMovieById = {
  id: string;
};

export type MovieProps = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: RatingProps[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export type RatingProps = {
  Source: string;
  Value: string;
};

/**
 * Asynchronously fetches a movie by its ID from the API and updates the state with the results.
 *
 * @param {UseGetMovieById} param - An object containing the ID of the movie to fetch.
 * @param {string} param.id - The ID of the movie to fetch.
 * @return {Object} An object containing the fetched movie and a loading state.
 * @property {MovieProps} movie - The fetched movie.
 * @property {boolean} loading - Indicates whether the movie is currently being fetched.
 */
function useGetMovieById({ id }: UseGetMovieById) {
  const [movie, setMovie] = useState<MovieProps>({} as MovieProps);
  const [loading, setLoading] = useState(false);

  /**
   * Asynchronously fetches a movie by its ID from the API and updates the state with the results.
   *
   * @return {Promise<void>} A promise that resolves when the movie has been fetched and the state has been updated.
   */
  const getMovieById = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<MovieProps>(API, {
        params: {
          apikey: API_KEY,
          i: id,
        },
      });
      setMovie(data);
    } catch (error) {
      console.error("Error fetching movie:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieById();
  }, [id]);

  return { movie, loading };
}

export default useGetMovieById;
