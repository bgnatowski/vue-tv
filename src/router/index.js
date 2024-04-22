import {createRouter, createWebHistory} from "vue-router";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import paths from "@/router/routerPaths.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: paths.HOME_ROUTE,
            component: () => import("../views/HomeView.vue"),
            name: "Home",
            meta: {blackBackground: true}
        },
        {
            path: paths.REGISTER_ROUTE,
            component: () => import("../views/RegisterView.vue"),
            name: "Register",
        },
        {
            path: paths.LOGIN_ROUTE,
            component: () => import("../views/LoginView.vue"),
            name: "Login"
        },
        {
            path: paths.LOGOUT_ROUTE,
            component: () => import("../views/LogoutView.vue"),
            name: "Logout",
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: paths.MAIN_ROUTE,
            component: () => import("../views/MainPageView.vue"),
            name: "Main",
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: paths.WATCHED_ROUTE,
            component: () => import("../views/WatchedView.vue"),
            name: "Watched",
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: paths.TO_WATCH_ROUTE,
            component: () => import("../views/ToWatchView.vue"),
            name: "ToWatch",
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: paths.USER_PROFILE_ROUTE,
            component: () => import("../views/ProfileView.vue"),
            name: "User",
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: paths.SETTINGS_ROUTE,
            component: () => import("../views/SettingsView.vue"),
            name: "Settings",
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: paths.FRIENDS_ROUTE,
            component: () => import("../views/FriendsView.vue"),
            name: "Friends",
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: paths.INVITATIONS_ROUTE,
            component: () => import("../views/InvitationsVue.vue"),
            name: "Invitations",
            meta: {
                requiresAuth: true,
            }
        }


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

    if ((to.path === paths.HOME_ROUTE || to.path === paths.REGISTER_ROUTE || to.path === paths.LOGIN_ROUTE) && currentUser) {
        next(paths.MAIN_ROUTE);
    } else if (requiresAuth && !currentUser) {
        alert("You don't have access!");
        next(paths.HOME_ROUTE);
    } else {
        next();
    }
});

export default router;