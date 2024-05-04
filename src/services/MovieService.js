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
};

const updateUserMovie = async (userId, movieId, newDetails) => {
    // Definiujemy ścieżkę do dokumentu filmu w zagnieżdżonej kolekcji
    const movieDocRef = doc(db, `users/${userId}/movies`, movieId.toString());

    try {
        // Aktualizujemy dane z użyciem przekazanych nowych wartości
        console.log('new details:', newDetails)
        await updateDoc(movieDocRef, newDetails);
        console.log(`Dokument zaktualizowany: ${movieId}`);
    } catch (error) {
        console.error(`Błąd przy aktualizacji filmu ${movieId} dla użytkownika ${userId}:`, error);
    }
};


export { addMovieToUser, updateUserMovie, fetchAllUserMovies};
