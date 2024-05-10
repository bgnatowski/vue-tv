import {createRouter, createWebHistory} from "vue-router";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import paths from "@/router/routerPaths.js";
import {useMovieStore} from "@/stores/MovieStore.js";
import {computed, ref} from "vue";
import {useFriendRequestStore} from "@/stores/FriendRequestStore.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: paths.HOME_ROUTE,
            redirect_to: "/",
            component: () => import("./views/HomeView.vue"),
            name: "Home",
            meta: {blackBackground: true}
        },
        {
            path: "/:pathMatch(.*)*",
            name: 'NotFound',
            component: () => import('./views/NotFoundView.vue'),
            meta: {
                requiresAuth: false,
            }
        },
        {
            path: paths.REGISTER_ROUTE,
            component: () => import("./views/RegisterView.vue"),
            name: "Register",
        },
        {
            path: paths.LOGIN_ROUTE,
            component: () => import("./views/LoginView.vue"),
            name: "Login"
        },
        {
            path: paths.LOGOUT_ROUTE,
            component: () => import("./views/LogoutView.vue"),
            name: "Logout",
            meta: {
                requiresAuth: false,
            }
        },
        {
            path: paths.MAIN_ROUTE,
            component: () => import("./views/MainView.vue"),
            name: "Main",
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: paths.WATCHED_ROUTE,
            component: () => import("./views/WatchedView.vue"),
            name: "Watched",
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: paths.TO_WATCH_ROUTE,
            component: () => import("./views/ToWatchView.vue"),
            name: "ToWatch",
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: paths.MY_PROFILE_ROUTE,
            component: () => import("./views/MyProfileView.vue"),
            name: "User",
            meta: {
                requiresAuth: true,
            },
            beforeEnter: async (to, from, next) => {
                const movieStore = useMovieStore();
                if (!movieStore.currentUserMovies.length) {
                    await movieStore.fetchCurrentUserMovies();
                }
                next();
            }
        },
        {
            path: paths.FRIENDS_ROUTE,
            component: () => import("./views/FriendsView.vue"),
            name: "Friends",
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: paths.INVITATIONS_ROUTE,
            component: () => import("./views/InvitationsView.vue"),
            name: "Invitations",
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: paths.SETTINGS_ROUTE,
            component: () => import("./views/SettingsView.vue"),
            name: "Settings",
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: paths.DELETE_ROUTE,
            component: () => import("./views/DeleteView.vue"),
            name: "Delete",
            meta: {
                requiresAuth: false,
            }
        },
        {
            path: paths.USER_PROFILE_ROUTE,
            component: () => import('./views/UserProfileView.vue'),
            name: 'UserProfile',
            meta: {
                requiresAuth: true,
            },
            props: true
        },
        {
            path: paths.USER_WATCHED_ROUTE,
            component: () => import('./views/UserWatchedView.vue'),
            name: 'UserWatched',
            meta: {
                requiresAuth: true,
            },
            props: true
        },
        {
            path: paths.USER_TO_WATCH_ROUTE,
            component: () => import('./views/UserToWatchView.vue'),
            name: 'UserToWatch',
            meta: {
                requiresAuth: true,
            },
            props: true
        },
        {
            path: paths.MOVIE,
            component: () => import('./views/MovieDetailsView.vue'),
            name: 'MovieDetails',
            meta: {
                requiresAuth: true,
            },
            props: true
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

const hasPendingInvitations = ref(false);
const hasAcceptedInvitations = ref(false);
router.beforeEach(async (to, from, next) => {
    const currentUser = await getCurrentUser();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if ((to.path === paths.HOME_ROUTE || to.path === paths.REGISTER_ROUTE || to.path === paths.LOGIN_ROUTE) && currentUser) {
        next(paths.MAIN_ROUTE);
    } else if (requiresAuth && !currentUser) {
        console.log("Nie masz tu dostępu :D")
        next(paths.HOME_ROUTE);
    }
    else {
        const friendRequestStore = useFriendRequestStore();
        await friendRequestStore.initFriendRequests(currentUser.uid)
        hasPendingInvitations.value = friendRequestStore.isPendingFriendsRequestsForCurrentUser;
        hasAcceptedInvitations.value = friendRequestStore.isAcceptedFriendRequestForCurrentUser;
        console.log('route pending: ', hasPendingInvitations.value)
        console.log('route accepted: ', hasAcceptedInvitations.value)
        next();
    }
});

router.afterEach(async (to, from, next) => {
    const currentUser = await getCurrentUser();

    if ((to.path === paths.INVITATIONS_ROUTE) && currentUser) {
        console.log("wszedlem do invitation")
    } else if ((to.path === paths.FRIENDS_ROUTE) && currentUser) {
        console.log("wszedlem do FRIENDS")
    }
});

export default router;
export {hasPendingInvitations, hasAcceptedInvitations};