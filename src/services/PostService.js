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
    addDoc, getDoc
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

    const userPostsRef = collection(db, `users/${userId}/posts`);
    const newPost = {
        movie: postDetails.movie,
        content: postDetails.content,
        timestamp: Timestamp.now()
    };
    try {
        const docRef = await addDoc(userPostsRef, newPost);
        console.log(`Utworzono post z ID: ${docRef.id}`);
        return { id: docRef.id, ...newPost };
    } catch (error) {
        console.error("Error creating post:", error);
        throw new Error("Failed to create post.");
    }
};

const deletePostsByMovieId = async (userId, movieId) => {
    const postsRef = collection(db, `users/${userId}/posts`);
    const queryRef = query(postsRef, where("movie.id", "==", movieId));

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
        console.error(`Błąd podczas usuwania postu dla filmu o ID ${movieId}:`, error);
    }
};

const updatePost = async (userId, postId, { content }) => {
    if (!content || typeof content !== 'string' || content.trim() === '') {
        throw new Error("Content must be a non-empty string.");
    }
    if (content.length > 500) {
        throw new Error("Content is too long. Maximum 500 characters allowed.");
    }

    const postRef = doc(db, `users/${userId}/posts`, postId);
    const updateData = {
        content,
        timestamp: Timestamp.now()
    };
    console.log(`Update postu: ${postId}, użytkownika ${userId}, o nowy content ${content}`)
    try {
        await updateDoc(postRef, updateData);
        const updatedDocSnap = await getDoc(postRef);
        if (updatedDocSnap.exists()) {
            return { id: updatedDocSnap.id, ...updatedDocSnap.data() };
        } else {
            console.error(`Post nie istnieje: ${postId}`);
            return null;
        }
    } catch (error) {
        console.error(`Błąd przy aktualizacji postu ${postId} użytkownika ${userId}:`, error);
        return null;
    }
};

const fetchPosts = async (friendsIds) => {
    let posts = [];
    for (let userId of friendsIds) {
        const userPostsRef = collection(db, `users/${userId}/posts`);
        const snapshot = await getDocs(userPostsRef);
        const userPosts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        posts = [...posts, ...userPosts];
    }
    return posts;
};

const fetchPostsByAFriend = async (friendsIds) => {
    let posts = [];
    for (let userId of friendsIds) {
        const userPostsRef = collection(db, `users/${userId}/posts`);
        const snapshot = await getDocs(userPostsRef);
        const userPosts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        posts = [...posts, ...userPosts];
    }
    return posts;
};

export { createPost, deletePostsByMovieId, updatePost, fetchPosts, fetchPostsByAFriend };