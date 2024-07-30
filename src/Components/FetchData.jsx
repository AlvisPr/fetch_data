import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FetchData.css"; 

const FetchData = () => {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("London");
  const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState(
    `https://api.openweathermap.org/data/2.5/weather?q=London&appid=9086008d033be7bd02fa6bf3c0775bee`
  );
  const [isLoading, setIsLoading] = useState(false);
  console.log("Rendering App");

  useEffect(() => {
    console.log("Fetching data...");
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return (
    <div className="container">
      <form
        className="search-form"
        onSubmit={(event) => {
          setUrl(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=9086008d033be7bd02fa6bf3c0775bee`);
          event.preventDefault();
        }}
      >
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Search</button>
      </form>
      {isError && <div className="error">Something went wrong ...</div>}
      {isLoading ? (
        <div className="loading">Loading ...</div>
      ) : (
        data && (
          <div className="card">
            <div className="card-body">
              <h2>{data.name}</h2>
              <p>Temperature: {Math.round(data.main.temp - 273.15)}°C</p>
              <p>
                Weather: {data.weather[0].description}
                <img 
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt={data.weather[0].description} 
                />
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default FetchData;
