// import "./Login.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export function ResetPassword() {
  const [userData, setUserData] = useState({
    userId: "",
    token: "",
    password: "",
  });
  const navigate = useNavigate();
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");
  const userId = new URLSearchParams(search).get("id");

  useEffect(() => {
    setUserData({ ...userData, userId: userId, token: token });
  }, []);

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        `https://pizza-app-ellg.onrender.com/auth/resetPassword`,
        userData,
        { withCredentials: true }
      );
      if (response) {
        navigate("/login");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
