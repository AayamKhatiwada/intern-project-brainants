import { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from '../firebase';
import { FirebaseError } from '@firebase/util'

const RegisterComponent = () => {
    const [nameRegister, setNameRegister] = useState<string>('');
    const [emailRegister, setEmailRegister] = useState<string>('');
    const [passwordRegister, setPasswordRegister] = useState<string>('');

    const handleSubmitRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        // console.log(email, password)
        try {
            const { user }: any = await createAuthUserWithEmailAndPassword(emailRegister, passwordRegister)
            await createUserDocumentFromAuth(user, nameRegister)
            console.log(user)
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                if (error.code === "auth/email-already-in-use") {
                    alert("Email already used")
                }
            }
        }
    }

    const signIn = async () => {
        try {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user, user.displayName)
        } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            if (error.code === "auth/popup-closed-by-user") {
            console.log("Pop up closed by user")
            }
        }
        }
    };

    return (
        <>
            <h1>Register</h1>
            <div className="register">
                <form onSubmit={handleSubmitRegister}>
                    <div>
                        <label htmlFor="nameRegister">Name:</label>
                        <input
                            type="name"
                            id="nameRegister"
                            value={nameRegister}
                            onChange={(e) => setNameRegister(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="emailRegister">Email:</label>
                        <input
                            type="email"
                            id="emailRegister"
                            value={emailRegister}
                            onChange={(e) => setEmailRegister(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="passwordRegister">Password:</label>
                        <input
                            type="password"
                            id="passwordRegister"
                            value={passwordRegister}
                            onChange={(e) => setPasswordRegister(e.target.value)}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <button onClick={() => signIn()}>Google</button>
            </div>
        </>
    )
}

export default RegisterComponent;