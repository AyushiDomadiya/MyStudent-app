import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Sidebar from '../Sidebar';
import "./Fetchdata.css";

function Fetchdata() {
  const [originalRecords, setOriginalRecords] = useState([]);
  const [records, setRecords] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({}); // State to store the count of categories
  const [selectedCategory, setSelectedCategory] = useState(null); // State to store the selected category
  const [viewUrl, setViewUrl] = useState(''); //state to store url
  useEffect(() => {
    fetch("https://api.publicapis.org/entries")
      .then(response => response.json())
      .then(data => {
        const entries = data.entries;
        setOriginalRecords(entries);
        setRecords(entries);
        const uniqueCategories = [...new Set(entries.map(entry => entry.Category))];
        setCategories(uniqueCategories);
        const counts = {}; // Object to store category counts
        uniqueCategories.forEach(category => {
          const count = entries.filter(entry => entry.Category === category).length;
          counts[category] = count;
        });
        setCategoryCounts(counts); // Set the counts of categories
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setRecords(originalRecords);
    } else {
      const filteredRecords = originalRecords.filter(record => {
        return record.Category.toLowerCase().includes(searchQuery.toLowerCase()) ||
               record.API.toLowerCase().includes(searchQuery.toLowerCase()) ||
               record.Description.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setRecords(filteredRecords);
    }
  }, [searchQuery, originalRecords]);

  useEffect(() => {
    if (searchQuery === '') {
      setSuggestions([]);
    } else {
      const filteredSuggestions = categories.filter(category =>
        category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  }, [searchQuery, categories]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Set the selected category
    if (category === 'All Categories') {
      setRecords(originalRecords);
    } else {
      const filteredRecords = originalRecords.filter(record => record.Category === category);
      setRecords(filteredRecords);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    // Check if the suggestion is not already selected
      setSuggestions([]); // Clear suggestions when a suggestion is clicked
      setSelectedCategory(suggestion); // Set the selected category to the clicked suggestion
    
  };

  const handleBackButtonClick = () => {
    setSelectedCategory(null); // Reset selected category to null when the back button is clicked
  };
  const handleViewButtonClick = (url) => {
    window.open(url,'_blank');//open url in new window
  }
  return (
    <Sidebar>
    <div className="container-api">
      <div className="search-container">
        <input className='sc'
          type="text"
          placeholder="Search category"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
         <FaSearch className="search-icon" />
        {suggestions.length > 0 && ( // Render suggestions only if there are any
          <div className="suggestions">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      {!suggestions.length > 0 && ( // Render content only if no suggestions are displayed
        <>
          {selectedCategory === null && ( // Render category buttons only if no category is selected
            <div className="category-buttons">
              {categories.map((category, index) => (
                <button key={index} className="category-button" onClick={() => handleCategoryClick(category)}>
                  {category} ({categoryCounts[category]})
                </button>
              ))}
            </div>
          )}
          {selectedCategory !== null && ( // Render category details only if a category is selected
            <div className="category-details">
              <button className="back" onClick={handleBackButtonClick}>Back</button>
              <h2 className="hh2">{selectedCategory}</h2>
              <div className="card-container">
                {records.map((record, index) => (
                  <div key={index} className="card">
                    <h3>{record.API}</h3>
                    <p>{record.Description}</p>
                    <div className='view-btn-container'>
                    <button className='view-btn' onClick={() => handleViewButtonClick(record.Link)} >View</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
    </Sidebar>
  );
};

export default Fetchdata;
