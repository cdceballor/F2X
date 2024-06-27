import { Box, Container, Grid, Paper, Skeleton } from "@mui/material";

const MovieDetailsSkeleton = () => {
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
                <Skeleton variant="rectangular" height={300} width="50%" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton variant="text" width="60%" height={50} />
              <Skeleton variant="text" width="40%" height={30} />
              <Skeleton variant="text" width="100%" height={80} />
              <Skeleton variant="text" width="30%" height={40} />
              <ul>
                {Array.from(new Array(3)).map((_, index) => (
                  <li key={index}>
                    <Skeleton variant="text" width="50%" height={30} />
                  </li>
                ))}
              </ul>
              <Skeleton variant="text" width="50%" height={30} />
              <Skeleton variant="text" width="50%" height={30} />
              <Skeleton variant="text" width="50%" height={30} />
              <Skeleton variant="text" width="50%" height={30} />
              <Skeleton variant="text" width="50%" height={30} />
              <Skeleton variant="rectangular" width={100} height={40} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default MovieDetailsSkeleton;
