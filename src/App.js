import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import DataTable from './components/DataTable';
import Footer from './components/Footer';

// Main App component: Fetches data from API and manages state
function App() {
  const [data, setData] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering

  // API endpoint with new key and parameters
  const API_URL = '/api/resource/19697d76-442e-4d76-aeae-13f8a17c91e1?api-key=579b464db66ec23bdd00000150ce6d3e24a94d895052b46f3eca3bda&format=json&limit=100';

  // Fetch data on component mount
  useEffect(() => {
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then(json => {
        console.log('API Response:', json); // Log the full response for debugging
        // Handle different possible response structures
        if (json.records && Array.isArray(json.records)) {
          setData(json.records);
        } else if (json.data && Array.isArray(json.data)) {
          setData(json.data);
        } else if (Array.isArray(json)) {
          setData(json);
        } else {
          setData([]);
          console.warn('No recognizable data structure found in API response:', json);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err); // Log the error for debugging
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty dependency array: run once on mount

  // Filter data based on search term (searches in Station_Name and State)
  const filteredData = data.filter(item =>
    (item.Station_Name && item.Station_Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.State && item.State.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="App">
      <Header />
      <main>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by station or state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        {loading && <p>Loading data...</p>}
        {error && <p>Error: {error}. Please check the console for details or try again later.</p>}
        {!loading && !error && data.length === 0 && <p>No data available.</p>}
        {!loading && !error && data.length > 0 && <DataTable data={filteredData} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;