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
            title: movieData.title,
            genres: movieData.genres,
            duration: movieData.runtime,
            releaseDate: movieData.release_date,
            posterPath: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
            description: movieData.overview,
            rating: movieData.vote_average,
            voteCount: movieData.vote_count,
        }
    } catch {
        console.log('Błąd w czasie pobierania danych')
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

// Przykład odpowiedzi z API
const sampleMovieData = {
    "id": 671,
    "title": "Harry Potter i Kamień Filozoficzny",
    "genres": [
        { "id": 12, "name": "Przygodowy" },
        { "id": 14, "name": "Fantasy" }
    ],
    "runtime": 153,
    "release_date": "2001-11-16",
    "poster_path": "/wNRk1vec98vfAQa2YdZOt7h0DGe.jpg",
    "overview": "Harry Potter dowiaduje się, w dniu swoich 11-tych urodzin, że jest osieroconym dzieckiem dwojga potężnych czarodziejów i sam posiada magiczne zdolności. W Szkole Magii i Czarodziejstwa w Hogwarcie przeżywa największą przygodę swojego życia. Uczy się latania na miotle i różnych pożytecznych zaklęć. Przeżywa także chwile grozy rozwiązując zagadkę tajemniczego kamienia filozoficznego i tocząc walkę z potężnym i złym czarodziejem-Lordem Voldermort.",
    "vote_average": 7.914
};

// Przekształcanie danych do struktury `movie`
const sampleMovie = {
    id: sampleMovieData.id,
    title: sampleMovieData.title,
    genres: sampleMovieData.genres, // Zwraca tylko nazwy gatunków
    duration: sampleMovieData.runtime,
    releaseDate: sampleMovieData.release_date,
    posterPath: `https://image.tmdb.org/t/p/w500${sampleMovieData.poster_path}`,
    description: sampleMovieData.overview,
    rating: sampleMovieData.vote_average
};

export {
    searchMovie,
    fetchMovieDetails,
    sampleMovie
}