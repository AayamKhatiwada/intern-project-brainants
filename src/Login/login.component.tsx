import { useState } from 'react';
import { signinAuthUserWithEmailAndPassword } from '../firebase';
import { ErrorNoty, SuccessNoty } from '../Reuseables/notifications';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Inputs {
    email: string,
    password: string,
};

const LoginComponent = () => {
    const queryClient = useQueryClient()

    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const createUserLoginMiuation = useMutation((credentials: {
        email: string,
        password: string
    }) => signinAuthUserWithEmailAndPassword(credentials.email, credentials.password).then(() => {
        queryClient.invalidateQueries({ queryKey: ['fetchAllData'] })
        SuccessNoty("Login Successfull", 1000)
    }).catch((error) => {
        if (error.code === "auth/wrong-password") {
            ErrorNoty("Incorrect Password", 3000)
        } else if (error.code === "auth/user-not-found") {
            ErrorNoty("User hasn't registered", 3000)
        }
        setIsLoading(false)
    })
    )

    const handleLogin: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true)
        const { email, password } = data
        // console.log(email, password)

        await createUserLoginMiuation.mutateAsync({
            email: email, password: password
        })
    }

    return (
        <>
            <div className="flex w-1/4">
                <div className="bg-gray-300 p-10 rounded shadow-md w-full">
                    <h2 className="text-2xl font-bold mb-6">Login</h2>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className="mb-4">
                            <label className="input-field-label" htmlFor="email">
                                Email
                            </label>
                            <input className="input-field" id="email" type="email" placeholder="Enter your email"
                                {...register("email", { required: true, pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
                            />
                            {errors.email && <div className="text-red-400">This field must contain valid email</div>}
                        </div>
                        <div className="mb-4">
                            <label className="input-field-label" htmlFor="password">
                                Password
                            </label>
                            <input className="input-field" id="password" type="password" placeholder="Enter your password"
                                {...register("password", { required: true, pattern: /.{6,}$/ })}
                            />
                            {errors.password && <div className="text-red-400">This field must contain more than 5 character</div>}
                        </div>
                        <button className="btn" type="submit">
                            Login &nbsp;
                            {
                                isLoading &&
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" style={{ display: "inherit" }}><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" /><path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" className="spinner_ajPY" /></svg>
                                </span>
                            }
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginComponent;