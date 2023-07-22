import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import Sidebar from "./components/common/Sidebar";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/common/Navbar";
import {
  AddProduct,
  Brands,
  Customers,
  Inbox,
  Orders,
  OrderTemplate,
  ProductCategories,
  Products,
  ProductSales,
  Reviews,
  SalesAnalytics,
  Settings,
  SingleCustomer,
  SingleOrder,
  SingleProduct,
  Suppliers,
  Transactions,
  Login,
  Signup,
  Events,
} from "./pages";
import { useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import UserSelling from "./pages/UserSelling";
import UserBuying from "./pages/UserBuying";
import SignInSide from "./pages/Auth/Register";
import Admin from "./pages/Admin";
import Otp from "./pages/Auth/Otp";
import CashKudos from "./pages/Cashkudos/CashKudos";
import Bot from "./pages/Bots";
import Eventpage from "./pages/Events/Eventpage";
import AlanHooks from "./AlanHooks"

const sideBarWidth = 250;

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [location, setLocation] = React.useState(window.location.pathname);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // useEffect(() => {
  //   alanBtn({
  //     key: "07070e457e92f6e7f793ccf062512ba02e956eca572e1d8b807a3e2338fdd0dc/stage",
  //     onCommand: (commandData) => {
  //       if (commandData.command === "go:back") {
  //         // Call the client code that will react to the received command
  //       }
  //     },
  //   });
  // }, []);

  useEffect(() => {
    if (window.location.pathname === "/inbox") {
      setLocation(window.location.pathname);
    }
  }, [location]);


  return (
    <div>
    <AlanHooks />
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Box sx={{ display: "flex" }}>
        <Navbar
          sideBarWidth={sideBarWidth}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Sidebar
          sideBarWidth={sideBarWidth}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            px: { xs: 1, md: 2 },
            width: { xs: "100%", md: `calc(100% - ${sideBarWidth}px)` },
          }}
        >
          <Routes>
            <Route path="/otp" element={<Otp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/inbox" element={<Inbox />} />
            {/* <Route path="/" element={<Products />} /> */}
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/:id" element={<Dashboard />} />
            <Route path="/products/list" element={<ProductCategories />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<SingleOrder />} />
            <Route path="/profile/settings" element={<Settings />} />
            <Route path="/profile/buying" element={<UserBuying />} />
            <Route path="/profile/selling" element={<UserSelling />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/admin" element={<Admin/>} />
            {/* <Route path="/events" element={<Events/>}/> */}


            {/* new */}
            <Route path='/' element={<UserSelling/>}/>
            <Route path='/cashkudos' element={<CashKudos/>}/>
            <Route path='/profile/transactions' element={<Transactions/>}/>
            <Route path='/virtualassistant' element={<Bot/>}/>
            <Route path='/goals' element={<Bot/>}/>
            <Route path='/event' element={<Eventpage/>}/>
            
          </Routes>
        </Box>
      </Box>
    </div>

  );
}

export default App;
