import {
    createUserWithEmailAndPassword,
    deleteUser as firebaseDeleteUser,
    EmailAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    reauthenticateWithCredential,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updatePassword as firebaseUpdatePassword,
    updateProfile
} from 'firebase/auth';
import {defineStore} from 'pinia';
import {auth} from '../js/firebase';
import {reactive, ref} from 'vue';

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        user: {
            uuid: ref(''),
            username: ref(''),
            email: ref(''),
            photoUrl: ref('')
        }
    }),
    actions: {
        init() {
            onAuthStateChanged(auth, (userDetails) => {
                if (userDetails) {
                    this.user.uuid = userDetails.uid;
                    this.user.username = userDetails.displayName;
                    this.user.email = userDetails.email;
                    this.user.photoUrl = userDetails.photoURL;
                } else {
                    this.resetUser();
                }
            });
        },
        resetUser() {
            this.user.uuid = '';
            this.user.username = '';
            this.user.email = '';
            this.user.photoUrl = '';
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
                console.log(user);
            } catch (error) {
                console.error("Błąd logowania z Google", error);
                throw this.mapErrorCodeToMessage("Błąd logowania z Google")
            }
        },
        async registerUser(credentials) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
                const defaultPhotoUrl = "https://cdn-icons-png.flaticon.com/512/4715/4715330.png";
                await updateProfile(userCredential.user, {
                    displayName: credentials.username,
                    photoURL: defaultPhotoUrl
                });
                await this.logoutUser();

                const user = userCredential.user;
                console.log(user);
                return true
            } catch (error) {
                console.log(error.code);
                throw this.mapErrorCodeToMessage(error.code);
            }
        },
        async loginUser(credentials) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
                const user = userCredential.user;
                console.log(user);
            } catch (error) {
                throw this.mapErrorCodeToMessage(error.code)
            }
        },
        async logoutUser() {
            try {
                await signOut(auth);
                console.log('wylogowano');
            } catch (error) {
                throw this.mapErrorCodeToMessage(error.code)
            }
        },
        async deleteUser(password) {
            try {
                console.log("delete user")
                const user = auth.currentUser;

                if (!user || !password) {
                    throw this.mapErrorCodeToMessage('auth/wrong-delete')
                }

                const credential = EmailAuthProvider.credential(user.email, password);
                await reauthenticateWithCredential(user, credential)

                await firebaseDeleteUser(user);
                await this.logoutUser();
                return true;
            } catch (error) {
                throw this.mapErrorCodeToMessage(error.code);
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
                throw this.mapErrorCodeToMessage(error.code)
            }
        },
        async updateUserPhotoURL(newPhotoURL) {
            try {
                const user = auth.currentUser;
                if (user) {
                    await updateProfile(user, { photoURL: newPhotoURL });
                    this.user.photoUrl = newPhotoURL;
                }
            } catch (error) {
                throw this.mapErrorCodeToMessage(error.code)
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
                default:
                    return code;
            }
        }
    }
});
