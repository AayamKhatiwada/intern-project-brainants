import { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from '../firebase';
import { FirebaseError } from '@firebase/util'
import { useMutation } from 'react-query';

const RegisterComponent: React.FC<{ refetch: () => void }> = ({ refetch }) => {
    const [nameRegister, setNameRegister] = useState<string>('');
    const [emailRegister, setEmailRegister] = useState<string>('');
    const [passwordRegister, setPasswordRegister] = useState<string>('');

    const createUserMutation = useMutation((credentials: { email: string; password: string; name: string }) =>
        createAuthUserWithEmailAndPassword(credentials.email, credentials.password)
            .then((userCredential: any) => {
                const { user } = userCredential;
                return createUserDocumentFromAuth(user, credentials.name);
            })
    );

    const handleSubmitRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        // console.log(email, password)
        try {
            // const { user }: any = await createAuthUserWithEmailAndPassword(emailRegister, passwordRegister)
            // console.log(user)
            // await createUserDocumentFromAuth(user, nameRegister)

            await createUserMutation.mutateAsync({
                email: emailRegister,
                password: passwordRegister,
                name: nameRegister,
            });

            refetch()

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
            refetch()
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
                <div className="bg-gray-300 p-10 rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-6">Register</h2>
                    <form onSubmit={handleSubmitRegister}>
                        <div className="mb-4">
                            <label className="input-field-label" htmlFor="nameRegister">
                                Name
                            </label>
                            <input className="input-field" id="nameRegister" type="text" placeholder="Enter your name" value={nameRegister}
                                onChange={(e) => setNameRegister(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="input-field-label" htmlFor="emailRegister">
                                Email
                            </label>
                            <input className="input-field" id="emailRegister" type="email" placeholder="Enter your email" value={emailRegister}
                                onChange={(e) => setEmailRegister(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="input-field-label" htmlFor="passwordRegister">
                                Password
                            </label>
                            <input className="input-field" id="passwordRegister" type="password" placeholder="Enter your password" value={passwordRegister}
                                onChange={(e) => setPasswordRegister(e.target.value)} />
                        </div>
                        <button className="btn" type="submit">
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