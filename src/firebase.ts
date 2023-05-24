// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase, { onAuthStateChanged, signOut } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  Firestore,
  addDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
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
  measurementId: "G-2B89NTHGVD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const db = getFirestore();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export interface Items {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export interface Data {
  id: number;
  title: string;
  imageUrl: string;
  route: string;
  items: Items[];
}

export const createUserDocumentFromAuth = async (
  userAuth: firebase.User,
  displayName: string | null
) => {
  // console.log(userAuth);

  const userDocRef = doc(db, "users", userAuth.uid);

  // console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  // console.log(userSnapshot);
  // console.log(userSnapshot.exists());

  const { email } = userAuth;
  const createdAt = new Date();
  if (!userSnapshot.exists()) {
    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        displayName,
      });
    } catch (error: any) {
      console.log("error in creating user", error.message);
    }
  }
  return { email, createdAt, displayName };
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email && !password) {
    return;
  }

  return await createUserWithEmailAndPassword(auth, email, password);
  // return await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
  //     // User created successfully
  //     const user = userCredential.user;

  //     // Set the user's name
  //     return user?.updateProfile({
  //         displayName: email
  //     })
  // });
};

export const signinAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email && !password) {
    return;
  }

  signInWithEmailAndPassword(auth, email, password);
};

export const getUserData = async (uid: string) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return {
        displayName: docSnapshot.data().displayName,
        email: docSnapshot.data().email,
      };
    } else {
      console.log("User does not exist.");
      return null;
    }
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};

export const signOutUser = async () => {
  return await signOut(auth);
};

export const checkUser = (callback: any) => onAuthStateChanged(auth, callback);

export const addDataToFirebase = async (data: Data[]) => {
  try {
    const collectionRef = collection(db, "shop");
    // const docRef = doc(collectionRef, data.name);
    // await setDoc(docRef, data);

    for (const category of data) {
      const docRef = doc(collectionRef, category.title);
      await setDoc(docRef, category);
    }
    // await addDoc(collectionRef, data);
    console.log("Data added successfully!");
  } catch (error) {
    console.error("Error adding data:", error);
  }
};

export const getCategoriesFromFirebase = async () => {
  try {
    const collectionRef = collection(db, "shop");
    const querySnapshot = await getDocs(collectionRef);

    const categories: any[] = [];

    querySnapshot.forEach((doc) => {
      categories.push(doc.data());
    });

    return categories;
  } catch (error) {
    console.error("Error getting categories:", error);
    return [];
  }
};

export const getCategoryFromFirebaseByName = async (documentName: string) => {
  try {
    const docRef = doc(db, "shop", documentName);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      console.log(docSnapshot.data());
    } else {
      console.log("Category does not exist.");
      return null;
    }
  } catch (error) {
    console.error("Error getting category:", error);
    return null;
  }
};
