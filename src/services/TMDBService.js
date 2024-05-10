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
            title: movie.title || '',
            genres: movie.genre_ids.map(id => genreMap[id] || 'Nieznany gatunek') || [],
            posterPath: movie.poster_path == undefined ?
                'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-3-696x1024.jpg' :
                `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
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


        const formattedPosterPath = movieData.poster_path === 'null' ? 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-3-696x1024.jpg' : movieData.poster_path;
        movie = {
            id: movieData.id,
            title: movieData.title || '',
            genres: movieData.genres || [],
            duration: movieData.runtime || 0,
            releaseDate: movieData.release_date || 'brak informacji',
            posterPath: `https://image.tmdb.org/t/p/w500${formattedPosterPath}`,
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

async function fetchAllMovieDetails(id){
    let movie = {};
    try {
        const url = `https://api.themoviedb.org/3/movie/${encodeURIComponent(id)}?language=pl-PL`
        const response = await fetch(url, options);
        const movieData = await response.json()

        const formattedPosterPath = movieData.poster_path === 'null' ? 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-3-696x1024.jpg' : movieData.poster_path;

        const creditsUrl = `https://api.themoviedb.org/3/movie/${encodeURIComponent(id)}/credits`;
        const creditsResponse = await fetch(creditsUrl, options);
        const creditsData = await creditsResponse.json();

        // Filtrowanie i redukcja danych obsady do pierwszych 5 aktorów z działu "Acting"
        const cast = creditsData.cast
            .filter(member => member.known_for_department === 'Acting')
            .slice(0, 20)
            .map(actor => ({
                id: actor.id,
                name: actor.name,
                profilePath: actor.profile_path == undefined ?
                    'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=826&t=st=1715435078~exp=1715435678~hmac=d2046e367f7f510a9ba80a7089cebd6a201aad8de9644140666ebc09f08ecd0e' :
                    `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
                character: actor.character
            }));

        movie = {
            id: movieData.id,
            title: movieData.title || '',
            genres: movieData.genres || [],
            duration: movieData.runtime || 0,
            releaseDate: movieData.release_date || 'brak informacji',
            posterPath: `https://image.tmdb.org/t/p/w500${formattedPosterPath}`,
            description: movieData.overview || 'brak informacji',
            rating: movieData.vote_average || 0,
            voteCount: movieData.vote_count || 'brak informacji',
            budget: movieData.budget || 'brak informacji',
            originalTitle: movieData.original_title || 'brak informacji',
            releaseStatus: movie.status,
            cast: cast
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

export {
    searchMovie,
    fetchMovieDetails,
    fetchAllMovieDetails
}