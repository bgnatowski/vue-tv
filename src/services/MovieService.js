import { collection, doc, setDoc, getDocs,updateDoc } from 'firebase/firestore';
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
    // Stwórz referencję do podkolekcji `movies` wewnątrz dokumentu użytkownika
    // console.log('service:', userMovieDetails)
    const movieDocRef = doc(db, `users/${userMovieDetails.userId}/movies`, userMovieDetails.movieId.toString());
    // Dodaj lub zaktualizuj dokument filmu w kontekście tego użytkownika
    await setDoc(movieDocRef, userMovieDetails);
    return userMovieDetails;
};

const updateUserMovie = async (userId, movieId, newDetails) => {
    // Ścieżka do dokumentu filmu w zagnieżdżonej kolekcji
    const movieDocRef = doc(db, `users/${userId}/movies`, movieId.toString());

    try {
        // Aktualizujemy dane z użyciem przekazanych nowych wartości
        await updateDoc(movieDocRef, newDetails);
        console.log(`Dokument zaktualizowany: ${movieId}`);

        // Pobieramy zaktualizowany dokument i zwracamy jego dane
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


export { addMovieToUser, updateUserMovie, fetchAllUserMovies};
