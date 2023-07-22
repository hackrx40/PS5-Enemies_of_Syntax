import React, { useState } from "react";
import Coupons from "./Coupons";
import { Box } from "@mui/system";
import Levels from "./Levels";
import { Paper } from "@mui/material";
import { Grid } from "@mui/material";
import { Divider, Typography, Avatar } from "@mui/material";
import styled from "@emotion/styled";
import CurrStatus from "./CurrStatus";
import { FaEllipsisH, FaTwitter } from "react-icons/fa";
import { customers } from "../../data/customers";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CashKudos = () => {
  const navigate = useNavigate();
  const eventfunction = () => {
    Swal.fire({
      title: "Do you want to register to the event?",
      showDenyButton: true,
      confirmButtonText: "Agree",
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Registered!", "", "success");
        navigate("/event");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  const ComponentWrapper = styled(Box)({
    marginTop: "10px",
    paddingBottom: "10px",
  });
  const [points, setPoints] = useState(1000);

  var mylevel = 2;
  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <ComponentWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                boxShadow: "none !important",
                borderRadius: "12px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "divider",
                height: "100%",
              }}
            >
              <CurrStatus points={points} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                boxShadow: "none !important",
                borderRadius: "12px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "divider",
                height: "100%",
              }}
            >
              <Paper
                sx={{
                  boxShadow: "none !important",
                  borderRadius: "12px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "divider",

                  padding: "16px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h5" sx={{ pb: 1 }}>
                    Social Media
                  </Typography>
                  <FaEllipsisH />
                </Box>
                <Divider />
                <Box sx={{ marginTop: 1 }}>
                  {customers
                    .slice(0, 4)
                    .map(({ customer_id, customer_name, email, img }) => (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          margin: "10px 0",
                        }}
                        key={customer_id}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Avatar src={img} sx={{ width: 30, height: 30 }} />
                          <Box>
                            <Typography variant="h6" sx={{ fontSize: "18px" }}>
                              {customer_name}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{ opacity: 0.7 }}
                            >
                              {email}
                            </Typography>
                          </Box>
                        </Box>
                        <a
                          href="http://twitter.com/share?text=text goes here&url=http://url goes here&hashtags=hashtag1,hashtag2,hashtag3"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaTwitter />
                        </a>
                      </Box>
                    ))}
                </Box>
              </Paper>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                boxShadow: "none !important",
                borderRadius: "12px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "divider",
                height: "100%",
              }}
            >
              <Levels mylevel={mylevel} />
            </Paper>
          </Grid>
        </Grid>
      </ComponentWrapper>
      <Splide
        options={{
          rewind: true,
          gap: "1rem",
          perPage: 3,
          perMove: 1,
          autoplay: true, // Enable auto play
          interval: 3000,
        }}
        aria-label="My Favorite Images"
      >
        <button onClick={eventfunction}>
          <SplideSlide>
            <Paper
              style={{ cursor: "pointer" }}
              sx={{
                boxShadow: "none !important",
                borderRadius: "12px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "divider",
                height: "100%",
              }}
            >
              <img
                alt="bajaj"
                src="https://cms-assets.bajajfinserv.in/is/image/bajajfinance/fixed-deposite-v1?scl=1&fmt=png-alpha"
                width={350}
                height={180}
              ></img>
            </Paper>
          </SplideSlide>
        </button>
        <button onClick={eventfunction}>
          <SplideSlide>
            <Paper
              sx={{
                boxShadow: "none !important",
                borderRadius: "12px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "divider",
                height: "100%",
              }}
            >
              <img
                alt="bajaj"
                src="https://images-eu.ssl-images-amazon.com/images/G/31/img16/vineet/Amazon-Pay-Later/Nov_21/770x350_Bajaj-Finserv.jpg"
                width={350}
                height={180}
              ></img>
            </Paper>
          </SplideSlide>
        </button>
        <button onClick={eventfunction}>
          <SplideSlide>
            <a
              href="https://www.bajajfinserv.in/rbl-dbs-credit-cards"
              target="_blank"
              rel="noreferrer"
            >
              <Paper
                sx={{
                  boxShadow: "none !important",
                  borderRadius: "12px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "divider",
                  height: "100%",
                }}
              >
                <img
                  alt="bajaj"
                  src="https://cms-assets.bajajfinserv.in/is/image/bajajfinance/credit-card-banner-4?scl=1&fmt=png-alpha"
                  width={350}
                  height={180}
                ></img>
              </Paper>
            </a>
          </SplideSlide>
        </button>
        <SplideSlide>
          <a
            href="https://www.bajajfinserv.in/emi-network"
            target="_blank"
            rel="noreferrer"
          >
            <Paper
              sx={{
                boxShadow: "none !important",
                borderRadius: "12px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "divider",
                height: "100%",
              }}
            >
              <img
                alt="bajaj"
                src="https://cms-assets.bajajfinserv.in/is/image/bajajfinance/car-insurance-v1-5?scl=1&fmt=png-alpha"
                width={350}
                height={180}
              ></img>
            </Paper>
          </a>
        </SplideSlide>
        <SplideSlide>
          <Paper
            sx={{
              boxShadow: "none !important",
              borderRadius: "12px",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "divider",
              height: "100%",
            }}
          >
            <img
              alt="bajaj"
              src="https://cms-assets.bajajfinserv.in/is/image/bajajfinance/mutual-fund-v1-1?scl=1&fmt=png-alpha"
              width={350}
              height={180}
            ></img>
          </Paper>
        </SplideSlide>
      </Splide>
      <Coupons setPoints={setPoints} points={points} />
    </Box>
  );
};

export default CashKudos;
