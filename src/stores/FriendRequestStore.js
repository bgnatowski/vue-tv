import { defineStore } from 'pinia';
import {
    sendFriendRequest,
    updateFriendRequestStatus,
    deleteFriendRequest,
    getFriendRequestsForUser
} from '@/services/FriendRequestService';

export const useFriendRequestStore = defineStore('friendRequestStore', {
    state: () => ({
        friendRequests: [],
    }),
    actions: {
        async loadFriendRequests(userId) {
            this.friendRequests = await getFriendRequestsForUser(userId);
        },
        async sendRequest(senderId, receiverId) {
            await sendFriendRequest(senderId, receiverId);
            // Aktualizuj lokalny stan (opcjonalne)
            await this.loadFriendRequests(receiverId);
        },
        async acceptRequest(requestId, senderId, receiverId) {
            await updateFriendRequestStatus(requestId, 'accepted');
            // Tutaj można zaktualizować status znajomych w `UserStore`.
            // Przykład:
            // await useUserStore().addFriend(senderId, receiverId);
            await this.loadFriendRequests(receiverId);
        },
        async declineRequest(requestId, receiverId) {
            await updateFriendRequestStatus(requestId, 'declined');
            await this.loadFriendRequests(receiverId);
        },
        async removeRequest(requestId) {
            await deleteFriendRequest(requestId);
            this.friendRequests = this.friendRequests.filter(req => req.id !== requestId);
        },
    },
});