import {defineStore} from 'pinia';
import {
    acceptInvitation,
    createUser, declineInvitation,
    deleteUser,
    getUserData,
    updateUserData
} from "@/services/UserService.js";
import {arrayRemove, arrayUnion} from "firebase/firestore";

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
            },
            async acceptInvitation(invitationId) {
                await acceptInvitation(invitationId, this.uid);
                console.log('po accept invitation')
                // Zaktualizuj stan lokalny
                this.$patch(state => {
                    state.friendsIds = [...state.friendsIds, invitationId];
                    state.invitationsIds = state.invitationsIds.filter(id => id !== invitationId);
                });
            },
            async declineInvitation(invitationId) {
                // Usuń zaproszenie
                await declineInvitation(invitationId, this.uid);

                // Zaktualizuj stan lokalny
                this.$patch(state => {
                    state.invitationsIds = state.invitationsIds.filter(id => id !== invitationId);
                });
            }
        }
    })
;
//USAGE
// const store = useUserStore();
// store.$patch({ uuid: 'user123' });
// await store.loadUserData();