import {arrayRemove, arrayUnion, deleteDoc, doc, getDoc, setDoc, updateDoc} from 'firebase/firestore';
import {db} from '@/js/firebase.js';

const createUser = async (userData = {}) => {
    const userRef = doc(db, "users", userData.uid);
    await setDoc(userRef, {
        username: userData.username,
        email: userData.email,
        photoUrl: userData.photoUrl,
        moviesToWatchIds: [],
        moviesWatchedIds: [],
        friendsIds: [],
        invitationsIds: [],
        postsIds: [],
    });
};
const deleteUser = async (userId) => {
    const userRef = doc(db, "users", userId);
    await deleteDoc(userRef);
};

const getUserData = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
        return null;
    }
};

const updateUserData = async (userId, data) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, data);
};

const addToList = async (userId, listType, itemId) => {
    const userRef = doc(db, "users", userId);
    const field = `${listType}Ids`;
    await updateDoc(userRef, {
        [field]: arrayUnion(itemId)
    });
};

const removeFromList = async (userId, listType, itemId) => {
    const userRef = doc(db, "users", userId);
    const field = `${listType}Ids`;
    await updateDoc(userRef, {
        [field]: arrayRemove(itemId)
    });
};

export {createUser,deleteUser, getUserData, updateUserData, addToList, removeFromList};
