import { defineStore } from 'pinia';
import {
    sendFriendRequest,
    updateFriendRequestStatus,
    deleteFriendRequest,
    getFriendRequestsForUser
} from '@/services/FriendRequestService';
import {useUserStore} from "@/stores/UserStore.js";

export const useFriendRequestStore = defineStore('friendRequestStore', {
    state: () => ({
        friendRequests: [],
    }),
    getters: {
        getPendingFriendsRequests: (state) => state.friendRequests.filter(request => request.status === 'pending'),
        getAcceptedFriendsRequests: (state) => state.friendRequests.filter(request => request.status === 'accepted'),
    },
    actions: {
        async initFriendRequests(userId) {
            this.friendRequests = await getFriendRequestsForUser(userId);
        },
        async sendRequest(senderId, receiverId) {
            await sendFriendRequest(senderId, receiverId);
            // Aktualizuj lokalny stan (opcjonalne)
            await this.initFriendRequests(senderId);
        },
        async acceptRequest(requestId, receiverId) {
            await updateFriendRequestStatus(requestId, 'accepted');
            // Tutaj można zaktualizować status znajomych w `UserStore`.
            await this.initFriendRequests(receiverId);
        },
        async declineRequest(requestId, receiverId) {
            await deleteFriendRequest(requestId);
            await this.initFriendRequests(receiverId);
            console.log(`Usunieto zaproszenie: ${receiverId}`)
        },
    },
});