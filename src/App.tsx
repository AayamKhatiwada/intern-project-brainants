import React, { useContext } from 'react';
import firebase from "firebase/auth";
import { ReadCurrentCart, checkUser, getCategoriesFromFirebase, getUserData } from './firebase';
// import DATA from './data';
import LoginComponent from './Login/login.component';
import RegisterComponent from './Register/register.component';
import HomeComponent from './Home/home';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import CartComponent from './Home/cart';
import NavigateBarComponent from './Home/navigationBar';
import ProductRoute from './routes/product.route';
import { useQuery } from 'react-query';
import PrivateRoute from './Reuseables/privateRoute';
import { UserContext, UserContextInterface } from './Context/UserContext';
import { CartContext, CartContextInterface } from './Context/CartContext';
import { ShopContext, ShopContextInterface } from './Context/ShopContext';

const App: React.FC = () => {
  // const currentUser = useSelector((state: RootInterface) => state.user.user)
  const { userState, setUser, setLoading } = useContext<UserContextInterface>(UserContext);
  const currentUser = userState.user

  const { setCart } = useContext<CartContextInterface>(CartContext);
  const { setShopData } = useContext<ShopContextInterface>(ShopContext);

  const { refetch } = useQuery("fetchAllData", () => checkUser(async (userLog: firebase.User | null) => {
    if (userLog) {
      setLoading(true)

      const userData = await getUserData(userLog.uid)
      setUser(userData)

      const categories = await getCategoriesFromFirebase()
      setShopData(categories)

      const cart = await ReadCurrentCart(userData?.email)
      setCart(cart)

      setLoading(false)

    } else {
      // console.log("No Current User")
    }
  }),
    {
      enabled: !currentUser,
    }
  )

  // const handleFormSubmit = () => {
  //   addDataToFirebase(DATA);
  // };

  return (
    <div className="App">
      <Routes>
        <Route index element=
          {
            !currentUser ? (
              <div className='flex justify-around mt-5'>
                <RegisterComponent refetch={refetch} />
                <LoginComponent refetch={refetch} />
              </div>
            ) : <HomeComponent />
          }
        />
        <Route path='/cart' element={
          <PrivateRoute>
            <NavigateBarComponent />
            <CartComponent />
          </PrivateRoute>
        } />
        <Route path='/products/*' element={
          <PrivateRoute>
            <NavigateBarComponent />
            <ProductRoute />
          </PrivateRoute>
        } />
      </Routes>
    </div >

  );
};

export default App;
