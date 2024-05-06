import {collection, doc, setDoc, getDocs, updateDoc, getDoc, deleteDoc} from 'firebase/firestore';
import { db } from '@/js/firebase.js';

const fetchAllUserMovies = async (userId) => {
    const userMoviesRef = collection(db, 'users', userId, 'movies');
    const querySnapshot = await getDocs(userMoviesRef);

    const userMovies = querySnapshot.docs.map(doc => ({
        ...doc.data()
    }));

    return userMovies;
};

const addMovieToUser = async (userMovieDetails) => {
    const movieDocRef = doc(db, `users/${userMovieDetails.userId}/movies`, userMovieDetails.movieId.toString());
    await setDoc(movieDocRef, userMovieDetails);
    return userMovieDetails;
};

const updateUserMovie = async (userId, movieId, newDetails) => {
    const movieDocRef = doc(db, `users/${userId}/movies`, movieId.toString());
    try {
        await updateDoc(movieDocRef, newDetails);
        const updatedDocSnap = await getDoc(movieDocRef);
        if (updatedDocSnap.exists()) {
            return updatedDocSnap.data();
        } else {
            console.error(`Dokument nie istnieje: ${movieId}`);
            return null;
        }
    } catch (error) {
        console.error(`Błąd przy aktualizacji filmu ${movieId} dla użytkownika ${userId}:`, error);
        return null;
    }
};

const deleteUserMovie = async (userId, movieId) => {
    const movieDocRef = doc(db, `users/${userId}/movies`, movieId.toString());

    try {
        await deleteDoc(movieDocRef);
        console.log(`Dokument usunięty: ${movieId}`);
    } catch (error) {
        console.error(`Błąd podczas usuwania filmu ${movieId} dla użytkownika ${userId}:`, error);
    }
}


export { addMovieToUser, updateUserMovie, fetchAllUserMovies, deleteUserMovie};
