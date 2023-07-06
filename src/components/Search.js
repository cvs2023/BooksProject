import React, { useState, useEffect } from "react";
import UseDebounce from "./useDebounce.js";

const Search = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("dickens");
  const [loading, setLoading] = useState(true);
  const fetchBooks = async () => {
    try {
      const response = await fetch(
        `https://gutendex.com/books/?search=${query}&page=${page}`
      );
      const data = await response.json();
      if (data) {
        // setData([])
        setLoading(false);
      }
      // Extract the required data from the response
      const newData = data.results.map((result) => ({
        id: result.id,
        title: result.title,
        author: result.authors[0].name,
        downloadCount: result.download_count,
        imageUrl: result.formats["image/jpeg"],
      }));

      // Append new data to the existing 'data' state
      setData((prev) => [...prev, ...newData]);

      // Check if there is more data to load
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const debouncedSearch = UseDebounce(fetchBooks, 800);
  useEffect(() => {
    debouncedSearch();
  }, [page]);

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  return (
    <div>
      <div className="search-bar">
        <input
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={debouncedSearch}
          placeholder="Type Book Or Author Name"
        ></input>
      </div>
      {loading && <h3>Loading {query}...</h3>}
      <div className="grid-container">
        {data.map((book, index) => (
          <div key={index} className="book-item">
            <img src={book.imageUrl} alt={book.title} className="book-image" />
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">By: {book.author}</p>
            <p className="book-download-count">
              Downloads: {book.downloadCount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
