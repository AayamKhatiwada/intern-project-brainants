import React, { useState } from 'react';
import firebase from "firebase/auth";
import { FirebaseError } from '@firebase/util'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup, signinAuthUserWithEmailAndPassword } from './firebase';

const App: React.FC = () => {
  const [emailRegister, setEmailRegister] = useState<string>('');
  const [passwordRegister, setPasswordRegister] = useState<string>('');

  const [emailLogin, setEmailLogin] = useState<string>('');
  const [passwordLogin, setPasswordLogin] = useState<string>('');

  const [user, setUser] = useState<firebase.User | null>(null);

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

  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    // console.log(email, password)
    try {
      const { user }: any = await createAuthUserWithEmailAndPassword(emailRegister, passwordRegister)
      await createUserDocumentFromAuth(user)
      setUser(user)
      console.log(user)
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          alert("Email already used")
        }
      }
    }
  }

  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault()

    console.log(emailLogin, passwordLogin)
  }

  return (
    <div className="App">
      {!user && (
        <>
          <h1>Register</h1>
          <div className="register">
            <form onSubmit={handleSubmitRegister}>
              <div>
                <label htmlFor="emailRegister">Email:</label>
                <input
                  type="emailRegister"
                  id="email"
                  value={emailRegister}
                  onChange={(e) => setEmailRegister(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="passwordRegister">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={passwordRegister}
                  onChange={(e) => setPasswordRegister(e.target.value)}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
            <button onClick={() => signIn()}>Google</button>
          </div>
        </>
      )}
      {
        user && (
          <div>
            Name: {user?.displayName}
            <br />
            Email: {user?.email}
          </div>
        )
      }

      {
        !user && (
          <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmitLogin}>
              <div>
                <label htmlFor="emailLogin">Email:</label>
                <input
                  type="emailLogin"
                  id="email"
                  value={emailLogin}
                  onChange={(e) => setEmailLogin(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="passwordLogin">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={passwordLogin}
                  onChange={(e) => setPasswordLogin(e.target.value)}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        )
      }
    </div>
  );
};

export default App;
