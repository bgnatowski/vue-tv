import {doc, getDoc, getFirestore, setDoc} from "firebase/firestore";

async function createOrUpdateUserProfile(user, username) {
    const db = getFirestore();
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        await setDoc(userRef, {
            username: username,
            to_watch: [],
            watched: []
        });
    }
}

export {
    createOrUpdateUserProfile
}