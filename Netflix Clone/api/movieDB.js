import axios from "axios";
import {M_API_KEY} from '@env'

//base API url
const apiBaseUrl = `https://api.themoviedb.org/3`

//Endpoints
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/week?api_key=${M_API_KEY}`
const trendingShowsEndpoint = `${apiBaseUrl}/trending/tv/week?api_key=${M_API_KEY}`
const upComingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${M_API_KEY}`
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${M_API_KEY}`

//Dynamic Endpoints
const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${M_API_KEY}`
const movieCreditsEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${M_API_KEY}`

const showDetailsEndpoint = id => `${apiBaseUrl}/tv/${id}?api_key=${M_API_KEY}`
const showCreditsEndpoint = id => `${apiBaseUrl}/tv/${id}/credits?api_key=${M_API_KEY}`

const PersonDetails = id => `${apiBaseUrl}/person/${id}?api_key=${M_API_KEY}`

export const image500 = path => path? `https://image.tmdb.org/t/p/w500/${path}` : null
export const image342 = path => path? `https://image.tmdb.org/t/p/w342/${path}` : null
export const image185 = path => path? `https://image.tmdb.org/t/p/w185/${path}` : null

export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url:endpoint,
        params: params? params: {language: 'en-US'}
    }

    try {
        const response = await axios.request(options)
        return response.data

    }catch(error) {
        console.log("error: ", error)
        return {}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint)
}

export const fetchTrendingShows = () => {
    return apiCall(trendingShowsEndpoint)
}

export const fetchUpcmongMovies = () => {
    return apiCall(upComingMoviesEndpoint)
}

export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndpoint(id))
}

export const fetchMovieCredits = id => {
    return apiCall(movieCreditsEndpoint(id))
}

export const fetchPersonDetails = id => {
    return apiCall(PersonDetails(id))
}

export const fetchShowDetails = id => {
    return apiCall(showDetailsEndpoint(id))
}

export const fetchShowCredits = id => {
    return apiCall(showCreditsEndpoint(id))
}

export const searchMovies = (params)=>{
    return apiCall(searchMoviesEndpoint, params);
}