import React, { useState } from "react";
import useNews from "./useNews";

 const STOCK_LIST = [
  "RELIANCE",
  "TCS",
  "INFY",
  "HDFCBANK",
  "ICICIBANK",
  "SBIN",
  "HINDUNILVR",
  "ITC",
  "WIPRO",
  "BHARTIARTL",
  "KOTAKBANK",
  "LT",
  "AXISBANK",
  "ASIANPAINT",
  "BAJFINANCE",
  "MARUTI",
  "ULTRACEMCO",
  "NESTLEIND",
  "POWERGRID",
  "SUNPHARMA"
];


const headers = {
  "x-rapidapi-key": "YOUR_API_KEY_HERE",
  "x-rapidapi-host": "indian-stock-exchange-api2.p.rapidapi.com"
};

export default function StockNewsApp() {
  const [selectedStock, setSelectedStock] = useState("RELIANCE");
  const [searchInput, setSearchInput] = useState("");

  const { news, loading, error } = useNews(selectedStock, headers);

  const handleSearch = () => {
    if (STOCK_LIST.includes(searchInput.toUpperCase())) {
      setSelectedStock(searchInput.toUpperCase());
    } else {
      alert("Stock not in list");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Indian Stock Corporate Actions</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Enter stock name"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {/* Stock List */}
      <h3>Quick Select:</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {STOCK_LIST.map((stock) => (
          <button
            key={stock}
            onClick={() => setSelectedStock(stock)}
            style={{
              padding: "5px 10px",
              backgroundColor: stock === selectedStock ? "#4CAF50" : "#eee"
            }}
          >
            {stock}
          </button>
        ))}
      </div>

      {/* News Area */}
      <h3>Corporate Actions for {selectedStock}</h3>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && news.length === 0 && <p>No news available</p>}
      {!loading && !error && news.length > 0 && (
        <ul>
          {news.map((item, i) => (
            <li key={i}>{item.title || JSON.stringify(item)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
