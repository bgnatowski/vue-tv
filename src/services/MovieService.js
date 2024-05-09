import {collection, doc, setDoc, getDocs, updateDoc, getDoc, deleteDoc, query, where} from 'firebase/firestore';
import { db } from '@/js/firebase.js';

const fetchAllUserMovies = async (userId) => {
    const userMoviesRef = collection(db, 'users', userId, 'movies');
    const querySnapshot = await getDocs(userMoviesRef);

    const userMovies = querySnapshot.docs.map(doc => ({
        ...doc.data()
    }));

    return userMovies;
};

const fetchAllPublicUserMovies = async (userId) => {
    const userMoviesRef = collection(db, 'users', userId, 'movies');
    const q = query(userMoviesRef, where('isPrivate', '==', false));

    try {
        const querySnapshot = await getDocs(q);
        const publicMovies = querySnapshot.docs.map(doc => ({
            ...doc.data()
        }));

        return publicMovies;
    } catch (error) {
        console.error(`Error fetching public movies for user ${userId}:`, error);
        return [];
    }
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
            console.log(`Zmodyfukowano: ${movieId} o ${newDetails}`);
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
    console.log("tutaj")

    try {
        await deleteDoc(movieDocRef);
        console.log(`Dokument usunięty: ${movieId}`);
    } catch (error) {
        console.error(`Błąd podczas usuwania filmu ${movieId} dla użytkownika ${userId}:`, error);
    }
}


export { addMovieToUser, updateUserMovie, fetchAllUserMovies, deleteUserMovie, fetchAllPublicUserMovies};
