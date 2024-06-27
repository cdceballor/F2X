import { Box, Paper, Skeleton, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";

function CarouselSkeleton() {
  return (
    <Paper sx={{ p: 2, mb: 1 }} elevation={3}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ textAlign: "center", backgroundColor: "black", color: "white" }}
      >
        <Skeleton variant="text" width="20%" />
      </Typography>
      <Carousel autoPlay>
        {Array.from(new Array(3)).map((_, index) => (
          <Paper key={index} elevation={3}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={400}
              className="carousel-image"
            />
            <Box sx={{ textAlign: "center", p: 2 }}>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </Box>
          </Paper>
        ))}
      </Carousel>
    </Paper>
  );
}

export default CarouselSkeleton;
