import { PizzaCard } from "./PizzaCard";
import { useEffect, useState } from "react";
import axios from "axios";

export function PizzaMap({ cart, setCart }) {
  const [pizzaData, setPizzaData] = useState([]);

  useEffect(() => {
    try {
      async function fetchProduct() {
        const response = await axios.get(
          "https://pizza-app-ellg.onrender.com/pizza/all-pizzas",
          // "http://localhost:4001/pizza/all-pizzas",
          {
            // userCredentials: true,
            withCredentials: true,
          }
        );
        setPizzaData(response.data);
      }
      fetchProduct();
    } catch (err) {
      alert(`Error : ${err}`);
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
