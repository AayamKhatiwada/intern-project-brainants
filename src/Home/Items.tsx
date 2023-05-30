import { Data } from "../firebase";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextInterface } from "../Context/UserContext";
import { CartContext, CartContextInterface } from "../Context/CartContext";
import { ShopContext, ShopContextInterface } from "../Context/ShopContext";

export interface CartItem {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
}

const Items: React.FC = () => {

    // const dispatch = useDispatch()
    const { category } = useParams()

    // const currentUser = useSelector((state: RootInterface) => state.user.user)
    const { userState } = useContext<UserContextInterface>(UserContext);
    const currentUser = userState.user

    // const cartdata = useSelector((state: RootInterface) => state.cart)
    const { addCart, setEmail, setName, cartState } = useContext<CartContextInterface>(CartContext);
    const cartdata = cartState

    // const shop = useSelector((state: RootInterface) => state.shop.shop)
    const { shopState } = useContext<ShopContextInterface>(ShopContext);
    const shop = shopState.shop

    const [categories, setCategories] = useState<Data[] | null | undefined>([])

    const addToCart = (item: CartItem) => {
        !cartdata.name && setName(currentUser?.displayName)
        !cartdata.email && setEmail(currentUser?.email)
        addCart(item)
    }

    useEffect(() => {
        if (category === undefined) {
            setCategories(shop)
        } else {
            setCategories(shop?.filter((items) => {
                return items.title === category
            }))
        }
    }, [category, shop])

    // console.log(categories)

    return (
        <section>
            {
                categories?.length && (
                    <>
                        {
                            categories.map((category) =>
                                <div className="my-10" key={category.title}>
                                    <h1 className="text-center text-3xl">{category.title[0].toUpperCase() + category.title.substring(1)}</h1>
                                    <div className="flex justify-around	flex-wrap gap-2">
                                        {
                                            category.items.map((item) => {
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
                    </>
                )
            }
        </section>
    )
}

export default Items;