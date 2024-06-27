import { MovieFilter } from "@mui/icons-material";
import { Paper, Skeleton, Typography, styled } from "@mui/material";
import CarouselForMovies from "../../components/carouser/Carousel";
import CarouselSkeleton from "../../components/skeletons/CarouselSkeleton";
import useGetAllMovies from "../../hooks/useGetAllMovies";

const NoMoviesJet = () => {
  // NOTE: Implementation with Styled component just in case
  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[5],
    "& .MuiTypography-root": {
      marginBottom: theme.spacing(2),
    },
    "& .MuiSvgIcon-root": {
      fontSize: "3rem",
      marginBottom: theme.spacing(1),
      color: theme.palette.secondary.main,
    },
  }));

  const { allSeries, loadingMovie } = useGetAllMovies();
  
  return (
    <>
      {loadingMovie ? (
        <>
          <Skeleton variant="text" width="50%" />
          <CarouselSkeleton />
        </>
      ) : (
        <StyledPaper>
          <Typography variant="h4" gutterBottom>
            Aún no has buscado nada!
          </Typography>
          <MovieFilter />
          <Typography variant="h5" gutterBottom>
            No te preocupes!
          </Typography>
          <CarouselForMovies
            movies={allSeries}
            title="Nuestro patrocinador Fly Pass te recomienda lo siguiente:"
          />
        </StyledPaper>
      )}
    </>
  );
};

export default NoMoviesJet;
