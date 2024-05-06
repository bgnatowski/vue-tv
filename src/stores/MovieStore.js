import {defineStore} from 'pinia';
import {addMovieToUser, deleteUserMovie, fetchAllUserMovies, updateUserMovie} from "@/services/MovieService.js";

export const useMovieStore = defineStore('movieStore', {
    state: () => ({
        currentUserMovies: [],
    }),
    getters: {
        getCurrentUserMovies: (state) => state.currentUserMovies,
        getCurrentUserMovieById: (state) => (movieId) => {
            return state.currentUserMovies.find((movie) => movie.movieId === movieId);
        },
        getOtherUserMovieById: (state) => (movieId) => {
            return state.otherUserMovies.find((movie) => movie.movieId === movieId);
        },
        getCurrentUserWatchedIds: (state) => {
            // console.log('currentWatched: ', state.currentUserMovies.filter((movie) => movie.isWatched))
            return state.currentUserMovies.filter((movie) => movie.isWatched).map(m => {
                if(m){
                    return m.movieId
                }
            });
        },
        getCurrentUserToWatchIds: (state) => {
            return state.currentUserMovies.filter((movie) => !movie.isWatched).map(m => {
                if(m){
                    return m.movieId
                }
            });
        },
        isOnAnyList: (state) => (movieId) => {
            return state.currentUserMovies.some((movie) => movie.movieId === movieId);
        },
        isOnWatched: (state) => (movieId) => {
            const movie = state.currentUserMovies.find((movie) => movie.movieId === movieId);
            return movie ? movie.isWatched : false;
        },
        isOnToWatch: (state) => (movieId) => {
            const movie = state.currentUserMovies.find((movie) => movie.movieId === movieId);
            return movie ? !movie.isWatched : false;
        },
    },
    actions: {
        async initCurrentUserMovies(userId) {
            this.currentUserMovies = await fetchAllUserMovies(userId);
        },
        async fetchCurrentUserMovies() {
            if (!this.currentUserMovies.length) {
                const userId = userStore.getUid; // upewnij się, że użytkownik jest zalogowany
                this.currentUserMovies = await fetchAllUserMovies(userId);
            }
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
            await this.initCurrentUserMovies(userMovieObject.userId);
        },
        async modifyCurrentUserMovie(userId, movieId, newDetails) {
            await updateUserMovie(userId, movieId, newDetails);
            const index = this.currentUserMovies.findIndex(m => m.movieId === movieId);
            if (index !== -1) {
                this.currentUserMovies[index] = { ...this.currentUserMovies[index], ...newDetails };
            }
            await this.initCurrentUserMovies(userId);
        },
        async removeCurrentUserMovie(userId, movieId) {
            await deleteUserMovie(userId, movieId);

            const index = this.currentUserMovies.findIndex((movie) => movie.movieId === movieId);

            if (index !== -1) {
                this.currentUserMovies.splice(index, 1);
                console.log(`Film o ID ${movieId} został usunięty z lokalnego stanu.`);
            } else {
                console.warn(`Film o ID ${movieId} nie został znaleziony w lokalnym stanie.`);
            }
            await this.initCurrentUserMovies(userId);
        },
    },
});