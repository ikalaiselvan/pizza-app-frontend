import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Switch } from "react-router-dom"
import { PizzaCard } from "./PizzaCard";
import { Login } from "./Login";
import { Registration } from "./Registration";
import Navbar from "./Navbar";
import { Cart } from "./Cart";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import  ProtectedRouter  from "./component/Protected";
import CreatePizza from "./component/CreatePizza";
import { ForgotPass } from './component/ForgotPassword';
import { ResetPassword } from "./component/ResetPass";
import Razorpay from "./component/Razorpay";

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
      <BrowserRouter>
        <Navbar cart={cart} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
            <Route
              path="/pizza"
              element={<PizzaMap cart={cart} setCart={setCart} />}
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  setCart={setCart}
                  handleChange={handleChange}
                />
              }
            />
          <Route path="/create-pizza" element={<CreatePizza />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/passwordReset" element={<ResetPassword />} />
          <Route path="/razorpay" element={<Razorpay />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function PizzaMap({ cart, setCart }) {
  const [pizzaData, setPizzaData] = useState([]);

  // fetch data:
    useEffect(() => {
      try {
        async function fetchProduct() {
          const response = await fetch(
            "https://pizza-app-ellg.onrender.com/pizza"
          );
          const json = await response.json();
          setPizzaData(json);
        }
        fetchProduct();
      } catch (err) {
        console.log("error :", err);
      }
    }, []);

  return (
    <div className="mainCardContainer">
      {pizzaData.map((e) => (
        // console.log(e)
        <PizzaCard key={e._id} data={e} cart={cart} setCart={setCart} />
        
      ))}
    </div>
  );
}

export default App;
