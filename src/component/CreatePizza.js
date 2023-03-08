import React from 'react';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Button from "@mui/material/Button";

export default function CreatePizza() {
    const navigate = useNavigate();
        const [prices, setPrices] = useState({
          small: 5,
          medium: 6,
          large: 7,
        });
             const priceForm = (value) => {
                setPrices((cred) => {
                 return { ...cred, ...value };
               });
               setcreatePizza(cred =>{
                return {...cred, prices}
               })
             };
            //  let one = {prices: [price]};
                  
    const [createPizza, setcreatePizza] = useState({
      id: "1",
      name: "Pepper barbique chicken",
      varients: ["small", "medium", "large"],
      category: "nonveg",
      image:
        "https://th.bing.com/th/id/OIP.gTBpgBflDwRjtg9WTRcgrgHaE8?w=280&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      desctiption: "pepper barbecue chicken I Cheese",
    });

const handleRegistration = async (event) => {
  try {
    event.preventDefault();
    console.log(createPizza)
    console.log("pizza",process.env.REACT_PIZZA_URL)
    console.log("auth", process.env.REACT_APP_BASE_URL);
    const response = await axios.post(
      `https://pizza-app-ellg.onrender.com/pizza/create`,
      createPizza,
      { withCredentials: true }
    );
    if (response) {
      navigate("/pizza");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

    const handleForm = (value) => {
      return setcreatePizza((cred) => {
        return { ...cred, ...value };
      });
      
    };

  return (
    <form onSubmit={handleRegistration}>
      <div className="create-pizza-container">
        <h2 style={{ color: "blue" }}>Create Pizza List</h2>
        <TextField
          fullWidth
          label="name"
          id="fullWidth"
          onChange={(e) => handleForm({ name: e.target.value })}
        />
        <TextField
          fullWidth
          label="Price - small"
          id="fullWidth"
          onChange={(e) => priceForm({ small: e.target.value })}
        />
        <TextField
          fullWidth
          label="Price - medium"
          id="fullWidth"
          onChange={(e) => priceForm({ medium: e.target.value })}
        />
        <TextField
          fullWidth
          label="Price - large"
          id="fullWidth"
          onChange={(e) => priceForm({ large: e.target.value })}
        />

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={["veg", "non-veg"]}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="category"
              onChange={(e) => handleForm({ category: e.target.value })}
            />
          )}
        />
        <TextField
          fullWidth
          label="Image link"
          id="fullWidth"
          onChange={(e) => handleForm({ image: e.target.value })}
        />
        <TextField
          fullWidth
          label="Product description"
          id="fullWidth"
          onChange={(e) => handleForm({ desctiption: e.target.value })}
        />
        <Button type="submit" variant="contained">Submit</Button>
      </div>
    </form>
  );
}
