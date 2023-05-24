import React, { useEffect } from 'react';
import firebase from "firebase/auth";
import { Data, addDataToFirebase, checkUser, getCategoriesFromFirebase, getUserData } from './firebase';
import DATA from './data';
import LoginComponent from './Login/login.component';
import RegisterComponent from './Register/register.component';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, isLoading, removeUser } from './store/User/userSlice';
import { RootInterface } from './store/store';
import HomeComponent from './Home/home';
import { addShop } from './store/Shop/shopSlice';

const App: React.FC = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: RootInterface) => state.user.user)
  // console.log(currentUser)

  useEffect(() => {
    checkUser(async (userLog: firebase.User | null) => {
      // console.log("loading")
      dispatch(isLoading(true))
      // console.log(userLog)
      if (userLog) {
        const userData = await getUserData(userLog.uid)
        dispatch(addUser(userData))
        const categories: Data[] = await getCategoriesFromFirebase()
        // console.log(categories)
        dispatch(addShop(categories))
      } else {
        // console.log("No user found")
      }
      dispatch(isLoading(false))
    })
  }, [])

  // const handleFormSubmit = () => {
  //   addDataToFirebase(DATA);
  // };

  return (
    <div className="App">
      {!currentUser ? (
        <>
          <RegisterComponent />
          <LoginComponent />
        </>
      ) : (
        <HomeComponent />
      )}
    </div>

  );
};

export default App;
