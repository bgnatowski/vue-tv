import { defineStore } from 'pinia';
import {addPost, deletePost, fetchPosts, updatePost} from "@/js/PostsService.js";

export const usePostsStore = defineStore('postsStore', {
    state: () => ({
        posts: []
    }),
    actions: {
        async loadPosts() {
            this.posts = await fetchPosts();
        },
        async createPost(postContent) {
            const postId = await addPost(postContent);
            this.posts.push({ id: postId, ...postContent });
        },
        async modifyPost(id, content) {
            await updatePost(id, { content });
            const index = this.posts.findIndex(post => post.id === id);
            if (index !== -1) {
                this.posts[index].content = content;
            }
        },
        async removePost(id) {
            await deletePost(id);
            this.posts = this.posts.filter(post => post.id !== id);
        }
    }
});

// recenzje (w przyszlosci mozna ofc dodac jeszcze jakies lajki czy cos XD):
// postsStore.addPost({
//     id: 'post1',
//     movieId: 'movie1',
//     postContent: 'This is an insightful review of the movie.',
//     creationDate: 2024-05-02T11:15 (idk mozna w ISO przechwowyac albo timestapma nwm jak w jsie time ma ogarineta biblioteke)
// });

// postsStore.updatePost('post1', 'Updated content for the post.');
// postsStore.removePost('post1');
// const post = postsStore.getPostById('post1');
// const moviePosts = postsStore.getPostsByMovieId('movie1');