import { useFetchNowPlayingMoviesService, useFetchMovieDetailsService, MovieCollection, MovieDetails } from "../repository/movies"

const moviesSet : MovieCollection = {}


export function useNowPlayingMovies() {
  const {movies, isLoading, isError} = useFetchNowPlayingMoviesService()
  if(movies !== undefined){
    for(const movie of movies){
      moviesSet[movie.id] = {
        movieId: movie.id,
        title: movie.title,
        posterUrl: movie.poster_path,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count
      }
    }
  }
  return {movies: moviesSet, isLoading: isLoading, isError: isError}
}

export function useMovieDetails(movieId: string) {
  const {movieDetails, isLoading, isError} = useFetchMovieDetailsService(movieId)
  // wait for the movie details to be fetched before returning
  if(isLoading) return null
  const movieDetailsSet : MovieDetails = {
    movieId: movieDetails.id,
    title: movieDetails.title,
    posterUrl: movieDetails.poster_path,
    voteAverage: movieDetails.vote_average,
    voteCount: movieDetails.vote_count,
    synopsis: movieDetails.overview,
    releaseDate: movieDetails.release_date,
    runtime: movieDetails.runtime,
    genres: movieDetails.genres
  }
  return movieDetailsSet
}

