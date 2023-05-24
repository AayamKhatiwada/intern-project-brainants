import { useDispatch, useSelector } from "react-redux";
import { Data } from "../firebase";
import { RootInterface } from "../store/store";
import { addCart, setEmail, setName } from "../store/Cart/cartSlice";

interface ItemsProps {
    categories: Data | null
}

export interface CartItem {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
}

const Items: React.FC<ItemsProps> = ({ categories }) => {

    const currentUser = useSelector((state: RootInterface) => state.user.user)
    const dispatch = useDispatch()
    const cart = useSelector((state: RootInterface) => state.cart)
    // console.log(cart)

    const addToCart = (item: CartItem) => {
        dispatch(setName(currentUser?.displayName))
        dispatch(setEmail(currentUser?.email))
        dispatch(addCart(item))
        // console.log(item)
    }

    return (
        <>
            {
                categories && (
                    <div>
                        <h1 style={{ textAlign: "center" }}>{categories.title}</h1>
                        <div style={{ display: "flex", flexWrap: "nowrap", justifyContent: "space-around" }}>
                            {
                                categories.items.map((item) => {
                                    return (
                                        <div key={item.id} style={{}}>
                                            <div>
                                                {item.name}
                                            </div>
                                            <img src={item.imageUrl} alt={item.name} width="100px" height="100px" />
                                            <div>Price: {item.price}</div>
                                            <button onClick={() => addToCart(item)}>Add to cart</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Items;