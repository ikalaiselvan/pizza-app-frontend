import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export function Cart({ cart, setCart, handleChange }) {
  const navigate = useNavigate();
  // console.log(cart.data)
  let removeFromCart = (e) => {
    console.log(cart);
    const arr = cart.filter((item) => item.data.id !== e.id);
    setCart(arr);
  };

  let totalPrice = 0;

  return (
    <div className="cartContainer">
      {cart.map((e) => {
        // (console.log(e))
        totalPrice += e.quantity * e.data.prices[e.varient];
        return (
          <div className="cartSubContainer">
            <div className="cartImage">
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  border: "solid 2px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                src={e.image}
                alt={e.name}
              />
            </div>
            <div className="cartDetails">
              <div className="pizzaName">{e.name}</div>
              <div className="pizzaSubdetails">
                <div className="subBorder">
                  <span
                    style={{ color: "rgb(62, 62, 62)", fontWeight: "bold" }}
                  >
                    Size : &nbsp;{" "}
                  </span>{" "}
                  {e.varient}
                </div>
                <div className="subBorder">
                  <span
                    style={{ color: "rgb(62, 62, 62)", fontWeight: "bold" }}
                  >
                    Quantity : &nbsp;{" "}
                  </span>{" "}
                  {e.quantity} &nbsp;{" "}
                  <button onClick={() => handleChange(e, -1)}>-</button> &nbsp;{" "}
                  <button onClick={() => handleChange(e, +1)}>+</button>
                </div>
                <div className="subBorder">
                  Price: Rs. {e.quantity * e.data.prices[e.varient]} /-
                </div>
                <button
                  className="removeBtn"
                  onClick={() => removeFromCart(e.data)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <h2>Total Price : Rs. {totalPrice} /-</h2>
      <Button onClick={()=>navigate("/razorpay")} variant="contained">
        Buy Now
      </Button>
    </div>
  );
}
