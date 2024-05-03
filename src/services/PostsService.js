import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import {db} from "@/js/firebase.js";

const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const addPost = async (post) => {
    const docRef = await addDoc(collection(db, "posts"), post);
    return docRef.id;
};

const updatePost = async (id, updatedContent) => {
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, updatedContent);
};

const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
};

export { fetchPosts, addPost, updatePost, deletePost };
