import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./Login";
import { Registration } from "./Registration";
import Navbar from "./Navbar";
import { Cart } from "./Cart";
import { useState } from "react";
import Cookies from "js-cookie";
import  ProtectedRouter  from "./component/Protected";
import CreatePizza from "./component/CreatePizza";
import { ForgotPass } from './component/ForgotPassword';
import { ResetPassword } from "./component/ResetPass";
import Razorpay from "./component/Razorpay";
import { PizzaMap } from "./PizzaMap";


function App() {
  
  const [cart, setCart] = useState([]);
  const authToken = Cookies.get("accessToken");

  const handleChange = (item, d) => {
    let ind = -1;
    cart.forEach((data, index) => {

      if (data.data._id === item.data._id) ind = index;
    });
    const tempArr = cart;

    tempArr[ind].quantity += d;

    if (tempArr[ind].quantity === 0) tempArr[ind].quantity = 1;
    setCart([...tempArr]);
  };

  return (
    <div className="app">
      <Navbar cart={cart} />
      <h1>Welcome to pizza app</h1>
      {/* <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes> */}

      {/* <ProtectComponent> */}
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/pizza"
          element={
            <ProtectComponent>
              <PizzaMap cart={cart} setCart={setCart} />
            </ProtectComponent>
          }
        />
        <Route
          path="/cart"
          element={
            <Cart cart={cart} setCart={setCart} handleChange={handleChange} />
          }
        />
        <Route
          path="/create-pizza"
          element={
            <ProtectComponent>
              <CreatePizza />
            </ProtectComponent>
          }
        />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/passwordReset" element={<ResetPassword />} />
        <Route path="/razorpay" element={<Razorpay />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
      {/* </ProtectComponent> */}
    </div>
  );
}

function ProtectComponent({children}){
  console.log("hi ...")
  // return children;
  const navigate = useNavigate();
  console.log(window.localStorage.getItem("ifLogin"));
  if (JSON.parse(window.localStorage.getItem("ifLogin")) === true) {
    return children;
  } else {
    // navigate("/login");
    return <Navigate to="/login" />
  }
  
}

export default App;
