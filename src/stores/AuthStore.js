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
import {reactive} from 'vue';

export const useAuthStore = defineStore('authStore', () => {
    const user = reactive({
        uuid: String,
        username: String,
        email: String,
        photoUrl: String
    })
    const init = () => {
        onAuthStateChanged(auth, (userDetails) => {
            if (userDetails) {
                user.uuid = userDetails.uid;
                user.username = userDetails.displayName;
                user.email = userDetails.email;
                user.photoUrl = userDetails.photoURL;
            } else {
                user.uuid = ''
                user.username = ''
                user.email = '';
                user.photoUrl = '';
            }
        });
    };

    const registerWithGoogle = async () => {
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
            throw mapErrorCodeToMessage("Błąd logowania z Google")
        }
    }

    const registerUser = async (credentials) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
            const defaultPhotoUrl = "https://cdn-icons-png.flaticon.com/512/4715/4715330.png";
            await updateProfile(userCredential.user, {
                displayName: credentials.username,
                photoURL: defaultPhotoUrl
            });
            await logoutUser();

            const user = userCredential.user;
            console.log(user);
            return true
        } catch (error) {
            console.log(error.code);
            throw mapErrorCodeToMessage(error.code);
        }
    };

    const loginUser = async (credentials) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
            const user = userCredential.user;
            console.log(user);
        } catch (error) {
            throw mapErrorCodeToMessage(error.code)
        }
    };

    const logoutUser = async () => {
        try {
            await signOut(auth);
            console.log('wylogowano');
        } catch (error) {
            throw mapErrorCodeToMessage(error.code)
        }
        ;
    };

    const deleteUser = async (password) => {
        try {
            console.log("delete user")
            const user = auth.currentUser;

            if (!user || !password) {
                throw mapErrorCodeToMessage('auth/wrong-delete')
            }

            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credential)

            await firebaseDeleteUser(user);
            await logoutUser();
            return true;
        } catch (error) {
            throw mapErrorCodeToMessage(error.code);
        }
    }

    const changePassword = async (credentials) => {
        try {
            if (credentials.newPassword1 !== credentials.newPassword2) {
                throw mapErrorCodeToMessage("auth/different-passwords")
            }

            const user = auth.currentUser;

            const credential = EmailAuthProvider.credential(user.email, credentials.currentPassword);
            await reauthenticateWithCredential(user, credential);

            await firebaseUpdatePassword(user, credentials.newPassword1);
            return true;
        } catch (error) {
            throw mapErrorCodeToMessage(error.code)
        }
    }

    function mapErrorCodeToMessage(code) {
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

    return {
        registerWithGoogle,
        registerUser,
        loginUser,
        logoutUser,
        deleteUser,
        changePassword,
        init,
        user,
    };
});