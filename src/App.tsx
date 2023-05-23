import React, { useEffect, useState } from 'react';
import firebase from "firebase/auth";
import { FirebaseError } from '@firebase/util'
import { Data, Items, addDataToFirebase, checkUser, createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, getCategoriesFromFirebase, getCategoryFromFirebaseByName, getUserData, signInWithGooglePopup, signOutUser, signinAuthUserWithEmailAndPassword } from './firebase';
import DATA from './data';
import LoginComponent from './Login/login.component';
import RegisterComponent from './Register/register.component';

interface UserData {
  displayName: string
  email: string
}

const App: React.FC = () => {
  const [shopData, setShopData] = useState<Data[] | null>(null)

  const [user, setUser] = useState<firebase.User | null | UserData>(null);

  const signIn = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      setUser(user);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/popup-closed-by-user") {
          console.log("Pop up closed by user")
        }
      }
    }
  };

  const handleSignOut = () => {
    signOutUser().then(() => {
      setUser(null)
    })
  }

  useEffect(() => {
    checkUser(async (user: firebase.User | null) => {
      if (user) {
        const userData = await getUserData(user.uid)
        setUser(userData)
        const categories: Data[] | undefined = await getCategoriesFromFirebase()
        // console.log(categories)
        setShopData(categories)
      } else {
        console.log("user is logged out")
      }
    })
  }, [])


  const handleFormSubmit = () => {
    // addDataToFirebase(DATA);
    // getCategoryFromFirebaseByName("hats")
  };

  return (
    <div className="App">
      {!user && (
        <>
          <RegisterComponent />
          <button onClick={() => signIn()}>Google</button>

          <LoginComponent />
        </>
      )}
      <button onClick={() => handleSignOut()}>Sign out</button>
      {
        user && (
          <>
            <div>
              Hello {user?.displayName}
            </div>
            <div  style={{display: "flex", justifyContent: "space-around", flexWrap: "nowrap"}}>
              {
                shopData?.map((category: Data) => {
                  return (
                    <div key={category.id}>
                      <div>
                        Title: {category.title}
                      </div>
                      <img src={category.imageUrl} alt="" width="200px" height="200px" style={{ objectFit: "cover" }} />
                    </div>
                  )
                })
              }
            </div>
          </>
        )
      }
    </div>

  );
};

export default App;
