import { defineStore } from 'pinia';

export const useMovieStore = defineStore('movieStore', {
    state: () => ({
        movies: []
    }),
    actions: {
        addMovies(movies) {
            this.movies.push(...movies);
        },
        updateMovieDetails(movieId, newDetails) {
            const index = this.movies.findIndex(m => m.id === movieId);
            if (index !== -1) {
                this.movies[index] = { ...this.movies[index], ...newDetails };
            }
        }
    },
    getters: {
        getMovieById: (state) => (id) => {
            return this.movies.find(m => m.id === id);
        }
    }
});


// To jakby movie details czyli to co sie bedzie wyswietlac po kliknieciu ikony (i) w popupie
// Dodawanie filmu
// movieStore.addMovie(
// {
//     id: 'id-to-samo-co-z-api',
//     title: 'Inception',
//     genre: ['Sci-Fi', 'Thriller'], (lub jak z api po id?)
//     duration: 148, // minutes - z api nie kojarze jak tam jest w jakiej formie
//     premiereYear: 2010,
//     description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
//     coverUrl: 'https://example.com/inception.jpg',
//     rating: 4,
// })
// Aktualizacja filmu:
// movieStore.updateMovieDetails('id', { duration: 150 });
// Pobranie filmu po ID:
// const movie = movieStore.getMovieById('movie1');
// console.log(movie);