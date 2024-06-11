/* eslint-disable react-hooks/exhaustive-deps */
// CSS
import "./App.css";

// React Router Dom
import { Outlet } from "react-router-dom";

// React
import { useEffect, useState } from "react";

// React Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Helpers
import SummaryApi from "./common";

// Context
import Context from "./context";

// React Redux
import { useDispatch } from "react-redux";

import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });
    // console.log("Data Response :", dataResponse);

    const dataApi = await dataResponse.json();

    // console.log("Data Api",dataApi)

    if (dataApi?.success) {
      dispatch(setUserDetails(dataApi?.data));
    }

    // console.log("Data Api From App :", dataApi);
  };

  const fetchAddToCartCount = async () => {
    const response = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: "include",
    });

    const responseCount = await response.json();

    console.log("Response Count", responseCount);
    setCartProductCount(responseCount?.data?.count);
  };
  useEffect(() => {
    // user Details;
    fetchUserDetails();

    // User Cart Count
    fetchAddToCartCount();
  }, []);
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, // for user details
          cartProductCount, // for cart product count
          fetchAddToCartCount, // for cart product count fetch api
        }}
      >
        <ToastContainer
          position="top-center"
          autoClose={2000}
          limit={1}
        />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
