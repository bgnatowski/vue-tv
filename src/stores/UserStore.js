import {defineStore} from 'pinia';
import {createUser, deleteUser, getUserData, updateUserData} from "@/services/UserService.js";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        uid: null,
        username: '',
        email: '',
        photoUrl: '',
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
                this.uid = userData.uid;
                this.username = userData.username;
                this.email = userData.email;
                this.photoUrl = userData.photoUrl;
                this.friendsIds = userData.friendsIds || [];
                this.invitationsIds = userData.invitationsIds || [];
                this.postsIds = userData.postsIds || [];
            }
        },
        async updateUser(uid, data) {
            await updateUserData(uid, data);
            this.$patch({...data});
        }
    }
});