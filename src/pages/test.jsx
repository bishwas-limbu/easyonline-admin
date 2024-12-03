import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import ListProduct from "./pages/ListProduct";
import ProductOrders from "./pages/ProductOrders";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UnauthorizedAccess from "./pages/UnauthorizedAccess";

///export const backendUrl = import.meta.env.BACKEND_SERVER_URL;
export const currency = '$';


function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [token,setToken] = useState(
    localStorage.getItem('token')?localStorage.getItem('token'): ''
  );
 // console.log(token);
  useEffect(() => {
    localStorage.setItem('token',token);
  },[token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === '' ? (
        <Login setIsAdmin={setIsAdmin} setToken={setToken} />
      ) : (
        isAdmin === true ?
        <>
          <NavBar setToken={setToken}/>
          <hr />
          <div className="flex w-full">
            <SideBar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/create" element={<AddProduct isAdmin = {isAdmin} token={token}/>} />
                <Route path="/list" element={<ListProduct isAdmin = {isAdmin} token={token}/>} />
                <Route path="/orders" element={<ProductOrders isAdmin = {isAdmin} token={token}/>} />
              </Routes>
            </div>
          </div>
        </>
        :
        <UnauthorizedAccess />
      )}
    </div>
  );
}

export default App;
