import { defineStore } from 'pinia';
import {createPost, updatePost, fetchPosts, deletePostsByMovieId} from "@/services/PostService.js";
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
            this.userPosts = await fetchPosts([userId]);
        },
        async fetchCurrentUserPosts() {
            const userStore = useUserStore();
            this.userPosts = await fetchPosts([userStore.uid]);
        },
        async fetchFriendsPosts(friendsIds) {
            const friendsPosts = await fetchPosts(friendsIds);
            return friendsPosts;
        },
        async createUserPost(postDetails) {
            const userStore = useUserStore();
            const newPost = await createPost(userStore.uid, postDetails);
            this.userPosts.push(newPost);
        },
        async updateUserPost(postId, postDetails) {
            const userStore = useUserStore();
            const updatedPost = await updatePost(userStore.uid, postId, postDetails);
            const index = this.userPosts.findIndex(post => post.id === postId);
            if (index !== -1) {
                this.userPosts[index] = updatedPost;
            }
        },
        async deleteUserPost(movieId) {
            const userStore = useUserStore();
            await deletePostsByMovieId(userStore.uid, movieId);
            this.userPosts = this.userPosts.filter(post => post.movie.id !== movieId);
        },
    },
});