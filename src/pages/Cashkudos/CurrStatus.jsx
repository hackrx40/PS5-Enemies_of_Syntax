import React from 'react'
import badge from "../../assets/images/badge.png"
import { Typography } from '@mui/material'


const CurrStatus = () => {

    var points = 1000;
    return (
        <center>
            <img src={badge} style={{ width: '60%' }} alt='badge' />
            <center>
                <Typography>Points</Typography>
                <Typography variant="h2" style={{ fontWeight: 700 }}>{points}</Typography>
            </center>
        </center>
    )
}

export default CurrStatus