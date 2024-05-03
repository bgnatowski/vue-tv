import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import {db} from "@/js/firebase.js";

const movieCollection = collection(db, "movies");

const fetchMovies = async () => {
    const querySnapshot = await getDocs(movieCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const addMovie = async (movie) => {
    const docRef = await addDoc(movieCollection, movie);
    return { id: docRef.id, ...movie };
};

const updateMovie = async (movieId, newDetails) => {
    const docRef = doc(db, "movies", movieId);
    await updateDoc(docRef, newDetails);
};

const deleteMovie = async (movieId) => {
    const docRef = doc(db, "movies", movieId);
    await deleteDoc(docRef);
};

export { fetchMovies, addMovie, updateMovie, deleteMovie };
