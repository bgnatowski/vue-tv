import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";

async function authenticateWithGoogle() {
    try {
        const result = await signInWithPopup(getAuth(), new GoogleAuthProvider())
        const user = result.user;
        const username = user.email.split('@')[0];
        await updateProfile(user, {displayName: username});
        // await createOrUpdateUserProfile(user, username);
    } catch (error) {
        console.error("Błąd logowania z Google", error);
        throw mapErrorCodeToMessage("Błąd logowania z Google")
    }
}

async function authenticate(email, password) {
    try {
        await signInWithEmailAndPassword(getAuth(), email, password)
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
        // await createOrUpdateUserProfile(user, username);
        await signOutUser()
        return true
    } catch (error) {
        console.log(error.code);
        throw mapErrorCodeToMessage(error.code);
    }
}

async function signOutUser() {
    await signOut(getAuth())
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
        default:
            return code;
    }
}

export {
    authenticateWithGoogle, authenticate, signUp, signOutUser
}