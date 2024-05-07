import { defineStore } from 'pinia';
import {
    sendInvitationFriendRequest,
    updateFriendRequestStatus,
    deleteFriendRequest,
    getFriendRequestsForUser, sendDeleteFriendRequest
} from '@/services/FriendRequestService';

export const useFriendRequestStore = defineStore('friendRequestStore', {
    state: () => ({
        friendRequests: [],
    }),
    getters: {
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
            console.log(`Usunieto zaproszenie: ${receiverId}`)
        },
        async deleteOldRequest(requestId){
            await deleteFriendRequest(requestId);
            console.log(`Usunieto uzyte invite/delete request`)
        }
    },
});