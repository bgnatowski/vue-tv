import {defineStore} from 'pinia';
import {watch} from 'vue';
import {useAuthStore} from "@/stores/AuthStore.js";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        uuid: Number,
        moviesToWatchIds: [],
        moviesWatchedIds: [],
        friendsIds: [], // uuid do usera
        invitationsIds: [], // uuid usera ktory wyslal zaroszenie
        postsIds: [], // id do postu
    }),
    actions: {
        resetUser() {
            this.user = null;
            this.moviesToWatchIds = [];
            this.moviesWatchedIds = [];
            this.friendsIds = [];
            this.invitationsIds = [];
            this.postsIds = [];
        },
        addMovieToWatch(movieId) {
            if (!this.moviesToWatchIds.includes(movieId)) {
                this.moviesToWatchIds.push(movieId);
            }
        },
        removeMovieToWatch(movieId) {
            this.moviesToWatchIds = this.moviesToWatchIds.filter(id => id !== movieId);
        },
        addMovieWatched(movieId) {
            if (!this.moviesWatchedIds.includes(movieId)) {
                this.moviesWatchedIds.push(movieId);
            }
        },
        removeMovieWatched(movieId) {
            this.moviesWatchedIds = this.moviesWatchedIds.filter(id => id !== movieId);
        },
        addFriend(friendId) {
            if (!this.friendsIds.includes(friendId)) {
                this.friendsIds.push(friendId);
            }
        },
        removeFriend(friendId) {
            this.friendsIds = this.friendsIds.filter(id => id !== friendId);
        },
        addInvitation(invitationId) {
            if (!this.invitationsIds.includes(invitationId)) {
                this.invitationsIds.push(invitationId);
            }
        },
        removeInvitation(invitationId) {
            this.invitationsIds = this.invitationsIds.filter(id => id !== invitationId);
        },
        addPost(postId) {
            if (!this.postsIds.includes(postId)) {
                this.postsIds.push(postId);
            }
        },
        removePost(postId) {
            this.postsIds = this.postsIds.filter(id => id !== postId);
        },
    }
}, {
    setup() {
        const authStore = useAuthStore();
        watch(() => authStore.user, (newUser) => {
            if (newUser) {
                this.user = {
                    uuid: newUser.uid,
                };
            } else {
                this.resetUser();
            }
        }, {immediate: true});
    }
});
