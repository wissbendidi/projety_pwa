import { useQuery } from '@tanstack/react-query'
import { TMDBAuthorizationBearer } from '../../config'


/*  Type definitions  */

export interface Movie {
  movieId:  string,
  title: string,
  posterUrl: string,
  voteAverage: number,
  voteCount: number
}

export interface MovieDetails extends Movie {
  synopsis: string,
  releaseDate: string,
  runtime: number,
  genres: string[]
}

export interface MovieCollection {
  [key: string]: Movie
}

/* HTTP API Calls */

/*  Now playing movies  */
async function fetchNowPlayingMovies(){
  //console.log('HTTP CALL !')
  const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', {
    headers: {
      Authorization: TMDBAuthorizationBearer
    }
  })
  return res.json()
}

export function useFetchNowPlayingMoviesService() {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['nowPlayingMovies'], 
    queryFn: fetchNowPlayingMovies
  })
  return { movies: data?.results, isLoading, isError }
}

/* Details of a movie  */
async function fetchMovieDetails(movieId: string){
  console.log('Fetching details of movie : ', movieId)
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: TMDBAuthorizationBearer
    }
  }
  const res = await fetch(url, options)
  return res.json()
}

export function useFetchMovieDetailsService(movieId: string) {
  if(movieId === '') return { movieDetails: null, isLoading: false, isError: false }
  const {data, isLoading, isError} = useQuery({
    queryKey: ['movieDetails', movieId], 
    queryFn: () => fetchMovieDetails(movieId)
  })
  return { movieDetails: data, isLoading, isError }
}

export async function SearchMovieTitles(query: string){
  console.log('Searching the titles of movies : ', query)
  if(query === '') return null
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: TMDBAuthorizationBearer
    }
  }
  const res = await fetch(url, options)
  return res.json()
}

export function useFSearchMovieTitlesService(query: string) {
  if(query === '') return { movieTitles: null, isLoading: false, isError: false }
  const {data, isLoading, isError} = useQuery({
    queryKey: ['SearchMovieTitles', query], 
    queryFn: () => SearchMovieTitles(query)
  })
  return {movieTitles: data, isLoading, isError }
}

