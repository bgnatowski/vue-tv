import {createRouter, createWebHistory} from "vue-router";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", component: () => import("../views/Home.vue"), name: "Home", meta: { hideFooter: true }},
        {path: "/register", component: () => import("../views/Register.vue"), name: "Register"},
        {path: "/sign-in", component: () => import("../views/SignIn.vue"), name: "SignIn"},
        {
            path: "/settings", component: () => import("../views/Settings.vue"), name: "Settings",
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/feed", component: () => import("../views/Feed.vue"), name: "Feed",
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/watched", component: () => import("../views/Watched.vue"), name: "Watched",
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/to_watch", component: () => import("../views/ToWatch.vue"), name: "ToWatch",
            meta: {
                requiresAuth: true,
            }
        },


    ],
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        )
    })
}

router.beforeEach(async (to, from, next) => {
    const currentUser = await getCurrentUser();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (to.path === '/' && currentUser) {
        next('/feed');
    } else if (requiresAuth && !currentUser) {
        alert("You don't have access!");
        next('/');
    } else {
        next();
    }
});

export default router;