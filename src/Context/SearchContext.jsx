import React, { createContext, useState } from 'react';

// Tạo Context
export const SearchContext = createContext();

// Tạo Provider
export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};
