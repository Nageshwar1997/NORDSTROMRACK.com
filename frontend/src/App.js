// CSS
import "./App.css";

// React
import { Outlet } from "react-router-dom";

// React Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
import SummaryApi from "./common";
import Context from "./context";

function App() {
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });
    // console.log("Data Response :", dataResponse);

    const dataApi = await dataResponse.json();
    console.log("Data Api :", dataApi);
  };
  useEffect(() => {
    // user Details;
    fetchUserDetails();
  }, []);
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, // for user details
        }}
      >
        <ToastContainer />
        <Header />
        <main className="min-h-[calc(100vh-120px)]">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
