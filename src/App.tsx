import React from 'react';
import firebase from "firebase/auth";
import { ReadCurrentCart, checkUser, getCategoriesFromFirebase, getUserData, getUserImage } from './firebase';
// import DATA from './data';
import LoginComponent from './Login/login.component';
import RegisterComponent from './Register/register.component';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, isLoading } from './store/User/userSlice';
import { RootInterface } from './store/store';
import HomeComponent from './Home/home';
import { addShop } from './store/Shop/shopSlice';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import CartComponent from './Home/cart';
import NavigateBarComponent from './Home/navigationBar';
import ProductRoute from './routes/product.route';
import { setCart } from './store/Cart/cartSlice';
import PrivateRoute from './Reuseables/privateRoute';
import ProfileComponent from './Home/profile';
import { ToastContainer } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

const App: React.FC = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: RootInterface) => state.user.user)

  const { refetch } = useQuery(["fetchAllData"], () => checkUser(async (userLog: firebase.User | null) => {
    if (userLog) {
      dispatch(isLoading(true))

      const userData = await getUserData(userLog.uid)
      const image = await getUserImage(userLog.uid).then((url) => {
        return url
      })

      dispatch(addUser({ image: image, displayName: userData?.displayName, email: userData?.email, uid: userData?.uid }))

      const categories = await getCategoriesFromFirebase()
      dispatch(addShop(categories))

      const cart = await ReadCurrentCart(userData?.uid)
      dispatch(setCart(cart))

      dispatch(isLoading(false))

    } else {
      console.log("No Current User")
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
              <div className='flex justify-around mt-5 flex-col items-center space-y-5 md:items-stretch md:flex-row md:space-y-0'>
                <RegisterComponent />
                <LoginComponent />
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
        <Route path='/userProfile' element={
          <PrivateRoute>
            <NavigateBarComponent />
            <ProfileComponent refetch={refetch} />
          </PrivateRoute>
        } />
      </Routes>
      <ToastContainer />
    </div >

  );
};

export default App;
