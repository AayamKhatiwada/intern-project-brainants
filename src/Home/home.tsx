import { useSelector } from "react-redux";
import { RootInterface } from "../store/store";
import { Data } from "../firebase";
import NavigateBarComponent from "./navigationBar";
import { useNavigate } from "react-router-dom";

const HomeComponent = () => {

    const isLoading = useSelector((state: RootInterface) => state.user.loading)
    const shopData = useSelector((state: RootInterface) => state.shop.shop)

    const navigate = useNavigate()

    return (
        <>
            {
                isLoading ? (
                    <div className="text-8xl">Loading...</div>
                ) :
                    (
                        <div>
                            <NavigateBarComponent />
                            <div className="flex justify-around	flex-wrap gap-4">
                                {
                                    shopData?.map((category: Data) => {
                                        return (
                                            <div key={category.id} onClick={() => navigate(`/products/${category.title}`)} className="w-1/4 relative cursor-pointer">
                                                <img src={category.imageUrl} alt={category.title} style={{ objectFit: "cover", height: "300px" }} />
                                                <div className="text-6xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-gray-300 opacity-70">{category.title[0].toUpperCase() + category.title.substring(1)}</div>
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
export default HomeComponent;