import React from 'react'

const MovieCard = ({ movie }) => {
  const {
    title,
    poster_path,
    release_date,
    vote_average,
    overview
  } = movie;

  const imageUrl = poster_path 
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : './no-movie.png';

  const releaseYear = release_date ? new Date(release_date).getFullYear() : 'N/A';
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A';

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group">
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-72 object-cover group-hover:brightness-75 transition-all duration-300"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-yellow-400 px-2 py-1 rounded-lg flex items-center gap-1">
          <img src="./star.svg" alt="star" className="w-4 h-4" />
          <span className="text-sm font-semibold">{rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors duration-200">
          {title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-3">
          {releaseYear}
        </p>
        
        <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
          {overview || 'No description available.'}
        </p>
      </div>
    </div>
  )
}

export default MovieCard 