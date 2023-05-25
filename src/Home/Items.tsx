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
    // const shop = useSelector((state: RootInterface) => state.shop.shop)
    // console.log(shop)
    const dispatch = useDispatch()

    const addToCart = (item: CartItem) => {
        dispatch(setName(currentUser?.displayName))
        dispatch(setEmail(currentUser?.email))
        dispatch(addCart(item))
        // console.log(item)
    }

    return (
        <section>
            {
                categories && (
                    <div className="my-10">
                        <h1 className="text-center text-3xl">{categories.title[0].toUpperCase() + categories.title.substring(1)}</h1>
                        <div className="flex justify-around	flex-wrap gap-2">
                            {
                                categories.items.map((item) => {
                                    return (
                                        <div key={item.id} className="w-1/5 flex flex-col items-center my-5">
                                            <div className="text-2xl p-2">{item.name}</div>
                                            <img src={item.imageUrl} alt={item.name} style={{ height: "20rem", width: "15rem", objectFit: "cover" }} />
                                            <div className="text-lg py-2">Price: {item.price}</div>
                                            <button onClick={() => addToCart(item)} className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600">Add to cart</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
        </section>
    )
}

export default Items;