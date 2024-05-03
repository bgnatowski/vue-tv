import { collection, doc, setDoc, getDocs, query, where, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/js/firebase.js';

const fetchUserMovies = async (userId) => {
    const q = query(collection(db, "userMovies"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const addUserMovie = async (userMovie) => {
    const newDocRef = doc(collection(db, "userMovies"));
    await setDoc(newDocRef, userMovie);
    return { id: newDocRef.id, ...userMovie };
};

const updateUserMovie = async (movieId, newDetails) => {
    const movieDocRef = doc(db, "userMovies", movieId);
    await updateDoc(movieDocRef, newDetails);
};

const removeUserMovie = async (movieId) => {
    const movieDocRef = doc(db, "userMovies", movieId);
    await deleteDoc(movieDocRef);
};

export { fetchUserMovies, addUserMovie, updateUserMovie, removeUserMovie };
