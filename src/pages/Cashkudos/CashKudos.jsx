import React, { Component } from 'react';
import Coupons from './Coupons';
import { Box } from '@mui/system';
import Levels from './Levels';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import { Divider, Typography, Avatar } from "@mui/material";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import CurrStatus from './CurrStatus';
import { FaEllipsisH } from "react-icons/fa";
import { Link } from "react-router-dom";
import { customers } from "../../data/customers";
import { transactions, transactionsColumns } from "../../data/transactions";

const CashKudos = () => {

    const ComponentWrapper = styled(Box)({
        marginTop: "10px",
        paddingBottom: "10px",
    });
    const [points,setPoints] = useState(1000);

    var mylevel = 2;
    return <Box sx={{ pt: "80px", pb: "20px" }}>
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
                        <CurrStatus points={points}/>
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
                                                    <Typography variant="subtitle1" sx={{ opacity: 0.7 }}>
                                                        {email}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <FaEllipsisH />
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
        <Coupons setPoint={setPoints}/>

    </Box>;
}

export default CashKudos;