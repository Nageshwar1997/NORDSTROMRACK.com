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

function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <main className="min-h-[calc(100vh-120px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
