import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function AddChecklist() {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  
  // Mock options for demonstration
  const options = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Strawberry'];

  const handleSearch = (searchTerm: string) => {
    // Implement your search logic here
    // For now, let's just filter options based on the search term
    const filteredResults = options.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <h1>Search App</h1>
      <Autocomplete
        freeSolo
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search..."
            onChange={handleInputChange}
          />
        )}
      />
    </div>
  );
};

export default AddChecklist;