import React from 'react'
import badge from "../../assets/images/badge.png"
import { Grid, Typography } from '@mui/material'


const CurrStatus = () => {

    var points = 1000;
    return (
        <center>
            {/* <Grid container spacing={3}> */}
            {/* <Grid item xs={12} md={6} lg={6} style={{ display: 'flex', transform: "translateY(50px)", justifyContent: 'center', alignItems: 'center' }}> */}
            <img src={badge} style={{ width: '70%' }} alt='badge' />
            <center>
                <Typography>Points</Typography>
                <Typography variant="h2" style={{ fontWeight: 700 }}>{points}</Typography>
            </center>
            {/* </Grid> */}
            {/* </Grid> */}
        </center>
    )
}

export default CurrStatus