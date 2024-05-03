import {defineStore} from 'pinia';
import {addToList, createUser, getUserData, removeFromList, updateUserData} from "@/services/UserService.js";

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
        async createUser() {
            await createUser(this.uuid);
        },
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
        async updateUser(data) {
            await updateUserData(this.uuid, data);
            // Możesz wybrać, czy odświeżyć dane z serwera:
            await this.loadUserData();
            // Lub zaktualizować stan lokalny bezpośrednio:
            // this.$patch({...data});
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