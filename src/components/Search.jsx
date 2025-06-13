import React from 'react'

const Search = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 flex-1 w-full sm:w-auto">
          <img 
            src="./search.svg" 
            alt="search" 
            className="w-6 h-6 text-gray-400" 
          />
          <input 
            type="text" 
            placeholder="Search for movies..."
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        <button 
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 whitespace-nowrap"
        >
          Search Movies
        </button>
      </form>
    </div>
  )
}

export default Search
