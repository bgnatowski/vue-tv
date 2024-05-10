import { defineStore } from 'pinia';
import {
    sendInvitationFriendRequest,
    updateFriendRequestStatus,
    deleteFriendRequest,
    getFriendRequestsForUser, sendDeleteFriendRequest, listenToFriendRequests
} from '@/services/FriendRequestService';
import {useUserStore} from "@/stores/UserStore.js";

export const useFriendRequestStore = defineStore('friendRequestStore', {
    state: () => ({
        friendRequests: [],
        pending: false
    }),
    getters: {
        isPendingFriendsRequestsForCurrentUser: (state) => state.friendRequests.some(r => r.receiverId === useUserStore().uid && r.status === 'pending'),
        isAcceptedFriendRequestForCurrentUser: (state) => state.friendRequests.some(r => r.senderId === useUserStore().uid && r.status === 'accepted'),
        getPendingFriendsRequests: (state) => state.friendRequests.filter(request => request.status === 'pending'),
        getAcceptedFriendsRequests: (state) => state.friendRequests.filter(request => request.status === 'accepted'),
        getToDeleteFriendsRequests: (state) => state.friendRequests.filter(request => request.status === 'to-delete'),
        getFriendsRequests: (state) => state.friendRequests,
        isPendingFor: (state) => (senderId, receiverId) => {
            return state.friendRequests.some(
                (request) =>
                    request.senderId === senderId &&
                    request.receiverId === receiverId &&
                    request.status === 'pending'
            );
        },
    },
    actions: {
        async initFriendRequests(userId) {
            this.friendRequests = await getFriendRequestsForUser(userId);
        },
        startListeningToFriendRequests(userId) {
            return listenToFriendRequests(userId, (requests) => {
                this.friendRequests = requests;
                this.pending = requests.length > 0;
            });
        },
        async sendInvitationRequest(senderId, receiverId) {
            await sendInvitationFriendRequest(senderId, receiverId);
            await this.initFriendRequests(senderId);
        },
        async sendDeleteRequest(senderId, receiverId) {
            await sendDeleteFriendRequest(senderId, receiverId);
            await this.initFriendRequests(senderId);
        },
        async acceptRequest(requestId, receiverId) {
            await updateFriendRequestStatus(requestId, 'accepted');
            await this.initFriendRequests(receiverId);
        },
        async declineRequest(requestId, receiverId) {
            await deleteFriendRequest(requestId);
            await this.initFriendRequests(receiverId);
        },
        async deleteOldRequest(requestId){
            await deleteFriendRequest(requestId);
        }
    },
});