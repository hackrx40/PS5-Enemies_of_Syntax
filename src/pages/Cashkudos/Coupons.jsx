import React from "react";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import "./Coupon.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const data = {
  coupons: [
    {
      coupon_id: 1,
      category: "Food",
      name: "Delicious Diner",
      coupon_code: "YUMMY10",
      discount_percent: 10,
      valid_from: "2023-07-01",
      valid_until: "2023-07-31",
    },
    {
      coupon_id: 2,
      category: "Food",
      restaurant_name: "Pizza Paradise",
      coupon_code: "PIZZA20",
      discount_percent: 20,
      valid_from: "2023-08-01",
      valid_until: "2023-08-31",
    },
    {
      coupon_id: 3,
      category: "Food",
      restaurant_name: "Tasty Tacos",
      coupon_code: "TACO15",
      discount_percent: 15,
      valid_from: "2023-09-01",
      valid_until: "2023-09-30",
    },
  ],
  coupons2: [
    {
      coupon_id: 4,
      category: "Transport",
      coupon_code: "RIDENOW",
      discount_percent: 25,
      valid_from: "2023-07-15",
      valid_until: "2023-07-31",
    },
    {
      coupon_id: 5,
      category: "Transport",
      coupon_code: "OLA50",
      discount_percent: 50,
      valid_from: "2023-08-01",
      valid_until: "2023-08-15",
    },
    {
      coupon_id: 6,
      category: "Uber",
      coupon_code: "UBER10",
      discount_percent: 10,
      valid_from: "2023-07-20",
      valid_until: "2023-07-31",
    },
  ],
  coupons3: [
    {
      coupon_id: 7,
      category: "Shopping",
      store_name: "Fashion Junction",
      coupon_code: "FASHION25",
      discount_percent: 25,
      valid_from: "2023-07-01",
      valid_until: "2023-07-31",
    },
    {
      coupon_id: 8,
      category: "Shopping",
      store_name: "ElectroMart",
      coupon_code: "ELECTRO20",
      discount_percent: 20,
      valid_from: "2023-08-01",
      valid_until: "2023-08-31",
    },
  ],
};

const Coupons = () => {
  const CouponLayout = ({
    title,
    description,
    discount,
    valid_until,
    value,
  }) => {
    const [coupon, setCoupon] = React.useState("######");

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
              <Typography sx={{ fontSize: "1.2rem" }} component="div">
                {discount}% OFF
              </Typography>
              <b>{description}</b> <br />
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
                    setCoupon(title);
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
          <Tab label="Food" />
          <Tab label="Transport" />
          <Tab label="Utilities" />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <Grid container spacing={3}>
            {data.coupons.map((coupon) => {
              return (
                <Grid item xs={12} md={6} lg={4}>
                  <CouponLayout
                    title={coupon.coupon_code}
                    description={coupon.category}
                    discount={coupon.discount_percent}
                    valid_until={coupon.valid_until}
                    value="100"
                  />
                </Grid>
              );
            })}
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Grid container spacing={3}>
            {data.coupons2.map((coupon) => {
              return (
                <Grid item xs={12} md={6} lg={4}>
                  <CouponLayout
                    title={coupon.coupon_code}
                    description={coupon.category}
                    discount={coupon.discount_percent}
                    valid_until={coupon.valid_until}
                    value="100"
                  />
                </Grid>
              );
            })}
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Grid container spacing={3}>
            {data.coupons3.map((coupon) => {
              return (
                <Grid item xs={12} md={6} lg={4}>
                  <CouponLayout
                    title={coupon.coupon_code}
                    description={coupon.category}
                    discount={coupon.discount_percent}
                    valid_until={coupon.valid_until}
                    value="100"
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
