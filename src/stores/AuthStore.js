import {
    createUserWithEmailAndPassword,
    deleteUser as firebaseDeleteUser,
    EmailAuthProvider,
    GoogleAuthProvider, onAuthStateChanged,
    reauthenticateWithCredential,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updatePassword as firebaseUpdatePassword,
    updateProfile
} from 'firebase/auth';
import {defineStore} from 'pinia';
import {auth,} from '../js/firebase';
import {useUserStore} from "@/stores/UserStore.js";
import {useMovieStore} from "@/stores/MovieStore.js";
import {useFriendRequestStore} from "@/stores/FriendRequestStore.js";

export const useAuthStore = defineStore('authStore', {
    actions: {
        init() {
            onAuthStateChanged(auth, async (userDetails) => {
                const userStore = useUserStore();
                const movieStore = useMovieStore();
                const friendsRequestStore = useFriendRequestStore();
                if (userDetails) {
                    userStore.$patch({
                        uid: userDetails.uid,
                        username: userDetails.displayName || '',
                        email: userDetails.email || '',
                        photoUrl: userDetails.photoURL || 'https://cdn-icons-png.flaticon.com/512/4715/4715330.png'
                    });
                    await userStore.initUser(userDetails.uid);
                    await movieStore.initCurrentUserMovies(userDetails.uid)
                    await friendsRequestStore.initFriendRequests(userDetails.uid)
                } else {
                    userStore.resetUser();
                }
            });
        },
        async registerWithGoogle() {
            try {
                const userCredential = await signInWithPopup(auth, new GoogleAuthProvider())
                const user = userCredential.user;
                const username = user.email.split('@')[0];
                const photoUrl = user.photoURL;
                await updateProfile(user, {
                    displayName: username,
                    photoURL: photoUrl || "https://cdn-icons-png.flaticon.com/512/4715/4715330.png"
                });
                const userData = {
                    uid: user.uid,
                    username: user.displayName,
                    email: user.email,
                    photoUrl: user.photoURL
                }
                const userStore = useUserStore();
                await userStore.createUser(userData);
                this.init()
            } catch (error) {
                console.error("Błąd logowania z Google", error);
                throw this.mapErrorCodeToMessage("Błąd logowania z Google")
            }
        },
        async registerUser(credentials) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
                const defaultPhotoUrl = "https://cdn-icons-png.flaticon.com/512/4715/4715330.png";
                const user = userCredential.user;
                await updateProfile(user, {
                    displayName: credentials.username,
                    photoURL: defaultPhotoUrl
                });

                const userData = {
                    uid: user.uid,
                    username: user.displayName,
                    email: user.email,
                    photoUrl: user.photoURL
                }
                const userStore = useUserStore();
                await userStore.createUser(userData);
                await this.logoutUser();
                return true
            } catch (error) {
                throw this.mapErrorCodeToMessage(error.code);
            }
        },
        async loginUser(credentials) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
                const userStore = useUserStore();
                await userStore.initUser(userCredential.user.uid);
            } catch (error) {
                throw this.mapErrorCodeToMessage(error.code)
            }
        },
        async logoutUser() {
            try {
                await signOut(auth);
                const userStore = useUserStore();
                userStore.resetUser();
            } catch (error) {
                throw this.mapErrorCodeToMessage(error.code)
            }
        },
        async deleteUser(password) {
            try {
                const user = auth.currentUser;

                if (!user || !password) {
                    throw this.mapErrorCodeToMessage('auth/wrong-delete')
                }

                const credential = EmailAuthProvider.credential(user.email, password);
                await reauthenticateWithCredential(user, credential)

                const userStore = useUserStore();
                await userStore.removeUser(user.uid)
                await firebaseDeleteUser(user);

                await this.logoutUser();
                return true;
            } catch (error) {
                throw this.mapErrorCodeToMessage(error.code);
            }
        },
        async deleteGoogleUser(username) {
            try {
                const user = await this.reauthenticateGoogleUser();
                if (!user || user.displayName !== username) {
                    throw new Error('Invalid user credentials or username does not match.');
                }

                const userStore = useUserStore();
                await userStore.removeUser(user.uid)
                await firebaseDeleteUser(user);

                await this.logoutUser();
                return true;
            } catch (error) {
                throw new Error('Failed to delete Google user.');
            }
        },
        async changePassword(credentials) {
            try {
                if (credentials.newPassword1 !== credentials.newPassword2) {
                    throw this.mapErrorCodeToMessage("auth/different-passwords")
                }

                const user = auth.currentUser;

                const credential = EmailAuthProvider.credential(user.email, credentials.currentPassword);
                await reauthenticateWithCredential(user, credential);
                await firebaseUpdatePassword(user, credentials.newPassword1);
                return true;
            } catch (error) {
                throw this.mapErrorCodeToMessage("auth/delete")
            }
        },
        async updateUserPhotoURL(newPhotoURL) {
            try {
                const user = auth.currentUser;
                if (user) {
                    await updateProfile(user, {photoURL: newPhotoURL});
                    const userStore = useUserStore();
                    await userStore.updateUser({photoUrl: newPhotoURL});
                }
            } catch (error) {
                throw this.mapErrorCodeToMessage("auth/delete")
            }
        },
        async reauthenticateGoogleUser() {
            const provider = new GoogleAuthProvider();
            try {
                const result = await signInWithPopup(auth, provider);
                return result.user;
            } catch (error) {
                throw this.mapErrorCodeToMessage("auth/reauth")
            }
        },
        isGoogleUser() {
            return auth.currentUser.providerData.some(provider => provider.providerId === 'google.com');
        },
        mapErrorCodeToMessage(code) {
            switch (code) {
                case "auth/invalid-email":
                    return "Nieprawidłowy email";
                case "auth/user-not-found":
                    return "Nie znaleziono konta z takim adresem email";
                case "auth/wrong-password":
                    return "Nieprawidłowe hasło";
                case "auth/email-already-exists":
                    return "Email jest zajęty";
                case "auth/weak-password":
                    return "Słabe hasło!"
                case "auth/invalid-credential":
                    return "Złe dane";
                case "auth/wrong-delete":
                    return "Niepoprawne hasło!";
                case "auth/too-many-requests":
                    return "Za dużo prób. Spróbuj ponownie później!";
                case "auth/different-passwords":
                    return 'Nowe hasła nie są takie same.';
                case "auth/reauth":
                    return "Nie udało sie uwierzytelnić użytkownika przez usunięciem";
                case "auth/delete":
                    return "Wystąpił problem podczas usuwania";
                case "auth/email-already-in-use":
                    return "Uzytkownik z takim emailem istnieje";
                default:
                    return code;
            }
        }
    }
});