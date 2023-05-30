import { useLocation, useNavigate } from "react-router-dom";
import { signOutUser } from "../firebase";
import { useContext } from "react";
import { UserContext, UserContextInterface } from "../Context/UserContext";
import { CartContext, CartContextInterface } from "../Context/CartContext";

const NavigateBarComponent = () => {

    // const currentUser = useSelector((state: RootInterface) => state.user.user)
    const { userState, removeUser } = useContext<UserContextInterface>(UserContext);
    const currentUser = userState.user

    // const cartData = useSelector((state: RootInterface) => state.cart.cart)
    const { cartState } = useContext<CartContextInterface>(CartContext);
    const cartData = cartState.cart
    let items = 0

    cartData.map((eachItem) => {
        items = items + eachItem.number
        return items
    })

    const navigate = useNavigate()
    const location = useLocation()

    const handleSignOut = () => {
        signOutUser().then(() => {
            removeUser()
            navigate('/')
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