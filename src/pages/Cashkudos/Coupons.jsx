import React from "react";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import "./Coupon.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TbCoinRupee } from "react-icons/tb"
import { useEffect } from "react";
import axios from "axios";

const data = {
  coupons: [
    {
      pk: 1,
      name: "Delicious Diner",
      category: "Food",
      discount: 10,
      expiry_date: "2023-07-31",
      value_points: 100
    },
    {
      pk: 2,
      name: "Pizza Paradise",
      category: "Food",
      discount: 10,
      expiry_date: "2023-08-31",
      value_points: 200
    },
    {
      pk: 3,
      name: "Tasty Tacos",
      category: "Food",
      discount: 10,
      expiry_date: "2023-09-30",
      value_points: 300
    }
  ],
  coupons2: [
    {
      pk: 4,
      name: "Cabs",
      category: "Transport",
      discount: 10,
      expiry_date: "2023-07-31",
      value_points: 300
  },
  {
      pk: 5,
      name: "Train Tickets Offer",
      category: "Transport",
      discount: 10,
      expiry_date: "2023-08-15",
      value_points: 1000
  },
  {
      pk: 6,
      name: "Air India",
      category: "Transport",
      discount: 10,
      expiry_date: "2023-07-31",
      value_points: 2000
  }
  ],
  coupons3: [
    {
      pk: 7,
      name: "Fashion Junction",
      category: "Shopping",
      discount: 25,
      expiry_date: "2023-07-31",
      value_points: 500
  },
  {
      pk: 8,
      name: "ElectroMart",
      category: "Shopping",
      discount: 10,
      expiry_date: "2023-08-31",
      value_points: 700
  }
  ],
};

const Coupons = ({getPoints}) => {
  const [dynamicData, setDynamicData] = React.useState();
  useEffect(() => {
    var config = {
      method: 'get',
      url: 'https://backend-r677breg7a-uc.a.run.app/api/budget/coupons/',
      headers: {}
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setDynamicData(response.data);
        console.log(dynamicData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const CouponLayout = ({
    pk,
    title,
    description,
    discount,
    valid_until,
    value,
  }) => {
    const [coupon, setCoupon] = React.useState("######");

    const handleRedemption = (pk) => {
      var config = {
        method: 'get',
        url: `https://backend-r677breg7a-uc.a.run.app/api/budget/redeemcoupons/${pk}/`,
        headers: {
          "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwMjQ3NjczLCJpYXQiOjE2ODk5ODg0NzMsImp0aSI6Ijk2YWJkYmQ5ZjZjMTQyYjZiMzEzNDJlZGM0NjFjZGFjIiwidXNlcl9pZCI6MX0.t81v7VQX_Z9aZioT2jMjpYAxBECPKXOSgX2iiVcpi-o',
        }
      };
  
      axios(config)
        .then(function (response) {
          console.log(response.data);
          getPoints();
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    return (
      <Container>
        <div className="coupon-card">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <Typography sx={{ fontSize: "1.4rem" }}>
                {discount}% OFF
              </Typography>
              <Typography variant="h6">{title}</Typography> <br />
              <Typography sx={{ fontSize: "0.8rem", color: "#FDC448" }} component="div">
                <TbCoinRupee style={{ fontSize: "20px", transform: "translateY(4px)" }} /> {value}
              </Typography>
            </div>
            <div>
              <Typography
                sx={{ color: "green", fontWeight: "600" }}
                variant="h5"
                component="div"
              >
                {coupon}
              </Typography>
              <span style={{ fontSize: "0.7rem" }}>
                Valid till {valid_until}
              </span>
              <br />
              {coupon === "######" ? (
                <Button
                  variant="contained"
                  onClick={() => {
                    handleRedemption(pk);
                  }}
                  style={{
                    backgroundColor: "#f50057",
                    color: "white",
                    marginTop: "10px",
                  }}
                >
                  Redeem
                </Button>
              ) : null}
            </div>
          </div>
          <div className="circle1"></div>
          <div className="circle2"></div>
        </div>
      </Container>
    );
  };

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800">Coupons</h1>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="All" />
          <Tab label="Food" />
          <Tab label="Transport" />
          <Tab label="Shopping" />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <Grid container spacing={3}>
            {dynamicData?.map((coupon) => {
              console.log(coupon.discount);
              return (
                <Grid item xs={12} md={6} lg={4}>
                  <CouponLayout
                    pk={coupon.pk}
                    title={coupon.name}
                    description={coupon.category}
                    discount={coupon.discount}
                    valid_until={coupon.expiry_date}
                    value={coupon.value_points}
                  />
                </Grid>
              );
            })}
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Grid container spacing={3}>
            {data.coupons.map((coupon) => {
              return (
                <Grid item xs={12} md={6} lg={4}>
                  <CouponLayout
                    pk={coupon.pk}
                    title={coupon.name}
                    description={coupon.category}
                    discount={coupon.discount}
                    valid_until={coupon.expiry_date}
                    value={coupon.value_points}
                  />
                </Grid>
              );
            })}
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Grid container spacing={3}>
            {data.coupons2.map((coupon) => {
              return (
                <Grid item xs={12} md={6} lg={4}>
                  <CouponLayout
                    pk={coupon.pk}
                    title={coupon.name}
                    description={coupon.category}
                    discount={coupon.discount}
                    valid_until={coupon.expiry_date}
                    value={coupon.value_points}
                  />
                </Grid>
              );
            })}
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Grid container spacing={3}>
            {data.coupons3.map((coupon) => {
              return (
                <Grid item xs={12} md={6} lg={4}>
                  <CouponLayout
                    pk={coupon.pk}
                    title={coupon.name}
                    description={coupon.category}
                    discount={coupon.discount}
                    valid_until={coupon.expiry_date}
                    value={coupon.value_points}
                  />
                </Grid>
              );
            })}
          </Grid>
        </CustomTabPanel>
      </div>
    </div>
  );
};

export default Coupons;
