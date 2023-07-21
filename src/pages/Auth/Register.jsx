import * as React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import chart from '../Images/chart.png'
// import Swal from "sweetalert2";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { ethers } from "ethers";


// import { url } from '../url.js'
const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password is too short')
    .required('Password is required'),
  firstname: yup
    .string('Enter your First Name')
    .required('First Name is required'),
  lastname: yup
    .string('Enter your Last Name')
    .required('Last Name is required'),
  confirmpass: yup
    .string('Enter your Confirm Password')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  phoneNumber: yup
    .string('Enter your Phone Number')
    .min(10, 'Phone Number is too short')
    .max(10, 'Phone Number is too long')
    .required('Phone Number is required'),
  pancard: yup
    .string('Enter your Pan Number')
    .required('Pan Number is required'),
});
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
      style={{ fontSize: "1.1rem" }}
    >
      {"Copyright © "}
      <Link color="inherit" style={{ color: "#fc5296", textDecoration: "none" }}>
        Code of duty &nbsp;
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const Signup = () => {
  var history = useNavigate();

  const onTop = () => {
    window.scrollTo(0, 0);
  };
  const [profile,setProfile] = React.useState("");
  const imageUpload = (e) => {
    console.log(e.target.files[0]);
    setProfile(e.target.files[0]);
  }
  useEffect(() => {
    onTop();
  }, []);
  const formik = useFormik({
    initialValues: {
      firstname: '',
      secretName: '',
      password: '',
      lastname: '',
      confirmpass: '',
      phoneNumber: '',
      pancard: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      var axios = require('axios');
      const formdata = new FormData();
      formdata.append("name", values.firstname + " " + values.lastname);
      formdata.append("password", values.password);
      formdata.append("email", values.email);
      formdata.append("phoneNumber", values.phoneNumber);
      formdata.append("pancard", values.pancard);
      formdata.append("metamask", "");
      try {
        let response = await axios.post('https://easy-ruby-hen-cap.cyclic.app/user/register', formdata)
        if (response.status === 201) {
          toast.success("User added");
          setTimeout(() => {
            history("/login");
          }, 1500)

        }

      } catch (err) {
        console.log(err);
        // toast.error("Something went wrong")
      }

    },
  });

  const [passwordShow, setpassword] = React.useState(false);
  const [passwordShow2, setpassword2] = React.useState(false);
  const [pan, setPan] = useState(false);
  const [role, setRole] = useState("User");
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  
  const handleRoleChange = () => {
    if(role === "User"){
      setRole("Metamask");
    }
    else{
      setRole("User");
    }
  };
  // definition
  var data = {
    name: formik.values.firstname+" "+formik.values.lastname,
    email: formik.values.email,
    password: formik.values.password,
    phoneNumber: formik.values.phoneNumber,
    pancard: formik.values.pancard,
    metamask: ""
  };

  const verifyPan = () => {
    const options = {
      method: "POST",
      url: "https://pan-card-verification1.p.rapidapi.com/v3/tasks/sync/verify_with_source/ind_pan",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "15b6349dcemsh9d506902b260d0fp1b6792jsna64ed0116bd9",
        "X-RapidAPI-Host": "pan-card-verification1.p.rapidapi.com",
      },
      data: `{"task_id":"74f4c926-250c-43ca-9c53-453e87ceacd1","group_id":"8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e","data":{"id_number":"${formik.values.pancard}"}}`,
    };
    axios.request(options)
      .then(function (response) {
        console.log(response.data);
        setPan(true);
        toast.success("Pan number verified", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch(function (error) {
        console.error(error);
        toast.error("Pan number not valid", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const connectMetamask = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  const registerMetamask = () => {
    if (!isConnected && role === "Metamask") {
      toast.error("Please Connect to Metamask", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    var data = {
      name: formik.values.firstname+" "+formik.values.lastname,
      email: formik.values.email,
      password: formik.values.password,
      phoneNumber: formik.values.phoneNumber,
      pancard: "",
      metamask: accountAddress,
    };

    var config = {
      method: "post",
      url: "https://easy-ruby-hen-cap.cyclic.app/user/register",
      header: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.success);
        localStorage.setItem("email-id", JSON.stringify(response.data.success.email));
        history("/otp");
      })
      .catch(function (error) {
        console.log(error);
        toast.error("User already exists", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const registerUser = () => {
    if (!pan && role === "User") {
      toast.error("Please verify your PAN number", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    var config = {
      method: "post",
      url: "http://localhost:3001/user/register",
      header: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data, "response 2");
        localStorage.setItem("token", response.data);
        history("/otp");
      })
      .catch(function (error) {
        console.log(error);
        toast.error("User already exists", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  console.log(role);
  return (
    <div style={{ padding: '4%' }}>
      {
        role !== "User" ? 
      <><ToastContainer />
      <Card>
        <Grid container spacing={3} style={{ overflow: "hidden" }}>
          <Grid item xs={false}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            sm={4}
            md={6}>
            <img src="https://i.pinimg.com/564x/9a/27/cf/9a27cfd8b3d84274c754c4480b81e9b4.jpg" alt="signup" style={{ width: "70%" }} />
          </Grid>
          <Grid item md={6}>
            <Grid container>
              <Grid item xs={12} style={{ padding: "5vh", height: "87vh" }}>
                <form onSubmit={formik.handleSubmit} autoComplete="off" style={{ width: "100%" }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sx={{ textAlign: "left", fontSize: "1.6rem", fontWeight: "750" }}>
                      Sign Up
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      {haveMetamask ? (
                        <><Typography>Metamask is installed</Typography>
                        {isConnected ? (<Typography> {accountAddress} : {accountBalance} ETH </Typography>)
                        :
                        (<Button onClick={() => connectMetamask()}>Web3 Not Enabled</Button>)}
                        </>
                      ):(<Typography>Install Metamask</Typography>)}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            id="firstname"
                            name="firstname"
                            label="First Name"
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                            helperText={formik.touched.firstname && formik.errors.firstname}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            id="lastname"
                            name="lastname"
                            label="Last Name"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                            helperText={formik.touched.lastname && formik.errors.lastname}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Phone Number"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Grid item xs={12} sm={12} md={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              id="password"
                              name="password"
                              label="Password"
                              type={passwordShow ? "text" : "password"}
                              value={formik.values.password}
                              onChange={formik.handleChange}
                              error={formik.touched.password && Boolean(formik.errors.password)}
                              helperText={formik.touched.password && formik.errors.password}
                              InputProps={{
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
                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              id="confirmpass"
                              name="confirmpass"
                              label="Confirm Password"
                              type={passwordShow2 ? "text" : "password"}
                              value={formik.values.confirmpass}
                              onChange={formik.handleChange}
                              error={formik.touched.confirmpass && Boolean(formik.errors.confirmpass)}
                              helperText={formik.touched.confirmpass && formik.errors.confirmpass}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onMouseDown={(e) => e.preventDefault()}
                                      edge="end"
                                      onClick={() => {
                                        setpassword2(!passwordShow2);
                                      }}
                                    >
                                      {passwordShow2 ? (
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

                      </Grid>
                      <br />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Button size="large" variant="contained" fullWidth
                            sx={{
                              backgroundColor: 'black'
                            }}
                            onClick={handleRoleChange}>
                            {role === "User" ? "Connect Metamask" : "Register without Metamask"}
                          </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Button size="large" variant="contained" fullWidth type="submit"
                            sx={{
                              backgroundColor: 'black'
                            }}
                            onClick={registerMetamask}
                            >
                            Submit
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      
                    </Grid>
                    <Grid item xs={12} sx={{ fontSize: "1.2rem", fontWeight: "550" }}>
                      <Link to='/login' style={{ textDecoration: "none", color: "black" }}>Have an account? Login</Link>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
      </>
      
      :
      
      <><ToastContainer />
      <Card>
        <Grid container spacing={3} style={{ overflow: "hidden" }}>
          <Grid item xs={false}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            sm={4}
            md={6}>
            <img src="https://i.pinimg.com/564x/9a/27/cf/9a27cfd8b3d84274c754c4480b81e9b4.jpg" alt="signup" style={{ width: "70%" }} />
          </Grid>
          <Grid item md={6}>
            <Grid container>
              <Grid item xs={12} style={{ padding: "5vh", height: "87vh" }}>
                <form onSubmit={formik.handleSubmit} autoComplete="off" style={{ width: "100%" }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sx={{ textAlign: "left", fontSize: "1.6rem", fontWeight: "750" }}>
                      Sign Up
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            id="pancard"
                            name="pancard"
                            label="Pan Card Number"
                            value={formik.values.pancard}
                            onChange={formik.handleChange}
                            error={formik.touched.pancard && Boolean(formik.errors.pancard)}
                            helperText={formik.touched.pancard && formik.errors.pancard}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          {
                            pan? <Button variant="contained" disabled>Verified</Button>
                            : <Button variant="contained" onClick={verifyPan}>Verify</Button>
                          }
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            id="firstname"
                            name="firstname"
                            label="First Name"
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                            helperText={formik.touched.firstname && formik.errors.firstname}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            id="lastname"
                            name="lastname"
                            label="Last Name"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                            helperText={formik.touched.lastname && formik.errors.lastname}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Phone Number"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Grid item xs={12} sm={12} md={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              id="password"
                              name="password"
                              label="Password"
                              type={passwordShow ? "text" : "password"}
                              value={formik.values.password}
                              onChange={formik.handleChange}
                              error={formik.touched.password && Boolean(formik.errors.password)}
                              helperText={formik.touched.password && formik.errors.password}
                              InputProps={{
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
                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              id="confirmpass"
                              name="confirmpass"
                              label="Confirm Password"
                              type={passwordShow2 ? "text" : "password"}
                              value={formik.values.confirmpass}
                              onChange={formik.handleChange}
                              error={formik.touched.confirmpass && Boolean(formik.errors.confirmpass)}
                              helperText={formik.touched.confirmpass && formik.errors.confirmpass}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onMouseDown={(e) => e.preventDefault()}
                                      edge="end"
                                      onClick={() => {
                                        setpassword2(!passwordShow2);
                                      }}
                                    >
                                      {passwordShow2 ? (
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

                      </Grid>
                      <br />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Button size="large" variant="contained" fullWidth
                            sx={{
                              backgroundColor: 'black'
                            }}
                            onClick={handleRoleChange}>
                            {role === "User" ? "Connect Metamask" : "Register without Metamask"}
                          </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Button size="large" variant="contained" fullWidth type="submit"
                            sx={{
                              backgroundColor: 'black'
                            }}
                            onClick={registerMetamask}
                            >
                            Generate OTP
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      
                    </Grid>
                    <Grid item xs={12} sx={{ fontSize: "1.2rem", fontWeight: "550" }}>
                      <Link to='/login' style={{ textDecoration: "none", color: "black" }}>Have an account? Login</Link>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
      </>
    }  
    </div>


  );
};

export default Signup;
