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
        <div>
            <div className="flex">
                <div className="bg-gray-300 p-8 rounded shadow-md ml-5 mt-5">
                    <h2 className="text-2xl font-bold mb-6">Register</h2>
                    <form onSubmit={handleSubmitRegister}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" id="name" type="text" placeholder="Enter your name" value={nameRegister}
                                onChange={(e) => setNameRegister(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" id="email" type="email" placeholder="Enter your email" value={emailRegister}
                                onChange={(e) => setEmailRegister(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" id="password" type="password" placeholder="Enter your password" value={passwordRegister}
                                onChange={(e) => setPasswordRegister(e.target.value)} />
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Register
                        </button>
                    </form>
                    <button onClick={() => signIn()} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded mt-2">Google</button>
                </div>
            </div>
        </div>
    )
}

export default RegisterComponent;