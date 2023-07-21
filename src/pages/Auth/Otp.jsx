import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import Card from "@mui/material/Card";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";

const theme = createTheme();

const Otp = () => {
  const onTop = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    onTop();
  }, []);

  const [passwordShow, setpassword] = React.useState(false);
  const [username, setUsername] = React.useState("");

  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    otp: "",
  });

  const inputChangeHandler = (e) => {
    setValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const verifyOTP = () => {
    const email = localStorage.getItem("email-id");
    // remove double quotes from string
    var email1 = email.substring(1, email.length - 1);
    console.log(email1);
    var data = JSON.stringify({
      otp: values.otp,
      email: email1,
    });
    console.log(data);
    var config = {
      method: "post",
      url: "https://easy-ruby-hen-cap.cyclic.app/user/verifyOtp",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then(function (response) {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userid", response.data.user._id);
        navigate("/");
      })
      .catch(function (error) {
        toast.error("Invalid Credentials", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setValues({
          otp: "",
        });
      });
      navigate("/");
  };

  return (
    <Box sx={{ padding: "4%" }}>
      <Card>
        <Grid container spacing={3}>
          <Grid
            item
            xs={false}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            sm={4}
            md={6}
          >
            <img
              src={
                "https://i.pinimg.com/736x/90/ea/63/90ea638a6f8e9ea59721b9f12b1f36b8.jpg"
              }
              alt="signup"
              style={{ width: "70%" }}
            />
          </Grid>
          <Grid item md={6}>
            <Grid container>
              <Grid item xs={12} style={{ padding: "5vh", height: "87vh" }}>
                <form autoComplete="off" style={{ width: "100%" }}>
                  <Grid container spacing={3}>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        textAlign: "left",
                        fontSize: "1.6rem",
                        fontWeight: "750",
                      }}
                    >
                      Login
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}></Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        fullWidth
                        id="otp"
                        name="otp"
                        label="OTP"
                        value={values.otp}
                        onChange={inputChangeHandler}
                        InputLabelProps={{ style: { fontSize: 20 } }}
                        InputProps={{
                          style: { fontSize: 25 },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{
                          backgroundColor: "black",
                        }}
                        component={motion.div}
                        whileHover={{
                          scale: 1.08,
                          textShadow: "0 0 8px rgb(255,255,255)",
                          transition: { duration: 0.3 },
                        }}
                        onClick={verifyOTP}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default Otp;
