import {defineStore} from 'pinia';
import {
    addToList,
    createUser,
    deleteUser,
    getUserData,
    removeFromList,
    updateUserData
} from "@/services/UserService.js";

export const useUserStore = defineStore('userStore', {
        state: () => ({
            uid: null,
            username: '',
            email: '',
            photoUrl: '',
            moviesToWatchIds: [],
            moviesWatchedIds: [],
            friendsIds: [],
            invitationsIds: [],
            postsIds: [],
        }),
        actions: {
            resetUser() {
                this.$reset();
            },
            async createUser(userInfo) {
                await createUser(userInfo);
            },
            async removeUser(uid) {
                await deleteUser(uid);
                this.resetUser();
            },
            async loadUserData(uid) {
                const userData = await getUserData(uid);
                if (userData) {
                    console.log(userData)
                    this.uid = userData.uid;
                    this.username = userData.username;
                    this.email = userData.email;
                    this.photoUrl = userData.photoUrl;
                    this.moviesToWatchIds = userData.moviesToWatchIds || [];
                    this.moviesWatchedIds = userData.moviesWatchedIds || [];
                    this.friendsIds = userData.friendsIds || [];
                    this.invitationsIds = userData.invitationsIds || [];
                    this.postsIds = userData.postsIds || [];
                }
            },
            async updateUser(uid, data) {
                // console.log("userStore - update user: ", uid, ", data: ", data)
                await updateUserData(uid, data);
                this.$patch({...data});
            },
            async addToUserList(listType, movieId) {
                // console.log('addToUserList: ', listType)
                // console.log('movieId :', movieId)
                await addToList(this.uid, listType, movieId);

                const field = `${listType}Ids`;
                this[field].push(movieId);
            },
            async removeFromUserList(listType, itemId) {
                await removeFromList(this.uid, listType, itemId);
                this[listType] = this[listType].filter(id => id !== itemId);
            }
        }
    })
;
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