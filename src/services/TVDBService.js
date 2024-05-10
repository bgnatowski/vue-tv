import {ref} from "vue";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_THEMOVIEDB_AUTH_TOKEN,
    }
};

async function searchMovie(query){
    const movies = []
    const genreMap = await fetchGenres();
    try {
        const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=pl-PL&page=1`;
        const response = await fetch(url, options);
        const data = await response.json()

        movies.push(...data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            genres: movie.genre_ids.map(id => genreMap[id] || 'Nieznany gatunek'),
            posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            releaseDate: movie.release_date,
        })));
    } catch {
        console.log('Błąd w czasie pobierania danych')
    }
    return movies;
}

async function fetchMovieDetails(id){
    let movie = {};
    try {
        const url = `https://api.themoviedb.org/3/movie/${encodeURIComponent(id)}?language=pl-PL`
        const response = await fetch(url, options);
        const movieData = await response.json()
        movie = {
            id: movieData.id,
            title: movieData.title || '',
            genres: movieData.genres || [],
            duration: movieData.runtime || 0,
            releaseDate: movieData.release_date || 'brak informacji',
            posterPath: `https://image.tmdb.org/t/p/w500${movieData.poster_path}` || 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-3-696x1024.jpg',
            description: movieData.overview || 'brak informacji',
            rating: movieData.vote_average || 0,
            voteCount: movieData.vote_count || 'brak informacji',
        }
    } catch {
        console.log('Błąd w czasie pobierania danych')
        return null;
    }
    return movie;
}

async function fetchGenres() {
    // moznaby te funkcje darować i na stale ogarnać mapowanie id->genre, ale na przyszlosc mozna latwo zmieniac jezyki ;D
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=pl';
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        const genreMap = data.genres.reduce((map, genre) => {
            map[genre.id] = genre.name;
            return map;
        }, {});
        return genreMap;
    } catch (error) {
        console.error('Error fetching genres:', error);
        return {};
    }
}

// Przekształcanie danych do struktury `movie`
const sampleMovie = {
    id: 693134,
    title: "Test",
    genres: [{id: 878, name: 'Sci-Fi'}],
    duration: 167,
    releaseDate: "2024-02-27",
    posterPath: "https://image.tmdb.org/t/p/w500/xdfO6EB9e59qZpzmHxezTdPfTxZ.jpg",
    description: "test description",
    rating: 8.217,
    voteCount: 3675,
};
export {
    searchMovie,
    fetchMovieDetails,
    sampleMovie,
}