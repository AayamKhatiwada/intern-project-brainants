import { useDispatch, useSelector } from "react-redux";
import { RootInterface } from "../store/store";
import { clearCart, decreaseCount, increaseCount, removeItemFromCart } from "../store/Cart/cartSlice";
import { submitCartToFirebase } from "../firebase";
import { useNavigate } from "react-router-dom";
import { SuccessNoty } from "../Reuseables/notifications";

const CartComponent = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    let total = 0

    const cart = useSelector((state: RootInterface) => state.cart)
    // console.log(cart)

    const increaseItem = (name: string) => {
        dispatch(increaseCount(name))
    }

    const decreaseItem = (name: string) => {
        dispatch(decreaseCount(name))
    }

    const removeItem = (name: string) => {
        dispatch(removeItemFromCart(name))
    }

    const submitToFirebase = () => {
        submitCartToFirebase(cart)
        dispatch(clearCart())
        navigate('/')
        SuccessNoty("Order has been placed", 3000)
    }

    return (
        <div>
            {
                cart.cart.length !== 0 ? (
                    <>
                        <div className="page-title">Cart</div>
                        <div className="flex justify-around	flex-wrap gap-4">
                            {
                                cart.cart.map((cartItem) => {
                                    total = total + (cartItem.price * cartItem.number)
                                    return (
                                        <div key={cartItem.id} className="w-1/5 flex flex-col items-center mb-5">
                                            <div className="text-2xl p-2 flex-stretch-1 h-20 flex items-end text-center mb-2 font-cart-titles">{cartItem.name}</div>
                                            <img src={cartItem.imageUrl} alt={cartItem.name} className="product-images" />
                                            <div>Pieces: {cartItem.number}</div>
                                            <div>Price per piece: {cartItem.price}</div>
                                            <div>Total: {cartItem.price * cartItem.number}</div>
                                            <div>
                                                <button onClick={() => increaseItem(cartItem.name)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Increase</button>
                                                <button onClick={() => decreaseItem(cartItem.name)} className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 m-1 rounded">Decrease</button>
                                                <button onClick={() => removeItem(cartItem.name)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Remove</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="text-2xl text-center">Total price: {total}</div>
                        <div className="text-center">
                            <button onClick={submitToFirebase} className="btn mt-4">
                                Buy
                            </button>
                        </div>
                    </>
                )
                    :
                    <div className="text-center">There is nothing to look in the cart</div>
            }
        </div>
    )
}

export default CartComponent;