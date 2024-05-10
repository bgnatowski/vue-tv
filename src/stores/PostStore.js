import { defineStore } from 'pinia';
import {
    createPost,
    fetchUserPosts,
    fetchPostsByAFriend,
    deletePostByUserAndMovieId
} from "@/services/PostService.js";
import {useUserStore} from "@/stores/UserStore.js";

export const usePostStore = defineStore('postStore', {
    state: () => ({
        userPosts: [],
    }),
    getters: {
        getUserPosts: (state) => state.userPosts,
        getUserPostByMovieId: (state) => (movieId) => state.userPosts.find(post=> post.movie.id === movieId),
        getPostById: (state) => (postId) => {
            return state.userPosts.find((post) => post.id === postId);
        },
    },
    actions: {
        async initUserPosts(userId) {
            this.userPosts = await fetchUserPosts(userId);
        },
        async fetchCurrentUserPosts() {
            const userStore = useUserStore();
            this.userPosts = await fetchUserPosts(userStore.uid);
        },
        async createUserPost(postDetails) {
            const userStore = useUserStore();
            const newPost = await createPost(userStore.uid, postDetails);
            this.userPosts.push(newPost);
        },
        async deleteUserPost(movieId) {
            const userStore = useUserStore();
            await deletePostByUserAndMovieId(userStore.uid, movieId);
            this.userPosts = this.userPosts.filter(post => post.movie.id !== movieId);
        },
    },
});