import { Box, Button, CircularProgress, Paper, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { API, API_KEY } from "../constants/apis";
import { MoviesListProps } from "../hooks/useGetAllMovies";

interface SearchBarProps {
  setSearchResults: React.Dispatch<React.SetStateAction<MoviesListProps[]>>;
}

const SearchBar = ({ setSearchResults }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API, {
        params: {
          apikey: API_KEY,
          s: searchTerm,
        },
      });

      if (response.data.Response === "True") {
        setSearchResults(response.data.Search);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      setSearchResults([]);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Paper
        elevation={3}
        sx={{ m: 1, width: "100%", display: "flex", alignItems: "center" }}
      >
        <TextField
          sx={{ m: 2 }}
          label="Buscar por nombre, año o director"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
        <Button
          sx={{ m: 2 }}
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Buscar"}
        </Button>
      </Paper>
    </Box>
  );
};

export default SearchBar;
