import { collection, addDoc, doc, updateDoc, getDocs, query, where, deleteDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/js/firebase';

const sendFriendRequest = async (senderId, receiverId) => {
    const friendRequestsRef = collection(db, 'friendRequests');
    const newRequest = {
        senderId,
        receiverId,
        status: 'pending',
        timestamp: Timestamp.now(),
    };
    await addDoc(friendRequestsRef, newRequest);
};

const updateFriendRequestStatus = async (requestId, newStatus) => {
    const requestRef = doc(db, 'friendRequests', requestId);
    await updateDoc(requestRef, { status: newStatus });
};

const deleteFriendRequest = async (requestId) => {
    const requestRef = doc(db, 'friendRequests', requestId);
    await deleteDoc(requestRef);
};

const getFriendRequestsForUser = async (userId) => {
    const friendRequestsRef = collection(db, 'friendRequests');
    const q = query(friendRequestsRef, where('senderId', '==', userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};

export { sendFriendRequest, updateFriendRequestStatus, deleteFriendRequest, getFriendRequestsForUser };