import { defineStore } from 'pinia';
import {addUserMovie, fetchUserMovies, removeUserMovie, updateUserMovie} from "@/services/UserMovieService.js";

export const useUserMovieStore = defineStore('userMovieStore', {
    state: () => ({
        userMovies: []
    }),
    actions: {
        async loadUserMovies(userId) {
            this.userMovies = await fetchUserMovies(userId);
        },
        async createUserMovie(userMovie) {
            const newMovie = await addUserMovie(userMovie);
            this.userMovies.push(newMovie);
        },
        async modifyUserMovie(movieId, newDetails) {
            await updateUserMovie(movieId, newDetails);
            const index = this.userMovies.findIndex(m => m.id === movieId);
            if (index !== -1) {
                this.userMovies[index] = { ...this.userMovies[index], ...newDetails };
            }
        },
        async deleteUserMovie(movieId) {
            await removeUserMovie(movieId);
            this.userMovies = this.userMovies.filter(m => m.id !== movieId);
        }
    },
    getters: {
        getUserMovie: (state) => (movieId) => {
            return state.userMovies.find(m => m.id === movieId);
        }
    }
});

// Do tych obiektow beda odwolywać sie listy toWatch i watched i beda zawiraly movieId (to jest do movieDetails z API)
// ale tez sie zastanawiam ze skoro w aplikacji non stop wyswietlamy tytuł, duration, gatunek i poster
// to czy tu tez nie musi być zeby miec od razu po zaciagnieciu z api,
// a detailsy tylko dociagac z api
// Dodanie filmu związane z użytkownikiem
// userMovieStore.addUserMovie({
//     userId: 'user1',
//     movieId: 'movie1',
//     isWatched: true,
//     isPrivate: false,
//     userRating: 4.5,
//     note: 'This is my personal note for the movie.',
//     title: 'Inception',
//     genre: ['Sci-Fi', 'Thriller'],
//     duration: 148,
//     coverUrl: 'https://example.com/inception.jpg'
// });

//USAGE:
// const store = useUserMovieStore();
//
// const userId = "user123";
// store.loadUserMovies(userId); // Load all movies for a user
//
// // To add a new movie
// store.createUserMovie({
//     userId: userId,
//     movieId: "movie456",
//     isWatched: false,
//     isPrivate: false,
//     userRating: 4.5,
//     note: "Must watch again!"
// });
//
// // To update a movie
// store.modifyUserMovie("movie456", { isWatched: true });
//
// // To delete a movie
// store.deleteUserMovie("movie456");
