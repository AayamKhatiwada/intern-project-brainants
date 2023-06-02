import { useDispatch, useSelector } from "react-redux";
import { RootInterface } from "../store/store";
import { useState } from "react";
import { UpdateUser } from "../firebase";
import { setName } from "../store/Cart/cartSlice";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
    name: string,
};

const ProfileComponent: React.FC<{ refetch: () => void }> = ({ refetch }) => {

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const dispatch = useDispatch()
    const user = useSelector((state: RootInterface) => state.user.user)

    const [imageUpload, setImageUpload] = useState<File | null>(null)
    const [profileImage, setProileImage] = useState<string | null | undefined>(user?.image)

    const handleUpdate: SubmitHandler<Inputs> = (data) => {
        const { name } = data

        !name && dispatch(setName(name))

        UpdateUser(user?.uid, name, imageUpload)

        refetch()
    }

    // console.log(profileImage)

    return (
        <div className="p-10">
            <div className="text-center text-6xl mb-8 font-cart-head">User Profile</div>
            <form onSubmit={handleSubmit(handleUpdate)} className="flex">
                <div className="flex-1 text-center">
                    {
                        !!profileImage ?
                            <img src={profileImage} alt="" className="rounded-full w-80 h-80 object-cover mx-auto mb-8 border-solid border-2 border-black" />
                            :
                            <div className="bg-blue-400 text-white w-80 h-80 text-9xl rounded-full flex items-center justify-center mx-auto mb-8">
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input className="border rounded w-full py-2 px-3 text-gray-700 focus:border-blue-500"
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            defaultValue={user?.displayName}
                            {...register("name", { required: true, pattern: /^[A-Za-z][A-Za-z0-9 -]*$/ })}
                        />
                        {errors.name && <span className="text-red-400">This field is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input className="border rounded w-full py-2 px-3 text-gray-700 focus:border-blue-500"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={user?.email}
                            disabled
                        />
                    </div>

                    <button className="bg-blue-500 px-4 py-2 hover:bg-blue-400 rounded text-white mt-4 absolute bottom-0">Update</button>
                </div>
            </form>
        </div>
    )
}

export default ProfileComponent;