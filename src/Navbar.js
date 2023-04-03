import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import  Button  from '@mui/material/Button';
import  Toolbar  from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import  Badge  from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import API from "./globalApi/globalApi";


export default function Navbar({cart}) {
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);

  const handleLogout = async () => {
    window.localStorage.setItem("ifLogin", false);
    const response = await axios.get(`${API}/auth/logout`, {
      userCredentials: true,
    });
    if (response) {
      // removeCookie("accessToken");
      navigate("/login");
    }
  };


  // const handleLogout = async () => {
  //   const response = await axios.get(`${API}/auth/logout`, {
  //     userCredentials: true,
  //   });
  //   if (response) {
  //     removeCookie("accessToken");
  //     navigate("/login");
  //   }
  // };

  // console.log(cart.length)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link
              to="/pizza"
              style={{ textDecoration: "none", color: "white" }}
            >
              <HomeIcon />
            </Link>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pizza Delivery App
          </Typography>
          <Button color="inherit">
            <Link
              to="/create-pizza"
              style={{ textDecoration: "none", color: "white" }}
            >
              Create Pizza
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              to="/Login"
              style={{ textDecoration: "none", color: "white" }}
            >
              Login
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "white" }}
            >
              Register
            </Link>
          </Button>

          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={cart.length} color="error">
              <Link
                to="/cart"
                style={{ textDecoration: "none", color: "white" }}
              >
                <ShoppingCartIcon />
              </Link>
            </Badge>
          </IconButton>
          <Button color="inherit" onClick={handleLogout}>Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}