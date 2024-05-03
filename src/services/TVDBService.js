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
            genres: movie.genre_ids.map(id => genreMap[id] || 'Nieznany gatunek'),
            poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            title: movie.title,
            release_date: movie.release_date
        })));
    } catch {
        console.log('Błąd w czasie pobierania danych')
    }
    return movies;
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
    searchMovie
}