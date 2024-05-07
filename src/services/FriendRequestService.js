import { collection, addDoc, doc, updateDoc, getDocs, query, where, deleteDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/js/firebase';

const sendInvitationFriendRequest = async (senderId, receiverId) => {
    const friendRequestsRef = collection(db, 'friendRequests');
    const newRequest = {
        senderId,
        receiverId,
        status: 'pending',
        timestamp: Timestamp.now(),
    };
    await addDoc(friendRequestsRef, newRequest);
};

const sendDeleteFriendRequest = async (senderId, receiverId) => {
    const friendRequestsRef = collection(db, 'friendRequests');
    const newRequest = {
        senderId,
        receiverId,
        status: 'to-delete',
        timestamp: Timestamp.now(),
    };
    await addDoc(friendRequestsRef, newRequest);
};

const updateFriendRequestStatus = async (requestId, newStatus) => {
    const requestRef = doc(db, 'friendRequests', requestId);
    await updateDoc(requestRef, { status: newStatus });
};

const deleteFriendRequest = async (requestId) => {
    console.log(`trying to delete ${requestId}`)
    const requestRef = doc(db, 'friendRequests', requestId);
    await deleteDoc(requestRef);
};

const getFriendRequestsForUser = async (userId) => {
    const friendRequestsRef = collection(db, 'friendRequests');

    const receivedRequestsQuery = query(friendRequestsRef, where('receiverId', '==', userId));
    const receivedSnapshot = await getDocs(receivedRequestsQuery);
    const receivedRequests = receivedSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    const sentRequestsQuery = query(friendRequestsRef, where('senderId', '==', userId));
    const sentSnapshot = await getDocs(sentRequestsQuery);
    const sentRequests = sentSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    const allRequests = [...receivedRequests, ...sentRequests];

    return allRequests;
};

export { sendInvitationFriendRequest, sendDeleteFriendRequest, updateFriendRequestStatus, deleteFriendRequest, getFriendRequestsForUser };