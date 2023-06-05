import React, { useState } from 'react';
import { signinAuthUserWithEmailAndPassword } from '../firebase';
import { useMutation } from 'react-query';
import { FirebaseError } from 'firebase/app';
import { ErrorNoty, SuccessNoty } from '../Reuseables/notifications';

const LoginComponent: React.FC<{ refetch: () => void }> = ({ refetch }) => {

    const [emailLogin, setEmailLogin] = useState<string>('');
    const [passwordLogin, setPasswordLogin] = useState<string>('');

    const createUserLoginMiuation = useMutation((credentials: {
        email: string,
        password: string
    }) => signinAuthUserWithEmailAndPassword(credentials.email, credentials.password)
    )

    const handleSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        // console.log(emailLogin, passwordLogin)
        try {
            await createUserLoginMiuation.mutateAsync({
                email: emailLogin, password: passwordLogin
            })

            refetch()
            SuccessNoty("Login Successfull", 1000)

        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                ErrorNoty(error.code, 3000)
            }
        }
    }

    return (
        <>
            <div className="flex">
                <div className="bg-gray-300 p-10 rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-6">Login</h2>
                    <form onSubmit={handleSubmitLogin}>
                        <div className="mb-4">
                            <label className="input-field-label" htmlFor="email">
                                Email
                            </label>
                            <input className="input-field" id="email" type="email" placeholder="Enter your email" value={emailLogin}
                                onChange={(e) => setEmailLogin(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="input-field-label" htmlFor="password">
                                Password
                            </label>
                            <input className="input-field" id="password" type="password" placeholder="Enter your password" value={passwordLogin}
                                onChange={(e) => setPasswordLogin(e.target.value)} />
                        </div>
                        <button className="btn" type="submit">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginComponent;