import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from '../firebase';
import { FirebaseError } from '@firebase/util'
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorNoty, SuccessNoty } from '../Reuseables/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface Inputs {
    name: string,
    email: string,
    password: string,
};

const RegisterComponent = () => {

    const queryClient = useQueryClient()
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const [isLoading, setIsLoading] = useState(false)

    const createAuthUserMutation = useMutation((credentials: { email: string; password: string; name: string }) =>
        createAuthUserWithEmailAndPassword(credentials.email, credentials.password)
            .then(async (userCredential: any) => {
                const { user } = userCredential;
                return { user: user, name: credentials.name }
            }).catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    ErrorNoty("Email already in used", 3000)
                    return error
                }
                setIsLoading(false)
            }),
    );

    const createUserDocument = useMutation(async (credentials: { user: any, name: string }) =>
        createUserDocumentFromAuth(credentials.user, credentials.name).then(() => {
            queryClient.invalidateQueries({ queryKey: ['fetchAllData'] })
            SuccessNoty("Register Successfull", 1000)
        }).catch(() => {
            ErrorNoty("Error create a document", 5000)
            setIsLoading(false)
        })
    )

    const handleSubmitRegister: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true)
        const { name, email, password } = data

        try {
            // const { user }: any = await createAuthUserWithEmailAndPassword(emailRegister, passwordRegister)
            // console.log(user)
            // await createUserDocumentFromAuth(user, nameRegister)

            const response: { user: any, name: string } = await createAuthUserMutation.mutateAsync({
                email: email,
                password: password,
                name: name,
            });

            !!response.user && createUserDocument.mutateAsync(response)

        } catch (error: unknown) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const signIn = async () => {
        try {
            const { user } = await signInWithGooglePopup();
            await createUserDocumentFromAuth(user, user.displayName)
            queryClient.invalidateQueries({ queryKey: ['fetchAllData'] })
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                if (error.code === "auth/popup-closed-by-user") {
                    console.log("Pop up closed by user")
                }
            }
        }
    };

    return (
        <div className="flex w-3/4 md:w-1/3 lg:w-1/4">
            <div className="bg-gray-300 p-10 rounded shadow-md w-full">
                <h2 className="text-2xl font-bold mb-6">Register</h2>
                <form onSubmit={handleSubmit(handleSubmitRegister)}>
                    <div className="mb-4">
                        <label className="input-field-label" htmlFor="nameRegister">
                            Name
                        </label>
                        <input className="input-field" id="nameRegister" type="text" placeholder="Enter your name"
                            {...register("name", { required: true, pattern: /(.*[A-Za-z]){3}/ })}
                        />
                        {errors.name && <div className='text-red-500'>This field must contain 3 character or more characters</div>}
                    </div>
                    <div className="mb-4">
                        <label className="input-field-label" htmlFor="emailRegister">
                            Email
                        </label>
                        <input className="input-field" id="emailRegister" type="email" placeholder="Enter your email"
                            {...register("email", { required: true, pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
                        />
                        {errors.email && <div className='text-red-500'>This field must contain valid email</div>}
                    </div>
                    <div className="mb-4">
                        <label className="input-field-label" htmlFor="passwordRegister">
                            Password
                        </label>
                        <input className="input-field" id="passwordRegister" type="password" placeholder="Enter your password"
                            {...register('password', { required: true, pattern: /.{6,}$/ })}
                        />
                        {errors.password && <div className='text-red-500'>This field must contain more than 5 character</div>}
                    </div>
                    <button className="btn" type="submit">
                        Register
                        {
                            isLoading &&
                            <span>
                                <svg width="24" height="24" viewBox="0 0 24 24" style={{ display: "inherit" }}><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" /><path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" className="spinner_ajPY" /></svg>
                            </span>
                        }
                    </button>
                </form>
                <button onClick={() => signIn()} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded mt-2">Google</button>
            </div>
        </div>
    )
}

export default RegisterComponent;