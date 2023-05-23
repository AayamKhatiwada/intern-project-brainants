import { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../firebase';
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
            const data: any = await createUserDocumentFromAuth(user, nameRegister)
            console.log(data)
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                if (error.code === "auth/email-already-in-use") {
                    alert("Email already used")
                }
            }
        }
    }
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
            </div>
        </>
    )
}

export default RegisterComponent;