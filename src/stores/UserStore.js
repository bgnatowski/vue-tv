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
            uuid: null,
            username: '',
            email: '',
            photoUrl: '',
            moviesToWatchIds: [],
            moviesWatchedIds: [],
            friendsIds: [],
            invitationsIds: [],
            postsIds: [],
        }),
        getters: {
            getUid: state => state.uuid,
            getUsername: state => state.username,
            getEmail: state => state.email,
            getPhotoUrl: state => state.photoUrl,
            getMoviesToWatchIds: state => state.moviesToWatchIds,
            getMoviesWatchedIds: state => state.moviesWatchedIds,
            getFriendsIds: state => state.friendsIds,
            getInvitationsIds: state => state.invitationsIds,
            getPostsIds: state => state.postsIds
        },
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
                    this.uuid = userData.uid;
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
            async addToUserList(listType, itemId) {
                await addToList(this.uuid, listType, itemId);
                this[listType].push(itemId);
            },
            async removeFromUserList(listType, itemId) {
                await removeFromList(this.uuid, listType, itemId);
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