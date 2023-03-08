import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

export function PizzaCard({data, cart, setCart}) {
  const [quantity, setQuantity] = useState(1);
  // console.log(data)
  const [varient, setVarient] = useState(`${data.varients[0]}`);
  const [warning, setWarning] = useState()
  // console.log(warning)
  

  function addToCart(item){
    let isPresent = false;
		cart.forEach((product)=>{
      // console.log(item._id, product.data._id)
			if (item._id === product.data._id)
			isPresent = true;
      setWarning(true);
		})
		if (isPresent){
			setWarning(true);
			// setTimeout(()=>{ 
				// setWarning(false);
			// }, 2000);
			return ;
		}
    setCart([...cart, {
      name: data.name,
      image: data.image,
      description: data.desctiption,
      varient: varient,
      quantity: quantity,
      data: data
    }])
  }

  return (

      <Card sx={{ display: 'flex', width: 280, maxHeight: 450, flexDirection: 'column', alignItems:"center"}}>
        <h3 className="cardHeader">{data.name}</h3>
        <img className="cardImage" src={data.image} alt={data.name}/>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {data.desctiption}
          </Typography>
        </CardContent>
        <div className="selection">
          <SelectVarient
            data={data}
            dataState={{ varient, setVarient}}
          />
          {/* <SelectPrice
            data={props.data}
            dataState={{ varient, setVarient}}
          /> */}
          <SelectQuantity quantityState = {{quantity, setQuantity}}/>
        </div>
        <div>
        <h3 className='price'>Price : Rs. {data.prices[varient] * quantity} /-</h3>
        </div>

        {warning ? <Button variant="contained" style={{ margin: "10px", backgroundColor: 'grey' }} onClick={()=>addToCart(data)}>
                      Added To Cart
                   </Button>
        : <Button variant="contained" style={{ margin: "10px", backgroundColor: 'rgb(38, 152, 38, 0.8)' }} onClick={()=>addToCart(data)}>
            Add To Cart
          </Button>}

        {/* <Button variant="contained" style={{ margin: "10px" }} onClick={()=>addToCart(data)}>
          Add To Cart
        </Button> */}
      </Card>

  );
}

// MUI Select
function SelectVarient(props) {
  // console.log(props.data.varients)

  const handleChange = (event) => {
    props.dataState.setVarient(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 90 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Varients</InputLabel>
        <Select
        sx={{ height: 40 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.dataState.varient}
          label="Varient"
          onChange={handleChange}
        >
          {props.data.varients.map((varient, i)=>{
                    return <MenuItem key={i} value={varient}>{varient}</MenuItem>
                })}
          {/* <MenuItem>{props.dataState.varient.map((varient)=>{return console.log(varient)})}</MenuItem> */}
          
          {/* <MenuItem value={`${props.data.varients[0]}`}>
            {props.data.varients[0]}
          </MenuItem>
          <MenuItem value={`${props.data.varients[1]}`}>
            {props.data.varients[1]}
          </MenuItem>
          <MenuItem value={`${props.data.varients[2]}`}>
            {props.data.varients[2]}
          </MenuItem> */}
        </Select>
      </FormControl>
      
    </Box>
  );
}

// function SelectPrice(props) {
//   const varient = props.dataState.varient;
//   const priceSmall = props.data.prices[0].small;
//   const priceMedium = props.data.prices[0].medium;
//   const priceLarge = props.data.prices[0].large;
//   console.log(priceSmall, priceMedium, priceLarge);

//   return (
//     <Box sx={{ minWidth: 120 }}>
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">price</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={varient}
//           label="price"
//         >
//           <MenuItem value={"small"}>{priceSmall}</MenuItem>
//           <MenuItem value={"medium"}>{priceMedium}</MenuItem>
//           <MenuItem value={"large"}>{priceLarge}</MenuItem>
//         </Select>
//       </FormControl>
//     </Box>
//   );
// }

function SelectQuantity(props) {

  function item(e){
    props.quantityState.setQuantity(e.target.value);
  }

  return (
    <Box sx={{ minWidth: 70 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
        <Select
        sx={{ height: 40 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.quantityState.quantity}
          label="quantity"
          onChange={item}
        >
          {[1,2,3,4,5].map((x , i)=>{
                return <MenuItem key={i} value = {i+1}>{i+1}</MenuItem>
            })}
          {/* <MenuItem value={"small"}>1</MenuItem> */}

        </Select>
      </FormControl>
    </Box>
  );
}