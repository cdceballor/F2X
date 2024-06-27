import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Skeleton,
} from "@mui/material";

const ShowMoviesInCardsSkeleton = () => {
  return (
    <Grid container spacing={2}>
      {Array.from(new Array(8)).map((_, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardActionArea>
              <Skeleton variant="rectangular" height={180} />
              <CardContent>
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ShowMoviesInCardsSkeleton;
