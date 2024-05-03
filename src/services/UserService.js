import {arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc} from 'firebase/firestore';
import {db} from '@/js/firebase.js';

const createUser = async (userId, userData = {}) => {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, {
        moviesToWatchIds: [],
        moviesWatchedIds: [],
        friendsIds: [],
        invitationsIds: [],
        postsIds: [],
        ...userData // Pozwala na przekazanie dodatkowych opcjonalnych pól
    });
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

export {createUser, getUserData, updateUserData, addToList, removeFromList};
