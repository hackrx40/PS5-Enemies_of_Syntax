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

const Login = () => {
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
    password: "",
    email: "",
  });

  const inputChangeHandler = (e) => {
    setValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const loginUser = () => {
    var data = JSON.stringify({
      password: values.password,
      email: values.email,
    });
    console.log(data);
    const uuid = values.email.split("@")[0];
    var config = {
      method: "post",
      url: "https://easy-ruby-hen-cap.cyclic.app/user/login",
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
          email: "",
          password: "",
        });
      });
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
                        id="email"
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={inputChangeHandler}
                        InputLabelProps={{ style: { fontSize: 20 } }}
                        InputProps={{
                          style: { fontSize: 25 },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Grid item xs={12} sm={12} md={12}>
                        <TextField
                          fullWidth
                          id="password"
                          name="password"
                          label="Password"
                          type={passwordShow ? "text" : "password"}
                          value={values.password}
                          onChange={inputChangeHandler}
                          InputLabelProps={{ style: { fontSize: 20 } }}
                          InputProps={{
                            style: { fontSize: 25 },
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onMouseDown={(e) => e.preventDefault()}
                                  edge="end"
                                  onClick={() => {
                                    setpassword(!passwordShow);
                                  }}
                                >
                                  {passwordShow ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
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
                        onClick={loginUser}
                      >
                        Submit
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ fontSize: "1.2rem", fontWeight: "550" }}
                    >
                      <Link
                        to="/signup"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {" "}
                        Don't have an account ? Sign Up
                      </Link>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ fontSize: "1rem", fontWeight: "500" }}
                    >
                      <Button
                        color="error"
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: "3vh" }}
                        onClick={() => {
                          Swal.fire({
                            title: "Input your email ",
                            input: "text",
                            inputLabel: "Email",
                            inputValidator: async (num) => {
                              console.log(num);
                              if (!num) {
                                return "You need to write something!";
                              } else if (num) {
                                var config2 = {
                                  method: "post",
                                  url: "http://localhost:3500/forgotpw/email",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  data: JSON.stringify({
                                    email: num,
                                  }),
                                };
                                axios(config2)
                                  .then(function (response) {
                                    console.log(JSON.stringify(response.data));

                                    navigate(`/changepassword/${num}`);
                                  })
                                  .catch((e) => {
                                    Swal.fire({
                                      title: "invalid",
                                      icon: "error",
                                    });
                                  });
                              }
                            },
                          });
                        }}
                        component={motion.div}
                        whileHover={{
                          scale: 1.08,
                          textShadow: "0 0 8px rgb(255,255,255)",
                          transition: { duration: 0.3 },
                        }}
                      >
                        <Link
                          to="#"
                          style={{
                            textDecoration: "none",
                            fontSize: ".8rem",
                            color: "red",
                          }}
                        >
                          Forgot Password ?
                        </Link>
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

export default Login;
