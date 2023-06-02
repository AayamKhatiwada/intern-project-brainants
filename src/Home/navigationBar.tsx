import { useDispatch, useSelector } from "react-redux";
import { RootInterface } from "../store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { signOutUser } from "../firebase";
import { removeUser } from "../store/User/userSlice";

const NavigateBarComponent = () => {

    const currentUser = useSelector((state: RootInterface) => state.user.user)
    const cartData = useSelector((state: RootInterface) => state.cart.cart)
    let items = 0

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
        })
    }

    return (
        <>
            <nav className="bg-gray-800 py-8 mb-4 sticky top-0 z-10">
                <div className="container mx-auto flex items-center justify-between px-4">
                    <div>
                        <div className="text-white text-lg font-semibold">E-commerce</div>
                    </div>
                    <div>
                        <ul className="flex space-x-12 items-center">
                            <li className="text-gray-300">Welcome {currentUser?.displayName}</li>
                            <li className={location.pathname === '/' ? "text-white cursor-pointer" : "text-gray-300 hover:text-white cursor-pointer"} onClick={() => navigate('/')}>Home</li>
                            <li className={location.pathname === '/products' ? "text-white cursor-pointer" : "text-gray-300 hover:text-white cursor-pointer"} onClick={() => navigate('/products')}>Products</li>
                            <li className={location.pathname === '/cart' ? "text-white cursor-pointer" : "text-gray-300 hover:text-white cursor-pointer"} onClick={() => navigate('/cart')}>Cart<sup className="px-1 py-0.5 m-1 bg-gray-500 rounded-full text-xs">{items}</sup></li>
                            <li className="relative group">
                                {
                                    !!currentUser?.image ?
                                        <img src={currentUser?.image} alt="" className="rounded-full w-10 h-10 object-cover mx-auto border-solid border-2 border-black cursor-pointer" />
                                        :
                                        <div className="bg-blue-400 text-white w-10 h-10 text-xl rounded-full flex items-center justify-center cursor-pointer">
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