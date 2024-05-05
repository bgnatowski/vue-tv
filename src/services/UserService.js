import {arrayRemove, arrayUnion, deleteDoc, doc, getDoc, setDoc, updateDoc} from 'firebase/firestore';
import {db} from '@/js/firebase.js';

const createUser = async (userData = {}) => {
    const userRef = doc(db, "users", userData.uid);
    await setDoc(userRef, {
        uid: userData.uid,
        username: userData.username,
        email: userData.email,
        photoUrl: userData.photoUrl,
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

// Nowa funkcja do pobrania użytkownika po UID
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

const acceptInvitation = async (invitationId, currentUserId) => {
    try {
        // Użytkownik akceptuje zaproszenie
        const userDocRef = doc(db, `users`, currentUserId);
        await updateDoc(userDocRef, {
            friendsIds: arrayUnion(invitationId),
            invitationsIds: arrayRemove(invitationId)
        });
        console.log("Zaakceptowano u siebie")

        // Zapraszający użytkownik powinien otrzymać informację, by dodać Ciebie do friendsIds
        const friendDocRef = doc(db, `users`, invitationId);
        await updateDoc(friendDocRef, {
            friendsIds: arrayUnion(currentUserId)
        });
        console.log("Poinformowano znajomego")

        console.log(`Zaproszenie zaakceptowane i użytkownicy zostali dodani do znajomych.`);
    } catch (error) {
        console.error(`Błąd podczas akceptowania zaproszenia:`, error);
    }
}

const declineInvitation = async (invitationId, currentUserId) => {
    try {
        const userDocRef = doc(db, `users`, currentUserId);
        await updateDoc(userDocRef, {
            invitationsIds: arrayRemove(invitationId)
        });

        console.log(`Zaproszenie odrzucone i usunięte z listy.`);
    } catch (error) {
        console.error(`Błąd podczas odrzucania zaproszenia:`, error);
    }
}


export {createUser,deleteUser, getUserData, updateUserData, fetchUserByUid, acceptInvitation, declineInvitation };
