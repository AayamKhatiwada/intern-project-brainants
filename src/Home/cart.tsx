import { useDispatch, useSelector } from "react-redux";
import { RootInterface } from "../store/store";
import { clearCart, decreaseCount, increaseCount, removeItemFromCart } from "../store/Cart/cartSlice";
import { submitCartToFirebase } from "../firebase";
import { useNavigate } from "react-router-dom";

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
    }

    return (
        <div>
            {
                cart.cart.length !== 0 ? (
                    <>
                        <div className="text-3xl my-3 font-cart-head">Cart</div>
                        <div className="flex justify-around	flex-wrap gap-4">
                            {
                                cart.cart.map((cartItem) => {
                                    total = total + (cartItem.price * cartItem.number)
                                    return (
                                        <div key={cartItem.id} className="w-1/5 flex flex-col items-center my-5">
                                            <div className="text-2xl p-2 font-cart-titles">{cartItem.name}</div>
                                            <img src={cartItem.imageUrl} alt={cartItem.name} style={{ height: "20rem", width: "15rem", objectFit: "cover" }} />
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
                        <div className="text-2xl">Total price: {total}</div>
                        <button onClick={submitToFirebase} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 my-5 border border-blue-700 rounded">
                            Buy
                        </button>
                    </>
                )
                    :
                    <div>There is nothing to look in the cart</div>
            }
        </div>
    )
}

export default CartComponent;