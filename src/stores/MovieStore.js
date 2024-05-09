import {defineStore} from 'pinia';
import {addMovieToUser, deleteUserMovie, fetchAllUserMovies, updateUserMovie} from "@/services/MovieService.js";
import {useUserStore} from "@/stores/UserStore.js";

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
            const userStore = useUserStore();
            const userId = userStore.getUid;
            this.currentUserMovies = await fetchAllUserMovies(userId);
            // console.log("pobrano z powrotem: ", this.currentUserMovies.find(m => m.isWatched));
        },
        async createCurrentUserMovie(movieDetails) {
            const userStore = useUserStore();
            let userId = userStore.uid;
            const userMovieObject = {
                userId: userId,
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
            await this.fetchCurrentUserMovies();
        },
        async modifyCurrentUserMovie(movieId, newDetails) {
            const userStore = useUserStore();
            let userId = userStore.uid;
            await updateUserMovie(userId, movieId, newDetails);
            const index = this.currentUserMovies.findIndex(m => m.movieId === movieId);
            if (index !== -1) {
                this.currentUserMovies[index] = { ...this.currentUserMovies[index], ...newDetails };
            }
            await this.fetchCurrentUserMovies();
        },
        async removeCurrentUserMovie(movieId) {
            const userStore = useUserStore();
            let userId = userStore.uid;
            await deleteUserMovie(userId, movieId);

            const index = this.currentUserMovies.findIndex((movie) => movie.movieId === movieId);

            if (index !== -1) {
                this.currentUserMovies.splice(index, 1);
                console.log(`Film o ID ${movieId} został usunięty z lokalnego stanu.`);
            } else {
                console.warn(`Film o ID ${movieId} nie został znaleziony w lokalnym stanie.`);
            }
            await this.fetchCurrentUserMovies();
        },
    },
});