import { useDispatch, useSelector } from "react-redux";
import { RootInterface } from "../store/store";
import { Data, signOutUser } from "../firebase";
import { removeUser } from "../store/User/userSlice";
import Items from "./Items";
import { useState } from "react";
import CartComponent from "./cart";

const HomeComponent = () => {

    const dispatch = useDispatch()

    const currentUser = useSelector((state: RootInterface) => state.user.user)
    const isLoading = useSelector((state: RootInterface) => state.user.loading)
    const shopData = useSelector((state: RootInterface) => state.shop.shop)

    const [displayCategories, setDisplayCategories] = useState<Data | null>(null)
    // console.log(shopData)

    const handleSignOut = () => {
        signOutUser().then(() => {
            dispatch(removeUser())
        })
    }

    const displayItems = (categoryData: Data | null) => {
        return (
            <Items categories={categoryData} />
        )
    }

    return (
        <>
            {
                isLoading ? (
                    <h1>Loading</h1>
                ) :
                    (
                        <div>
                            <div>
                                Hello {currentUser?.displayName}
                            </div>
                            <button onClick={() => handleSignOut()}>Sign out</button>
                            <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "nowrap" }}>
                                {
                                    shopData?.map((category: Data) => {
                                        return (
                                            <div key={category.id} onClick={() => setDisplayCategories(category)}>
                                                <div>
                                                    Title: {category.title}
                                                </div>
                                                <img src={category.imageUrl} alt="" width="200px" height="200px" style={{ objectFit: "cover" }} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {displayItems(displayCategories)}
                            <CartComponent />
                        </div>
                    )
            }
        </>
    )
}
export default HomeComponent;