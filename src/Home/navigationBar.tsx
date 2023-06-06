import { useDispatch, useSelector } from "react-redux";
import { RootInterface } from "../store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { signOutUser } from "../firebase";
import { removeUser } from "../store/User/userSlice";
import { SuccessNoty } from "../Reuseables/notifications";
import { useState } from "react";

const NavigateBarComponent = () => {

    const currentUser = useSelector((state: RootInterface) => state.user.user)
    const cartData = useSelector((state: RootInterface) => state.cart.cart)
    let items = 0

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    cartData.map((eachItem) => {
        items = items + eachItem.number
        return items
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const handleSignOut = () => {
        signOutUser().then(() => {
            dispatch(removeUser())
            SuccessNoty("Logout successful", 3000)
        })
    }

    return (
        <>
            <nav className="bg-gray-800 py-7 mb-4 sticky top-0 z-10">
                <div className="container mx-auto flex items-center justify-between flex-wrap px-4">
                    <div>
                        <div className="text-white text-lg font-semibold">E-commerce</div>
                    </div>
                    <button
                        type="button"
                        className="p-2 text-gray-500 rounded-lg md:hidden dark:text-gray-400 hover:bg-gray-700 focus:ring-2 focus:ring-gray-600"
                        onClick={toggleMenu}
                    >
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                    <div className={`${isOpen ? '' : 'hidden'} w-full md:block md:w-auto flex mt-4`}>
                        <ul className="flex flex-col md:flex-row md:space-x-8 md:mt-0 w-full space-y-2 md:space-y-0 items-center">
                            <li className="text-gray-300">Welcome {currentUser?.displayName}</li>
                            <li className={location.pathname === '/' ? "pointed-nav-item" : "unpointed-nav-item"} onClick={() => navigate('/')}>Home</li>
                            <li className={location.pathname === '/products' ? "pointed-nav-item" : "unpointed-nav-item"} onClick={() => navigate('/products')}>Products</li>
                            <li className={location.pathname === '/cart' ? "pointed-nav-item" : "unpointed-nav-item"} onClick={() => navigate('/cart')}>
                                Cart <sup className="px-1 py-0.5 bg-gray-500 rounded-full text-xs">{items}</sup>
                            </li>
                            <li className="relative group">
                                {
                                    !!currentUser?.image ?
                                        <img src={currentUser?.image} alt="" className="rounded-full w-10 h-10 object-cover mx-auto border-solid border-2 border-black cursor-pointer" />
                                        :
                                        <div className="w-10 h-10 text-xl null-image">
                                            {currentUser?.displayName ? currentUser?.displayName[0].toUpperCase() : ''}
                                        </div>
                                }
                                <ul className="absolute bg-gray-700 py-2 w-32 -left-10 ml-1 rounded-lg text-white z-10 hidden group-hover:block">
                                    <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer" onClick={() => navigate('/userProfile')}>Profile</li>
                                    <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer" onClick={() => handleSignOut()}>Sign Out</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavigateBarComponent;