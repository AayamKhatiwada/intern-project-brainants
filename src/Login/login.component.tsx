import React, {useState} from 'react';
import { signinAuthUserWithEmailAndPassword } from '../firebase';

const LoginComponent: React.FC = () => {

    const [emailLogin, setEmailLogin] = useState<string>('');
    const [passwordLogin, setPasswordLogin] = useState<string>('');
    const handleSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log(emailLogin, passwordLogin)
        try {
            await signinAuthUserWithEmailAndPassword(emailLogin, passwordLogin)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="login">
                <h1>Login</h1>
                <form onSubmit={handleSubmitLogin}>
                    <div>
                        <label htmlFor="emailLogin">Email:</label>
                        <input
                            type="email"
                            id="emailLogin"
                            value={emailLogin}
                            onChange={(e) => setEmailLogin(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="passwordLogin">Password:</label>
                        <input
                            type="password"
                            id="passwordLogin"
                            value={passwordLogin}
                            onChange={(e) => setPasswordLogin(e.target.value)}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default LoginComponent;