// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore'
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBwLBCC8o0UtqrtPQws3PYluJ-Q8OfZiLY",
    authDomain: "pratice-app-7d97e.firebaseapp.com",
    projectId: "pratice-app-7d97e",
    storageBucket: "pratice-app-7d97e.appspot.com",
    messagingSenderId: "760502228046",
    appId: "1:760502228046:web:763ed432f8f964eb795f1f",
    measurementId: "G-2B89NTHGVD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const db = getFirestore();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// interface CreateUserInterface {
//     us
// }

export const createUserDocumentFromAuth = async (userAuth: firebase.User) => {
    // console.log(userAuth);

    const userDocRef = doc(db, 'users', userAuth.uid);

    // console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    // console.log(userSnapshot);
    // console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                email,
                createdAt,
            });
        } catch (error: any) {
            console.log('error in creating user', error.message);
        }
    }
    return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email && !password) {
        return;
    }

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signinAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email && !password) {
        return;
    }

    return await signInWithEmailAndPassword(auth, email, password);
}
