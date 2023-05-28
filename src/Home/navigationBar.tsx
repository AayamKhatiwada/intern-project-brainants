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
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const handleSignOut = () => {
        signOutUser().then(() => {
            dispatch(removeUser())
            navigate('/')
        })
    }

    return (
        <>
            <nav className="bg-gray-800 py-8 mb-4 sticky top-0">
                <div className="container mx-auto flex items-center justify-between px-4">
                    <div>
                        <div className="text-white text-lg font-semibold">E-commerce</div>
                    </div>
                    <div>
                        <ul className="flex space-x-12">
                            <li className="text-gray-300">Welcome {currentUser?.displayName}</li>
                            <li className={location.pathname === '/' ? "text-white cursor-pointer" : "text-gray-300 hover:text-white cursor-pointer"} onClick={() => navigate('/')}>Home</li>
                            <li className={location.pathname === '/products' ? "text-white cursor-pointer" : "text-gray-300 hover:text-white cursor-pointer"} onClick={() => navigate('/products')}>Products</li>
                            <li className={location.pathname === '/cart' ? "text-white cursor-pointer" : "text-gray-300 hover:text-white cursor-pointer"} onClick={() => navigate('/cart')}>Cart<sup className="px-1 py-0.5 m-1 bg-gray-500 rounded-full text-xs">{items}</sup></li>
                            <li className="text-gray-300 hover:text-white cursor-pointer" onClick={() => handleSignOut()}>Sign Out</li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavigateBarComponent;