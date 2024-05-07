import {useMovieStore} from "@/stores/MovieStore.js";

const movieStore = useMovieStore();
// -------------- TO LISTS ---------- //
const addToWatch = async (movie, userId) => {
    await movieStore.createCurrentUserMovie({
        uId: userId,
        mId: movie.id,
        isWatched: false
    });
};

const addToWatched = async (movie, userId) => {
    await movieStore.createCurrentUserMovie({
        uId: userId,
        mId: movie.id,
        isWatched: true
    });
};

export {addToWatch, addToWatched}