import { collection, doc, setDoc, getDocs, query, where, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/js/firebase.js';

const fetchUserMovies = async (userId) => {
    const q = query(collection(db, "userMovies"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
const addMovie = async (userMovieData) => {
    console.log('moviestore: ', userMovieData)
    const movieDocRef = doc(collection(db, 'movies'));
    await setDoc(movieDocRef, userMovieData);
};

const updateUserMovie = async (movieId, newDetails) => {
    const movieDocRef = doc(db, "userMovies", movieId);
    await updateDoc(movieDocRef, newDetails);
};

const removeUserMovie = async (movieId) => {
    const movieDocRef = doc(db, "userMovies", movieId);
    await deleteDoc(movieDocRef);
};

export { fetchUserMovies, addMovie, updateUserMovie, removeUserMovie };
