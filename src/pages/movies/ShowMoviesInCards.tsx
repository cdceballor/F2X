import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import ShowMoviesInCardsSkeleton from "../../components/skeletons/ShowMoviesInCardsSkeleton";
import { MoviesListProps } from "../../hooks/useGetAllMovies";

interface ShowMoviesInCardsProps {
  movies: MoviesListProps[];
  loadingMovies: boolean;
}

const ShowMoviesInCards = ({
  movies,
  loadingMovies,
}: ShowMoviesInCardsProps) => {
  if (loadingMovies) {
    return <ShowMoviesInCardsSkeleton />;
  }

  return (
    <Grid container spacing={2}>
      {movies.map((movie) => (
        <Grid item key={movie.imdbID} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardActionArea component={Link} to={`/movie/${movie.imdbID}`}>
              <CardMedia
                component="img"
                height="180"
                image={movie.Poster}
                alt={movie.Title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {movie.Title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Year: {movie.Year}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Type: {movie.Type}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ShowMoviesInCards;
