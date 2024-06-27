import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import MovieDetails from "./pages/movies/MovieDetails";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/movie/:imdbID" element={<MovieDetails />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
