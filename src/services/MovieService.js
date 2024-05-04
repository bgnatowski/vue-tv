import { collection, doc, setDoc, getDocs, query, where, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/js/firebase.js';

const fetchUserMovies = async (userId) => {
    const q = query(collection(db, "userMovies"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
const addMovie = async (userMovieData) => {
    console.log('moviestore: ', userMovieData)
    const movieDocRef = doc(db, 'userMovies');
    await setDoc(movieDocRef, userMovieData);
};

const updateUserMovie = async (userId, movieId, newDetails) => {
    const q = query(
        collection(db, 'userMovies'),
        where('userId', '==', userId),
        where('movieId', '==', movieId)
    );
    console.log('query: ', userId, movieId)
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 1) {
        // Jeśli znaleziono dokładnie jeden dokument, aktualizujemy go
        const docSnap = querySnapshot.docs[0];
        const movieDocRef = doc(db, 'userMovies', docSnap.id);
        await updateDoc(movieDocRef, newDetails);
        console.log(`Dokument zaktualizowany: ${docSnap.id}`);
    } else {
        // Jeśli liczba wyników jest inna niż 1, zgłaszamy błąd
        console.error(`Oczekiwano jednego wyniku, ale znaleziono: ${querySnapshot.size}`);
    }
};

const removeUserMovie = async (movieId) => {
    const movieDocRef = doc(db, "userMovies", movieId);
    await deleteDoc(movieDocRef);
};

export { fetchUserMovies, addMovie, updateUserMovie, removeUserMovie };
