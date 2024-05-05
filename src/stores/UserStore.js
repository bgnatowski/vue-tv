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
        }
    }
});