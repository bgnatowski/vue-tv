import { defineStore } from 'pinia';

export const useUserMovieStore = defineStore('userMovieStore', {
    state: () => ({
        userMovies: []
    }),
    actions: {
        addUserMovie(userMovie) {
            const existing = this.userMovies.find(um => um.movieId === userMovie.movieId && um.userId === userMovie.userId);
            if (!existing) {
                this.userMovies.push(userMovie);
            }
        },
        updateUserMovie(movieId, userId, newDetails) {
            const index = this.userMovies.findIndex(um => um.movieId === movieId && um.userId === userId);
            if (index !== -1) {
                this.userMovies[index] = { ...this.userMovies[index], ...newDetails };
            }
        },
        removeUserMovie(movieId, userId) {
            this.userMovies = this.userMovies.filter(um => um.movieId !== movieId || um.userId !== userId);
        }
    },
    getters: {
        getUserMovie: (state) => (movieId, userId) => {
            return state.userMovies.find(um => um.movieId === movieId && um.userId === userId);
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
//     note: 'notatak do filmu 255znakow?'
// });
