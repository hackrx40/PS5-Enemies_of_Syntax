import { Grid } from "@mui/material";
import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { BsGraphUpArrow, BsGraphDownArrow } from "react-icons/bs";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";

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

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const getData = async() => {
  let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwMjAwNjU3LCJpYXQiOjE2ODk5NDE0NTcsImp0aSI6IjM4OTgzY2RiN2E4NjQ2ZDBhODI0NWYxODllNjEzMmM1IiwidXNlcl9pZCI6MX0.Y8xupTUlhL6X506p5uM0-pVeHDZdCmlhXETfqqa44ag"
   }
   
   let response = await fetch("https://backend-r677breg7a-uc.a.run.app/api/bank/account/", { 
     method: "GET",
     headers: headersList
   });
   
   let data = await response.text();
   console.log(data);
}

const UserDashboardData = () => {
  const ComponentWrapper = styled(Box)({
    marginTop: "10px",
    paddingBottom: "10px",
  });

  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  getData();

  const [value2, setValue2] = React.useState(0);

  const handleChangeTab2 = (event, newValue) => {
    setValue2(newValue);
  };

  return (
    <Box>
      <ComponentWrapper>
        <Grid container spacing={1}>
          <Grid item lg={3}>
            <ComponentWrapper>
              <Paper
                sx={{
                  borderRadius: "12px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "divider",
                  height: "100%",
                  width: "280px",
                  padding: "35px",
                }}
              >
                <Typography variant="h6">Net Profit</Typography>
                <Typography variant="h4" style={{ color: "#11141c" }}>
                  ₹ 100000
                </Typography>
              </Paper>
            </ComponentWrapper>
          </Grid>
          <Grid item lg={3}>
            <ComponentWrapper>
              <Paper
                sx={{
                  boxShadow: "none !important",
                  borderRadius: "12px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "divider",
                  height: "100%",
                  width: "280px",
                  padding: "35px",
                }}
              >
                <Typography variant="h6">Your balance</Typography>
                <Typography variant="h4" style={{ color: "#11141c" }}>
                  ₹ 50000
                </Typography>
              </Paper>
            </ComponentWrapper>
          </Grid>
          <Grid item lg={3}>
            <ComponentWrapper>
              <Paper
                sx={{
                  boxShadow: "none !important",
                  borderRadius: "12px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "divider",
                  height: "100%",
                  width: "280px",
                  padding: "35px",
                }}
              >
                <Typography variant="h6">Bajaj points</Typography>
                <Typography variant="h4" style={{ color: "#11141c" }}>
                  3000
                </Typography>
              </Paper>
            </ComponentWrapper>
          </Grid>
          <Grid item lg={3}>
            <ComponentWrapper>
              <Paper
                sx={{
                  boxShadow: "none !important",
                  borderRadius: "12px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "divider",
                  height: "100%",
                  width: "280px",
                  padding: "35px",
                }}
              >
                <Typography variant="h6">Total Investment</Typography>
                <Typography variant="h4" style={{ color: "#11141c" }}>
                  ₹ 10000
                </Typography>
              </Paper>
            </ComponentWrapper>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item lg={6}>
            <ComponentWrapper>
              <Paper
                sx={{
                  boxShadow: "none !important",
                  borderRadius: "12px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "divider",
                  height: "100%",
                  padding: "35px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Typography variant="h6">Total Income</Typography>
                </div>
                <Tabs
                  value={value}
                  onChange={handleChangeTab}
                  aria-label="basic tabs example"
                >
                  <Tab label="Weekly" />
                  <Tab label="Monthly" />
                  <Tab label="Yearly" />
                </Tabs>
                <CustomTabPanel value={value} index={0}>
                  <Typography variant="h4" style={{ color: "#11141c" }}>
                    ₹ 750000
                  </Typography>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <Typography variant="h4" style={{ color: "#11141c" }}>
                    ₹ 50000
                  </Typography>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <Typography variant="h4" style={{ color: "#11141c" }}>
                    ₹ 5000
                  </Typography>
                </CustomTabPanel>
                <Typography>
                  <BsGraphUpArrow
                    style={{ color: "green", fontSize: "20px" }}
                  />
                  &nbsp; 18.07% Increase
                </Typography>
              </Paper>
            </ComponentWrapper>
          </Grid>
          <Grid item lg={6}>
            <ComponentWrapper>
              <Paper
                sx={{
                  boxShadow: "none !important",
                  borderRadius: "12px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "divider",
                  height: "100%",
                  padding: "35px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Typography variant="h6">Total Expenses</Typography>
                  <Tabs
                    value={value2}
                    onChange={handleChangeTab2}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Weekly" />
                    <Tab label="Monthly" />
                    <Tab label="Yearly" />
                  </Tabs>
                  <CustomTabPanel value={value2} index={0}>
                    <Typography variant="h4" style={{ color: "#11141c" }}>
                      ₹ 100000
                    </Typography>
                  </CustomTabPanel>
                  <CustomTabPanel value={value2} index={1}>
                    <Typography variant="h4" style={{ color: "#11141c" }}>
                      ₹ 50000
                    </Typography>
                  </CustomTabPanel>
                  <CustomTabPanel value={value2} index={2}>
                    <Typography variant="h4" style={{ color: "#11141c" }}>
                      ₹ 5000
                    </Typography>
                  </CustomTabPanel>
                  <Typography>
                    <BsGraphDownArrow
                      style={{ color: "red", fontSize: "20px" }}
                    />
                    &nbsp; 20.07% Decrease
                  </Typography>
                </div>
              </Paper>
            </ComponentWrapper>
          </Grid>
        </Grid>
      </ComponentWrapper>
    </Box>
  );
};

export default UserDashboardData;
