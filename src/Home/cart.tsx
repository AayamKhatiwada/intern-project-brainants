import { useSelector } from "react-redux";
import { RootInterface } from "../store/store";

const CartComponent = () => {

    const cart = useSelector((state: RootInterface) => state.cart)
    let total = 0

    const increaseItem = (name: string) => {
        console.log(name)
    }

    const decreaseItem = (name: string) => {
        console.log(name)
    }

    const removeItem = (name: string) => {
        console.log(name)
    }

    return (
        <>
            {
                cart.cart.length !== 0 && (
                    <>
                        <h1>Cart</h1>
                        <div style={{ display: "flex", flexWrap: "nowrap", justifyContent: "start" }}>
                            {
                                cart.cart.map((cartItem) => {
                                    total = total + (cartItem.price * cartItem.number)
                                    return (
                                        <div style={{ margin: "0 2rem" }} key={cartItem.id}>
                                            <div>{cartItem.name}</div>
                                            <img src={cartItem.imageUrl} alt={cartItem.name} width="100px" height="100px" />
                                            <div>Pieces: {cartItem.number}</div>
                                            <div>Total: {cartItem.price * cartItem.number}</div>
                                            <button onClick={() => increaseItem(cartItem.name)}>Increase</button><br />
                                            <button onClick={() => decreaseItem(cartItem.name)}>Decrease</button><br />
                                            <button onClick={() => removeItem(cartItem.name)}>Remove</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <h1>Total: {total}</h1>
                    </>
                )
            }
        </>
    )
}

export default CartComponent;