import {
    collection,
    deleteDoc,
    doc,
    getDoc, getDocs,
    query,
    setDoc,
    updateDoc, orderBy, startAt, endAt

} from 'firebase/firestore';
import {db} from '@/js/firebase.js';

const createUser = async (userData = {}) => {
    const userRef = doc(db, "users", userData.uid);
    await setDoc(userRef, {
        uid: userData.uid,
        username: userData.username,
        email: userData.email,
        photoUrl: userData.photoUrl,
        friendsIds: [],
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

const fetchUserByUid = async (uid) => {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
        return userDocSnap.data();
    } else {
        console.error(`Nie znaleziono użytkownika o UID: ${uid}`);
        return null;
    }
};

const searchUsersByUsername = async (usernamePattern) => {
    const usersRef = collection(db, 'users');

    const q = query(
        usersRef,
        orderBy('username'),
        startAt(usernamePattern),
        endAt(usernamePattern + '\uf8ff')
    );

    const querySnapshot = await getDocs(q);

    const users = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));

    return users;
};

export {createUser, deleteUser, getUserData, updateUserData, fetchUserByUid, searchUsersByUsername};
