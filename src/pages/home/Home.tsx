import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import CarouselForMovies from "../../components/carouser/Carousel";
import SearchBar from "../../components/SearchBar";
import CarouselSkeleton from "../../components/skeletons/CarouselSkeleton";
import useGetAllMovies, { MoviesListProps } from "../../hooks/useGetAllMovies";
import NoMoviesJet from "../movies/NoMoviesJet";
import ShowMoviesInCards from "../movies/ShowMoviesInCards";

const Home: React.FC = () => {
  const [searchResults, setSearchResults] = useState<MoviesListProps[]>([]);
  const { movies, hotMovies, loadingMovie } = useGetAllMovies();

  return (
    <Box sx={{ position: "relative", height: "100vh", paddingTop: "64px" }}>
      <Box
        sx={{ position: "absolute", top: 0, left: 0, width: "100%", zIndex: 1 }}
      >
        <SearchBar setSearchResults={setSearchResults} />
      </Box>
      <Grid
        container
        spacing={2}
        sx={{ height: "calc(100vh - 64px)", paddingTop: "64px" }}
      >
        <Grid item xs={4}>
          {loadingMovie ? (
            <>
              <CarouselSkeleton />
              <CarouselSkeleton />
            </>
          ) : (
            <>
              <CarouselForMovies
                movies={hotMovies}
                title="Te recomendamos ..."
              />
              <CarouselForMovies movies={movies} title="Estrenos y Anuncios" />
            </>
          )}
        </Grid>
        <Grid item xs={8}>
          {searchResults.length === 0 ? (
            <NoMoviesJet />
          ) : (
            <ShowMoviesInCards
              movies={searchResults}
              loadingMovies={loadingMovie}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
