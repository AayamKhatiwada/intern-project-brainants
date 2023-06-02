import { useDispatch, useSelector } from "react-redux";
import { Data } from "../firebase";
import { RootInterface } from "../store/store";
import { addCart, setEmail, setName, setUid } from "../store/Cart/cartSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export interface CartItem {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
}

const Items: React.FC = () => {

    const dispatch = useDispatch()
    const { category } = useParams()

    const currentUser = useSelector((state: RootInterface) => state.user.user)
    const shop = useSelector((state: RootInterface) => state.shop.shop)
    const [categories, setCategories] = useState<Data[] | null | undefined>([])
    const cartdata = useSelector((state: RootInterface) => state.cart)

    const addToCart = (item: CartItem) => {
        !cartdata.name && dispatch(setName(currentUser?.displayName))
        !cartdata.email && dispatch(setEmail(currentUser?.email))
        !cartdata.uid && dispatch(setUid(currentUser?.uid))
        dispatch(addCart(item))
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
                                    <h1 className="text-center text-3xl text-led font-item-head font-bold">{category.title[0].toUpperCase() + category.title.substring(1)}</h1>
                                    <div className="flex justify-around	flex-wrap gap-2">
                                        {
                                            category.items.map((item) => {
                                                return (
                                                    <div key={item.id} className="w-1/5 flex flex-col justify-between items-center">
                                                        <div className="text-2xl p-2 font-item-titles flex-stretch-1 h-20 flex items-end text-center mb-2">{item.name}</div>
                                                        <img src={item.imageUrl} alt={item.name} className="h-80 w-60 object-cover" />
                                                        <div className="text-lg py-2">Price: {item.price}</div>
                                                        <button onClick={() => addToCart(item)} className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600">Add to cart</button>
                                                    </div>
                                                );
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