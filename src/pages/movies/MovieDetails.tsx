import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MovieDetailsSkeleton from "../../components/skeletons/MovieDetailsSkeleton";
import useGetMovieById, { RatingProps } from "../../hooks/useGetMovieById";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { imdbID } = useParams<{ imdbID: string }>();
  const { movie, loading } = useGetMovieById({ id: imdbID || "" });

  if (loading) {
    return <MovieDetailsSkeleton />;
  }

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
        p: 3,
      }}
    >
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  style={{ height: "auto", maxWidth: "50%" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                {movie.Title} ({movie.Year})
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Directed by {movie.Director}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {movie.Plot}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Ratings:
              </Typography>
              <ul>
                {movie.Ratings?.map((rating: RatingProps, index: number) => (
                  <li key={index}>
                    {rating.Source}: {rating.Value}
                  </li>
                ))}
              </ul>
              <Typography variant="body2" gutterBottom>
                Genre: {movie.Genre}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Language: {movie.Language}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Country: {movie.Country}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Released: {movie.Released}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Runtime: {movie.Runtime}
              </Typography>
              <Button variant="contained" onClick={handleGoBack}>
                Go Back
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default MovieDetails;
