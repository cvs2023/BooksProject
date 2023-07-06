import React, { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://gutendex.com/books/?search=${searchTerm}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error searching for books:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Book Search
      </Typography>

      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search books by title/author"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <Grid container spacing={2}>
        {searchResults.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <img src={book.formats["image/jpeg"]} alt={book.title} />
            <Typography variant="h6">{book.title}</Typography>
            <Typography variant="subtitle1">
              {book.authors.join(", ")}
            </Typography>
            <Typography variant="subtitle2">
              Downloads: {book.download_count}
            </Typography>
            <Typography variant="body2">
              <Link href={book.formats["text/plain"]}>Download TXT</Link>
            </Typography>
            {book.formats["audio/mpeg"] && (
              <audio controls>
                <source src={book.formats["audio/mpeg"]} type="audio/mpeg" />
              </audio>
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;
