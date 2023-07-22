import React from 'react'
import { Box } from '@mui/system'
import styled from '@emotion/styled'
import { Paper } from '@mui/material'
import CurrStatus from '../Cashkudos/CurrStatus'
import { Grid } from '@mui/material'
import LeadershipBoard from './LeadershipBoard'

const Eventpage = () => {
    var points = 1000;
    const ComponentWrapper = styled(Box)({
        marginTop: "10px",
        paddingBottom: "10px",
    });
    return (
        <Box sx={{ pt: "80px", pb: "20px" }}>
            <ComponentWrapper>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4} lg={3}>
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
                    <Grid item xs={12} md={4} lg={9}>
                        <LeadershipBoard />
                    </Grid>
                </Grid>

            </ComponentWrapper>
        </Box>
    )
}

export default Eventpage