import styled from "@emotion/styled";
import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import BarChart from "../components/home/charts/BarChart";
import Stats from "../components/home/stats/Stats";
import TopCountries from "../components/home/TopCountries";
import TransactionCustomer from "../components/home/TransactionCustomer";
import Table from "../components/Table";
import { orders, ordersColumns } from "../data/orders";
import { MdLocationOn } from "react-icons/md";
import { Button } from "@mui/material";
import { CgArrowLongRight } from "react-icons/cg";
import {RiInstagramFill, RiFacebookCircleFill, RiLinkedinBoxFill} from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Dashboard = () => {

  const {id} = useParams()

  const [data, setData] = useState(null)

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://easy-ruby-hen-cap.cyclic.app/product/${id}`,
      headers: {}
    };
    
    axios.request(config)
    .then((response) => {
      if(data === null){
        setData(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }, [])
  
  const ComponentWrapper = styled(Box)({
    marginTop: "10px",
    paddingBottom: "10px",
  });

  const navigate = useNavigate()
  const goBack = () => {
    navigate("/");
  };

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>

       <KeyboardBackspaceIcon onClick={goBack} style={{cursor:"pointer"}}/>
      <Typography variant="h6" sx={{ marginBottom: "14px" }}>
        Dashboard
      </Typography>
      {/* <ComponentWrapper>
        <Stats />
      </ComponentWrapper> */}

      <ComponentWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <img src={data?.image} onerror="this.src='https://res.cloudinary.com/dkketilf1/image/upload/v1683095812/ellpajeb12vdfvot4dwv.jpg';"/>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
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
              <TopCountries />
            </Paper>
          </Grid>
        </Grid>
      </ComponentWrapper>
      <ComponentWrapper>
        <TransactionCustomer />
      </ComponentWrapper>

      <ComponentWrapper>
        <Typography variant="h5" sx={{ my: 3 }}>
          Latest Orders
        </Typography>
        <Table
          data={orders}
          fields={ordersColumns}
          numberOfRows={5}
          enableTopToolBar={false}
          enableBottomToolBar={false}
          enablePagination={false}
          enableRowSelection={false}
          enableColumnFilters={false}
          enableEditing={false}
          enableColumnDragging={false}
        />
      </ComponentWrapper>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          md={7}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1 className="heading">-------- CONTACT US</h1>
          <iframe
            className="map"
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.002340483474!2d72.83433341393042!3d19.10755325594757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9c676018b43%3A0x75f29a4205098f99!2sDwarkadas%20J.%20Sanghvi%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1638180891128!5m2!1sen!2sin"
            loading="lazy"
            style={{
              height: "80%",
              width: "80%",
              padding: "5% 10% 5% 15%",
            }}
          />
          <div className="address">
            <MdLocationOn
              style={{
                fontSize: "4.5rem",
                color: "#187271",
                paddingInline: "2%",
              }}
            />
            <p className="addressContact">
              No. U, 15, Bhaktivedanta Swami Rd, opp. Cooper Hospital, Navpada,
              JVPD Scheme, Vile Parle, Mumbai, Maharashtra 400056
            </p>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          columnGap={2}
          style={{
            padding: "10% 4% 8% 10%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontFamily: "montserrat",
              fontSize: "17px",
              color: "black",
            }}
          >
            <div>
            </div>
            <div style={{ textAlign: "left" }}>
              <h2 className="phoneHeading"> For Companies </h2>
              <p style={{ fontSize: "20px", py:"3px", color: "black" }}>
                Interested in being part of DJSCE’s Internship fair?
              </p>
              <a
                href="https://forms.gle/n6LhNHRWZLSxsXwHA"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Button
                  style={{
                    backgroundColor: "#187271",
                    color: "#FFFFFF",
                    fontSize: "18px",
                    marginBottom: "20px",
                    padding: "10px",
                  }}
                >
                  Join Us
                  <CgArrowLongRight style={{ fontSize: "1.8rem", paddingLeft: "1rem" }}/>
                </Button>
              </a>
              <h2 className="phoneHeading"> Contact Us </h2>
              <div style={{ textAlign: "left" }}>
                <a
                  style={{ color: "#fff", textDecoration: "none" }}
                  href="tel:+91 9987748170"
                >
                  <p style={{ fontSize: "20px", color: "black" }}>
                  Deap Daru - 9987748170
                  </p>
                </a>
                <a
                  style={{ color: "#fff", textDecoration: "none" }}
                  href="tel:+91 9819705248"
                >
                  <p style={{ fontSize: "20px", color: "black" }}>
                  Harvy Gandhi - 9819705248
                  </p>
                </a>
                <div style={{ paddingTop: "10px" }}>
                  <a
                    href="https://www.instagram.com/djsanghvi_acm/?hl=en"
                    rel="noreferrer"
                    target="_blank"
                    style={{
                      color: "#187271",
                      fontSize: "1.7rem",
                      padding: "2% 2% 0 0",
                    }}
                  >
                    <RiInstagramFill style={{fontSize:"2rem"}}/>
                  </a>
                  <a
                    href="https://in.linkedin.com/company/dj-sanghvi-acm"
                    rel="noreferrer"
                    target="_blank"
                    style={{
                      color: "#187271",
                      fontSize: "1.7rem",
                      padding: "2%",
                    }}
                  >
                    <RiLinkedinBoxFill  style={{fontSize:"2rem"}}/>
                  </a>
                  <a
                    href="https://www.facebook.com/djscoe.acm.5"
                    rel="noreferrer"
                    target="_blank"
                    style={{
                      color: "#187271",
                      fontSize: "1.7rem",
                      padding: "2%",
                    }}
                  >
                    <RiFacebookCircleFill  style={{fontSize:"2rem"}}/>
                  </a> 
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
