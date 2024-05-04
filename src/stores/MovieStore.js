import {defineStore} from 'pinia';
import {addMovieToUser, deleteUserMovie, fetchAllUserMovies, updateUserMovie} from "@/services/MovieService.js";

export const useMovieStore = defineStore('movieStore', {
    state: () => ({
        currentUserMovies: [],
        otherUserMovies: [],
        currentViewedUserId: null,
    }),
    getters: {
        getCurrentUserMovieById: (state) => (movieId) => {
            return state.currentUserMovies.find((movie) => movie.movieId === movieId);
        },
        getOtherUserMovieById: (state) => (movieId) => {
            return state.otherUserMovies.find((movie) => movie.movieId === movieId);
        },
        getCurrentUserWatched: (state) => {
            return state.currentUserMovies.filter((movie) => movie.isWatched);
        },
        getCurrentUserToWatch: (state) => {
            return state.currentUserMovies.filter((movie) => !movie.isWatched);
        },
        getCurrentUserWatchedIds: (state) => {
            return state.currentUserMovies.filter((movie) => movie.isWatched).map(m => {
                if(m){
                    return m.movieId
                }
            });
        },
        getCurrentUserToWatchIds: (state) => {
            console.log(state.currentUserMovies);
            return state.currentUserMovies.filter((movie) => !movie.isWatched).map(m => {
                if(m){
                    return m.movieId
                }
            });
        },
    },
    actions: {
        async loadCurrentUserMovies(userId) {
            this.currentUserMovies = await fetchAllUserMovies(userId);
        },
        async loadOtherUserMovies(userId) {
            this.otherUserMovies = await fetchAllUserMovies(userId);
            this.currentViewedUserId = userId;
        },
        async createCurrentUserMovie(movieDetails) {
            const userMovieObject = {
                userId: movieDetails.uId,
                movieId: movieDetails.mId,
                isWatched: movieDetails.isWatched,
                isPrivate: true,
                userRating: 0,
                note: '',
            };

            try {
                const newMovie = await addMovieToUser(userMovieObject);

                if (newMovie) {
                    this.currentUserMovies.push(newMovie);
                    console.log('Movie added to currentUserMovies:', newMovie);
                } else {
                    console.error('Failed to add movie, retrying...');
                }
            } catch (error) {
                // Obsłuż błędy zapisu
                console.error('Error adding new movie:', error);
            }
        },
        async modifyCurrentUserMovie(userId, movieId, newDetails) {
            await updateUserMovie(userId, movieId, newDetails);
            const index = this.currentUserMovies.findIndex(m => m.movieId === movieId);
            if (index !== -1) {
                this.currentUserMovies[index] = { ...this.currentUserMovies[index], ...newDetails };
            }
        },
        async removeCurrentUserMovie(userId, movieId) {
            // Usuń dokument filmu z bazy danych
            await deleteUserMovie(userId, movieId);

            // Usuń film z lokalnego stanu
            const index = this.currentUserMovies.findIndex((movie) => movie.movieId === movieId);

            // Jeśli film istnieje w lokalnym stanie, usuń go
            if (index !== -1) {
                this.currentUserMovies.splice(index, 1);
                console.log(`Film o ID ${movieId} został usunięty z lokalnego stanu.`);
            } else {
                console.warn(`Film o ID ${movieId} nie został znaleziony w lokalnym stanie.`);
            }
        },
    },
});