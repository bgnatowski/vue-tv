import { defineStore } from 'pinia';
import {addMovie, deleteMovie, fetchMovies, updateMovie} from "@/services/MovieService.js";

export const useMovieStore = defineStore('movieStore', {
    state: () => ({
        movies: []
    }),
    actions: {
        async loadMovies() {
            this.movies = await fetchMovies();
        },
        async createMovie(movieData) {
            const newMovie = await addMovie(movieData);
            this.movies.push(newMovie);
        },
        async modifyMovieDetails(movieId, newDetails) {
            await updateMovie(movieId, newDetails);
            const index = this.movies.findIndex(movie => movie.id === movieId);
            if (index !== -1) {
                this.movies[index] = { ...this.movies[index], ...newDetails };
            }
        },
        async removeMovie(movieId) {
            await deleteMovie(movieId);
            this.movies = this.movies.filter(movie => movie.id !== movieId);
        }
    },
    getters: {
        getMovieById: (state) => {
            return (id) => state.movies.find(movie => movie.id === id);
        }
    }
});


// To jakby movie details czyli to co sie bedzie wyswietlac po kliknieciu ikony (i) w popupie
// Dodawanie filmu
// movieStore.addMovie(
// {
//     id: 'id-to-samo-co-z-api',
//     title: 'Inception',
//     genres: ['Sci-Fi', 'Thriller'],
//     duration: 148, // minutes - z api nie kojarze jak tam jest w jakiej formie
//     releaseDate: 2010,
//     posterPath: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
//     description: 'https://example.com/inception.jpg',
//     rating: 4,
// })
// Aktualizacja filmu:
// movieStore.updateMovieDetails('id', { duration: 150 });
// Pobranie filmu po ID:
// const movie = movieStore.getMovieById('movie1');
// console.log(movie);

