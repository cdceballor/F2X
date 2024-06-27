// CarouselForMovies.tsx
import { Box, Paper, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import "./CarouselStyles.css";

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

interface CarouselForMoviesProps {
  movies: Movie[];
  title: string;
}

const CarouselForMovies = ({ movies, title }: CarouselForMoviesProps) => {
  return (
    <Paper sx={{ p: 2, mb: 1 }} elevation={3}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ textAlign: "center", backgroundColor: "black", color: "white" }}
      >
        {title}
      </Typography>
      <Carousel autoPlay>
        {movies.map((movie) => (
          <Paper key={movie.imdbID} elevation={3}>
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="carousel-image"
            />
            <Box sx={{ textAlign: "center", p: 2 }}>
              <Typography variant="h6">
                {movie.Title} ({movie.Year})
              </Typography>
            </Box>
          </Paper>
        ))}
      </Carousel>
    </Paper>
  );
};

export default CarouselForMovies;
