import Search from './components/Search'
import MovieCard from './components/MovieCard'
import { useState, useEffect } from 'react'

const API_URL = "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');



  const searchMovies = async (query) => {
    if (!query.trim()) return;
    
    if (!API_KEY) {
      setError('API key is missing. Please add your TMDB API key to the .env file.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `${API_URL}/search/movie?query=${encodeURIComponent(query)}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error searching movies:", error);
      setError('Failed to search movies. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularMovies = async () => {
    if (!API_KEY) {
      setError('API key is missing. Please add your TMDB API key to the .env file.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `${API_URL}/movie/popular`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
      setError('Failed to load movies. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      searchMovies(searchTerm);
    } else {
      fetchPopularMovies();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="relative w-full max-w-2xl mx-auto mb-8">
            <img 
              src="./hero.png" 
              alt="banner" 
              className="w-3/4 h-auto rounded-lg shadow-2xl transform hover:scale-[1.02] transition-transform duration-300 mx-auto"
            />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            <span className="text-blue-400 hover:text-blue-300 transition-colors duration-300">Movies</span>
            <span className="text-gray-300"> You May Like</span>
          </h1>
          <p className="text-gray-400 text-lg">Discover your next favorite film</p>
        </header>

        <div className="max-w-2xl mx-auto mb-12">
          <Search 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
          />
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-600 text-white p-4 rounded-lg text-center">
              {error}
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
          </div>
        ) : (
          <section className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-300">
              {searchTerm ? `Search Results for "${searchTerm}"` : 'Popular Movies'}
            </h2>
            
            {movies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <img 
                  src="./no-movie.png" 
                  alt="No movies found" 
                  className="w-32 h-32 mx-auto mb-4 opacity-50"
                />
                <p className="text-gray-400 text-lg">
                  {searchTerm ? 'No movies found for your search.' : 'No movies available.'}
                </p>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  )
}

export default App
