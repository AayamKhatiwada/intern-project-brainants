// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase, { onAuthStateChanged, signOut } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { CartStateInterface } from "./store/Cart/cartSlice";
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

export const checkUser = (callback: firebase.NextOrObserver<firebase.User>) =>
  onAuthStateChanged(auth, callback);

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

export const submitCartToFirebase = async (data: CartStateInterface) => {
  try {
    const collectionRef = collection(db, "cart");
    const docRef = doc(collectionRef);
    const createdAt = new Date();
    await setDoc(docRef, { ...data, createdAt });

    // await addDoc(collectionRef, data);
    console.log("Data added successfully!");
  } catch (error) {
    console.error("Error adding data:", error);
  }
};

export const AddCurrentCart = async (
  data: CartStateInterface,
  email: string | undefined
) => {
  try {
    const docRef = doc(db, "currentcart", email ? email : "null");
    await setDoc(docRef, data);

    console.log("Data added successfully to current Cart");
  } catch (error) {
    console.error("Error adding data:", error);
  }
};

export const UpdateCurrentCart = async (
  data: CartStateInterface,
  email: string | undefined
) => {
  try {
    const docRef = doc(db, "currentcart", email ? email : "null");
    await updateDoc(docRef, { cart: data.cart });

    console.log("Data updated successfully to current Cart");
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

export const DeleteCurrentCart = async (email: string | undefined) => {
  try {
    const docRef = doc(db, "currentcart", email ? email : "null");
    await deleteDoc(docRef);

    console.log("Data deleted successfully to current Cart");
  } catch (error) {
    console.error("Error adding data:", error);
  }
};

export const ReadCurrentCart = async (email: string) => {
  try {
    const docRef = doc(db, "currentcart", email);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return {
        email: docSnapshot.data().email,
        name: docSnapshot.data().name,
        cart: docSnapshot.data().cart,
      };
    } else {
      console.log("Cart does not exist.");
      return null;
    }
  } catch (error) {
    console.error("Error getting cart:", error);
    return null;
  }
};
