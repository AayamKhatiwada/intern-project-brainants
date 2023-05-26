import { Route, Routes } from "react-router-dom";
import Items from "../Home/Items";

const ProductRoute = () => {
    return (
        <>
            <Routes>
                <Route index element={<Items />} />
                <Route path=":category" element={<Items />} />
            </Routes>
        </>
    )
}

export default ProductRoute;