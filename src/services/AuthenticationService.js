import {
    createUserWithEmailAndPassword,
    deleteUser as firebaseDeleteUser,
    EmailAuthProvider,
    getAuth,
    GoogleAuthProvider,
    reauthenticateWithCredential,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updatePassword as firebaseUpdatePassword,
    updateProfile
} from "firebase/auth";

async function authenticateWithGoogle() {
    try {
        const result = await signInWithPopup(getAuth(), new GoogleAuthProvider())
        const user = result.user;
        const username = user.email.split('@')[0];
        await updateProfile(user, {displayName: username});
        return user
    } catch (error) {
        console.error("Błąd logowania z Google", error);
        throw mapErrorCodeToMessage("Błąd logowania z Google")
    }
}

async function authenticate(email, password) {
    try {
        const credential = await signInWithEmailAndPassword(getAuth(), email, password);
        return credential.user;
    } catch (error) {
        console.log(error.code);
        throw mapErrorCodeToMessage(error.code)
    }
}

async function signUp(email, password, username) {
    try {
        const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
        const user = userCredential.user;
        await updateProfile(user, {displayName: username});
        await signOutUser();
        return true
    } catch (error) {
        console.log(error.code);
        throw mapErrorCodeToMessage(error.code);
    }
}

async function signOutUser() {
    await signOut(getAuth())
}

async function deleteUser(password) {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user || !password) {
            throw mapErrorCodeToMessage('auth/wrong-delete')
        }
        // Tworzenie poświadczeń
        const credential = EmailAuthProvider.credential(user.email, password);
        // Ponowne uwierzytelnienie użytkownika
        await reauthenticateWithCredential(user, credential)

        // Usunięcie użytkownika
        await firebaseDeleteUser(user);
        await signOutUser();
        return true;
    } catch (error) {
        throw mapErrorCodeToMessage(error.code);
    }
}

async function changePassword(current, password1, password2) {
    try {
        if (password1 !== password2) {
            throw mapErrorCodeToMessage("auth/different-passwords")
        }

        const auth = getAuth();
        const user = auth.currentUser;

        // Reautentykacja użytkownika
        const credential = EmailAuthProvider.credential(user.email, current);
        await reauthenticateWithCredential(user, credential);

        // Aktualizacja hasła
        await firebaseUpdatePassword(user, password1);
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

export {
    authenticateWithGoogle, authenticate, signUp, signOutUser, deleteUser, changePassword
}