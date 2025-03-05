import React, { useState } from "react";

const Search = ({ fetchWeather }) => {
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(location);
    setLocation("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;