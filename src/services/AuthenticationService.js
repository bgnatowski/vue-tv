import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    updateProfile,
    signInWithEmailAndPassword,
    signInWithPopup, signOut
} from "firebase/auth";
import {createOrUpdateUserProfile} from "@/services/UserService.js";

async function authenticateWithGoogle(router) {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then(async (result) => {
            const user = result.user;
            const username = user.email.split('@')[0];
            await createOrUpdateUserProfile(user, username);

            console.log("Zalogowano z Google!");
            router.push('/feed');
        })
        .catch((error) => {
            console.error("Błąd logowania z Google", error);
        });
}

async function authenticate(email, password, router) {
    try {
        const data = await signInWithEmailAndPassword(getAuth(), email, password);
        console.log("Zalogowano!");
        router.push('/feed');
        return '';
    } catch (error) {
        console.log(error.code);
        throw mapErrorCodeToMessage(error.code);
    }
}


async function signUp(email, password, username, router) {
    try {
        const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: username });
        await createOrUpdateUserProfile(user, username);

        console.log("Dziękujemy za rejestrację!");
        router.push('/feed');
    }
    catch (error) {
        console.log(error.code);
        alert(error.message);
    }
}

async function signOutUser(router) {
    signOut(getAuth()).then(() => {
        router.push('/')
    });
}


function mapErrorCodeToMessage(code) {
    switch (code) {
        case "auth/invalid-email":
            return "Nieprawidłowy email";
        case "auth/user-not-found":
            return "Nie znaleziono konta z takim adresem email";
        case "auth/wrong-password":
            return "Incorrect password";
        default:
            return "Email lub hasło niepoprawne";
    }
}

export {
    authenticateWithGoogle, authenticate, signUp, signOutUser
}