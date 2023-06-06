import { useDispatch, useSelector } from "react-redux";
import { RootInterface } from "../store/store";
import { useState } from "react";
import { UpdateUser } from "../firebase";
import { setName } from "../store/Cart/cartSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { SuccessNoty } from "../Reuseables/notifications";
// import { useQueryClient } from "@tanstack/react-query";

interface Inputs {
    name: string,
};

const ProfileComponent: React.FC<{ refetch: () => void }> = ({ refetch }) => {

    // const queryClient = useQueryClient()
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const dispatch = useDispatch()
    const user = useSelector((state: RootInterface) => state.user.user)

    const [imageUpload, setImageUpload] = useState<File | null>(null)
    const [profileImage, setProileImage] = useState<string | null | undefined>(user?.image)
    const [isLoading, setIsLoading] = useState(false)

    const handleUpdate: SubmitHandler<Inputs> = (data) => {
        setIsLoading(true)
        const { name } = data

        !name && dispatch(setName(name))

        UpdateUser(user?.uid, name, imageUpload)

        // queryClient.invalidateQueries({ queryKey: ['fetchAllData'] })
        refetch()
        SuccessNoty("Profile update successful", 3000)
        setIsLoading(false)
    }

    // console.log(profileImage)

    return (
        <div className="p-10">
            <div className="text-center text-6xl mb-8 font-cart-head">User Profile</div>
            <form onSubmit={handleSubmit(handleUpdate)} className="flex justify-center">
                <div className="flex-1 text-center">
                    {
                        !!profileImage ?
                            <img src={profileImage} alt="" className="rounded-full w-36 h-36 sm:w-64 sm:h-64 md:w-80 md:h-80 object-cover mx-auto mb-8 border-solid border-2 border-black" />
                            :
                            <div className="w-80 h-80 text-9xl mx-auto mb-8 null-image">
                                {user?.displayName[0].toUpperCase()}
                            </div>
                    }
                    <label htmlFor="user-image" className="border bg-gray-600 px-4 py-2 hover:bg-gray-500 text-white">Upload Image</label>
                    <input type="file" className="hidden" id="user-image" onChange={(e) => {
                        setImageUpload(e.target.files ? e.target.files[0] : null)
                        !!e.target.files && setProileImage(URL.createObjectURL(e.target.files[0]))
                    }}
                    />
                </div>
                <div className="flex-1 relative">
                    <div className="mb-4">
                        <label className="input-field-label" htmlFor="name">
                            Name
                        </label>
                        <input className="input-field"
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            defaultValue={user?.displayName}
                            {...register("name", { required: true, pattern: /^[A-Za-z][A-Za-z0-9 -]*$/ })}
                        />
                        {errors.name && <span className="text-red-400">This field is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="input-field-label" htmlFor="email">
                            Email
                        </label>
                        <input className="input-field"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={user?.email}
                            disabled
                        />
                    </div>

                    <button className="btn absolute bottom-0">
                        Update
                        {
                            isLoading &&
                            <span>
                                <svg width="24" height="24" viewBox="0 0 24 24" style={{ display: "inherit" }}><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" /><path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" className="spinner_ajPY" /></svg>
                            </span>
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProfileComponent;