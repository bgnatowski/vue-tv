import {
    collection,
    doc,
    setDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    writeBatch,
    query,
    where,
    Timestamp,
    addDoc, getDoc, orderBy
} from 'firebase/firestore';
import { db } from '@/js/firebase';

const createPost = async (userId, postDetails) => {
    console.log(`Tworzenie postu userId:${userId}, dla ${postDetails.movie.id} z contentem ${postDetails.movie}`);

    if(!postDetails.movie.posterPath){
        postDetails.movie.posterPath = 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-3-696x1024.jpg'
    }
    if (!postDetails.content || typeof postDetails.content !== 'string' || postDetails.content.trim() === '') {
        throw new Error("Content must be a non-empty string.");
    }
    if (postDetails.content.length > 500) {
        throw new Error("Content is too long. Maximum 500 characters allowed.");
    }

    console.log("tworzenie userPostsRef")
    const userPostsRef = collection(db, `posts`);
    const newPost = {
        userId: userId,
        movie: postDetails.movie,
        content: postDetails.content,
        timestamp: Timestamp.now()
    };
    try {
        console.log("Próba dodania addDoc")
        const docRef = await addDoc(userPostsRef, newPost);
        console.log(`Utworzono post z ID: ${docRef.id}`);
        return { id: docRef.id, ...newPost };
    } catch (error) {
        console.error("Error creating post:", error);
        throw new Error("Failed to create post.");
    }
};

const deletePostByUserAndMovieId = async (userId, movieId) => {
    const postsRef = collection(db, "posts");
    const queryRef = query(postsRef,
        where("movie.id", "==", movieId),
        where("userId", "==", userId));

    try {
        const querySnapshot = await getDocs(queryRef);

        if (!querySnapshot.empty) {
            const postDoc = querySnapshot.docs[0];
            await deleteDoc(postDoc.ref);
            console.log(`Post o ID: ${postDoc.id} został usunięty.`);
        } else {
            console.log("Nie znaleziono postu do usunięcia.");
        }
    } catch (error) {
        console.error(`Błąd podczas usuwania postu dla filmu o ID ${movieId} użytkownika ${userId}:`, error);
    }
};

const fetchUserPosts = async (userId) => {
    const postsRef = collection(db, "posts");
    const queryRef = query(postsRef, where("userId", "==", userId), orderBy("timestamp", "desc"));

    try {
        const snapshot = await getDocs(queryRef);
        const userPosts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        console.log(`Znaleziono ${userPosts.length} postów użytkownika o ID: ${userId}.`);
        return userPosts;
    } catch (error) {
        console.error(`Błąd podczas pobierania postów użytkownika ${userId}:`, error);
        return [];
    }
};

const fetchFriendsPostsByAFriend = async (friendsIds) => {
    let allPosts = [];

    try {
        for (let friendId of friendsIds) {
            const postsRef = collection(db, "posts");
            const q = query(postsRef,
                where("userId", "==", friendId),
                orderBy("timestamp", "desc")
            );

            const querySnapshot = await getDocs(q);

            const posts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            allPosts = [...allPosts, ...posts];
        }

        allPosts.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
    } catch (error) {
        console.error("Błąd podczas pobierania postów znajomych: ", error);
        return [];
    }
    return allPosts;
};

export { createPost, deletePostByUserAndMovieId, fetchUserPosts, fetchFriendsPostsByAFriend };