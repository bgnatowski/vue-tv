// src/stores/movieStore.js
import { defineStore } from 'pinia';
import {addMovie, deleteMovie, fetchMovies, updateMovie} from "@/js/MovieService.js";
import {addToList, getUserData, removeFromList} from "@/js/UserService.js";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        uuid: null,
        moviesToWatchIds: [],
        moviesWatchedIds: [],
        friendsIds: [],
        invitationsIds: [],
        postsIds: [],
    }),
    actions: {
        async loadUserData() {
            const userData = await getUserData(this.uuid);
            if (userData) {
                this.moviesToWatchIds = userData.moviesToWatchIds || [];
                this.moviesWatchedIds = userData.moviesWatchedIds || [];
                this.friendsIds = userData.friendsIds || [];
                this.invitationsIds = userData.invitationsIds || [];
                this.postsIds = userData.postsIds || [];
            }
        },
        async addToUserList(listType, itemId) {
            await addToList(this.uuid, listType, itemId);
            this[listType].push(itemId);
        },
        async removeFromUserList(listType, itemId) {
            await removeFromList(this.uuid, listType, itemId);
            this[listType] = this[listType].filter(id => id !== itemId);
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

//USAGE
// const store = useUserStore();
// store.$patch({ uuid: 'user123' });
// await store.loadUserData();
//
// // Add to watched movies
// store.addToUserList('moviesWatchedIds', 'movie456');
//
// // Remove from friends list
// store.removeFromUserList('friendsIds', 'friend123');