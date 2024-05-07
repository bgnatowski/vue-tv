import {defineStore} from 'pinia';
import {createUser, deleteUser, getUserData, updateUserData} from "@/services/UserService.js";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        uid: null,
        username: '',
        email: '',
        photoUrl: '',
        friendsIds: [],
        postsIds: [],
    }),
    getters: {
        getUid: state => state.uid,
        getUsername: state => state.username,
        getEmail: state => state.email,
        getPhotoUrl: state => state.photoUrl,
        getFriendsIds: state => state.friendsIds,
        getPostsIds: state => state.postsIds,
    },
    actions: {
        async initUser(uid) {
            const userData = await getUserData(uid);
            if (userData) {
                this.uid = userData.uid;
                this.username = userData.username;
                this.email = userData.email;
                this.photoUrl = userData.photoUrl;
                this.friendsIds = userData.friendsIds || [];
                this.postsIds = userData.postsIds || [];
            }
        },
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
        async updateUser(data) {
            await updateUserData(this.uid, data);
            this.$patch({...data});
        },
        async addFriend(friendId) {
            if (!this.friendsIds.includes(friendId)) {
                // Dodaj znajomego do lokalnej listy
                this.friendsIds.push(friendId);

                // Zaktualizuj użytkownika w bazie danych
                await updateUserData(this.uid, { friendsIds: this.friendsIds });
            }
        },
        async deleteFriend(friendId) {
            const index = this.friendsIds.indexOf(friendId);
            // Jeśli znajomy jest na liście, usuń go
            if (index !== -1) {
                this.friendsIds.splice(index, 1);

                // Zaktualizuj użytkownika w bazie danych
                await updateUserData(this.uid, { friendsIds: this.friendsIds });
            } else {
                console.warn(`Friend with ID ${friendId} is not in the friends list.`);
            }
        }
    }
});