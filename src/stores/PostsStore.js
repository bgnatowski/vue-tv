import { defineStore } from 'pinia';

export const usePostsStore = defineStore('postsStore', {
    state: () => ({
        posts: []
    }),
    actions: {
        addPost(newPost) {
            const existingPost = this.posts.find(post => post.id === newPost.id);
            if (!existingPost) {
                this.posts.push(newPost);
            } else {
                console.error('Post with this ID already exists');
            }
        },
        updatePost(postId, updatedContent) {
            const postIndex = this.posts.findIndex(post => post.id === postId);
            if (postIndex !== -1) {
                this.posts[postIndex].postContent = updatedContent;
            } else {
                console.error('Post not found');
            }
        },
        removePost(postId) {
            this.posts = this.posts.filter(post => post.id !== postId);
        }
    },
    getters: {
        getPostById: (state) => (id) => {
            return state.posts.find(post => post.id === id);
        },
        getPostsByMovieId: (state) => (movieId) => {
            return state.posts.filter(post => post.movieId === movieId);
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