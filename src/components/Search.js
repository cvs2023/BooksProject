import React, { useState, useEffect } from "react";
import UseDebounce from "./useDebounce.js";

const Search = () => {
  const [data, setData] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    console.log(value);
    try {
      const response = await fetch(
        `https://gutendex.com/books/?search=${value}%20great`
      );
      const data = await response.json();
      console.log(data);

      // Extract the required data from the response
      const newData = data.results.map((result) => ({
        id: result.id,
        title: result.title,
        author: result.authors[0].name,
        downloadCount: result.download_count,
        imageUrl: result.formats["image/jpeg"],
      }));

      // Append new data to the existing 'data' state
      setData((prevData) => [...prevData, ...newData]);

      // Check if there is more data to load
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const debouncedSearch = UseDebounce(handleSearch, 300);

  return (
    <div>
      <div className="search-bar">
        <input
          onKeyUp={debouncedSearch}
          placeholder="Type Book Authour"
        ></input>
      </div>

      <div>
        <div className="grid-container">
          {data.map((book, index) => (
            <div key={index} className="book-item">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="book-image"
              />
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">By: {book.author}</p>
              <p className="book-download-count">
                Downloads: {book.downloadCount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
