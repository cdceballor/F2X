import axios from "axios";
import { useEffect, useState } from "react";
import { API, API_KEY } from "../constants/apis";

type UseGetAllMoviesProps = {
  Response: string;
  Search: MoviesListProps[];
  totalResults: string;
};

export type MoviesListProps = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

/**
 * Custom React hook that fetches all movies and series from the OMDB API and returns them along with highlighted movies.
 *
 * @return {Object} An object containing the following properties:
 *   - movies: An array of MoviesListProps representing all movies and series.
 *   - hotMovies: An array of MoviesListProps representing highlighted movies.
 *   - loadingMovie: A boolean indicating whether the movies are currently being loaded.
 *   - allSeries: An array of MoviesListProps representing 10 random series.
 */
function useGetAllMovies() {
  const [movies, setMovies] = useState<MoviesListProps[]>([]);
  const [hotMovies, setHotMovies] = useState<MoviesListProps[]>([]);
  const [allSeries, setAllMovies] = useState<MoviesListProps[]>([]);
  const [loadingMovie, setLoadingMovie] = useState(false);

  const getAllMoviesAndSeries = async () => {
    setLoadingMovie(true);
    try {
      const moviesPromise = axios.get<UseGetAllMoviesProps>(API, {
        params: {
          apikey: API_KEY,
          s: "movie",
          y: "2024",
          type: "movie",
        },
      });

      const seriesPromise = axios.get<UseGetAllMoviesProps>(API, {
        params: {
          apikey: API_KEY,
          s: "series",
          y: "2024",
          type: "series",
        },
      });

      // NOTE: We decide to use allSettled because if in case that a request fails, we want to continue with the other requests
      const results = await Promise.allSettled([moviesPromise, seriesPromise]);

      // NOTE: Combine the results
      const combinedResults: MoviesListProps[] = results.reduce(
        (accumulator, result) => {
          if (result.status === "fulfilled") {
            const searchData = result.value.data.Search || [];
            return [...accumulator, ...searchData];
          } else {
            return accumulator;
          }
        },
        [] as MoviesListProps[]
      );

      setMovies(combinedResults);
    } catch (error) {
      setLoadingMovie(false);
    } finally {
      setLoadingMovie(false);
    }
  };

    /**
     * Fetches highlighted movies from the API and updates the state with the results.
     *
     * @return {Promise<void>} A promise that resolves when the highlighted movies have been fetched and the state has been updated.
     */
  const getHighlightedMovies = async () => {
    setLoadingMovie(true);
    try {
      // NOTE: Get the current date in ISO format (YYYY-MM-DD)
      const today = new Date().toISOString().slice(0, 10);
      const response = await axios.get<UseGetAllMoviesProps>(API, {
        params: {
          apikey: API_KEY,
          s: "star",
          y: today,
        },
      });

      if (response.data.Response === "True") {
        setHotMovies(response.data.Search);
      } else {
        setHotMovies([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingMovie(false);
    }
  };

  /**
   * A function that fetches random series from the API and sets them in the state after shuffling the results.
   *
   * @return {void} No return value.
   */
  const getRandomSeries = async () => {
    try {
      const response = await axios.get<UseGetAllMoviesProps>(API, {
        params: {
          apikey: API_KEY,
          s: "series",
          type: "series",
        },
      });

      if (response.data.Response === "True") {
        // Shuffle the results to get random series
        const shuffledResults = shuffleArray(response.data.Search || []).slice(0, 10);
        setAllMovies(shuffledResults);
      } else {
        setAllMovies([]);
      }
    } catch (error) {
      setAllMovies([]);
    }
  };

  /**
   * Helper function to shuffle an array of MoviesListProps
   *
   * @param {MoviesListProps[]} array - The array to be shuffled
   * @return {MoviesListProps[]} - The shuffled array
   */
  const shuffleArray = (array: MoviesListProps[]) => {
    // Create a shallow copy of the input array
    const shuffledArray = [...array];

    // Perform the Fisher-Yates shuffle algorithm to shuffle the array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    // Return the shuffled array
    return shuffledArray;
  };

  // NOTE: Get all movies, highlighted movies and random series
  useEffect(() => {
    getAllMoviesAndSeries();
    getHighlightedMovies();
    getRandomSeries();
  }, []);

  return { movies, hotMovies, allSeries, loadingMovie };
}

export default useGetAllMovies;
