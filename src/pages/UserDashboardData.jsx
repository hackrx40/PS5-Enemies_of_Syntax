import { Grid, MenuItem, Select } from "@mui/material";
import React from "react";
import { Box, Card, CardContent, Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { BsGraphUpArrow, BsGraphDownArrow } from "react-icons/bs";
import CountUp from "react-countup";

const UserDashboardData = () => {
  const ComponentWrapper = styled(Box)({
    marginTop: "10px",
    paddingBottom: "10px",
  });

  const [freq, setFreq] = React.useState("yearly");
  const [amount, setAmount] = React.useState(100000);

  const handleChange = (event) => {
    setFreq(event.target.value);
    if (event.target.value === "yearly") setAmount(100000);
    else if (event.target.value === "monthly") setAmount(5000);
    else if (event.target.value === "weekly") setAmount(750);
  };

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
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
                <Typography variant="h6">Net Worth</Typography>
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
                <Typography variant="h6">Total Cash used</Typography>
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
                <Typography variant="h6">CashKudos</Typography>
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
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Typography variant="h6">Total Income</Typography>
                  <Typography variant="h4" style={{ color: "#11141c" }}>
                    ₹ <CountUp end={amount} duration={2} />
                  </Typography>
                  <Typography>
                    <BsGraphUpArrow
                      style={{ color: "green", fontSize: "20px" }}
                    />
                    &nbsp; 18.07% Increase
                  </Typography>
                </div>
                <div>
                  <Select
                    label="Frequency"
                    value={freq}
                    onChange={handleChange}
                  >
                    <MenuItem value="yearly">Yearly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                  </Select>
                </div>
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
                }}
              >
                <Typography variant="h6">Total Expenses</Typography>
                <Typography variant="h4" style={{ color: "#11141c" }}>
                  ₹ 10000
                </Typography>
                <Typography>
                  <BsGraphDownArrow
                    style={{ color: "red", fontSize: "20px" }}
                  />{" "}
                  &nbsp; 20.07% Decrease
                </Typography>
              </Paper>
            </ComponentWrapper>
          </Grid>
        </Grid>
      </ComponentWrapper>
    </Box>
  );
};

export default UserDashboardData;
