import { Avatar, Box, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { countriesData } from "../../data/TopCountries";
import { useParams } from "react-router-dom";
import axios from "axios";

const Levels = ({ mylevel }) => {

    const [countries, setCountries] = useState([])
    const { id } = useParams()

    // useEffect   (() => {
    //   let config = {
    //     method: 'get',
    //     maxBodyLength: Infinity,
    //     url: `https://easy-ruby-hen-cap.cyclic.app/product/${id}`,
    //     headers: { }
    //   };

    //   axios.request(config)
    //   .then((response) => {
    //     console.log(response.data.product);
    //     setCountries(response.data.product);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // }, [])

    return (
        <Box sx={{ padding: "15px" }}>
            <Typography variant="h5">Levels</Typography>
            <Typography sx={{ fontSize: "12px", opacity: 0.7 }}>
                Saving history for 2023
            </Typography>
            <Box sx={{ my: 2 }}>
                {countriesData.map(({ id, name, amount, flag }, index) => (

                    (index + 1) <= Number(mylevel) ? (
                        <Stack
                            direction={"row"}
                            alignItems="center"
                            justifyContent={"space-between"}
                            spacing={2}
                            key={id}
                            sx={{ my: 3 }}
                            style={{ textDecoration: "line-through" }}
                        >
                            <Stack direction={"row"} alignItems="center" spacing={1}>
                                <Avatar src="https://clipartix.com/wp-content/uploads/2018/03/cartoon-trophy-2018-26.jpg" sx={{ width: 30, height: 30 }} />
                                <Typography>Level {index + 1}</Typography>
                            </Stack>
                            <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                                ${amount}
                            </Typography>
                        </Stack>
                    )
                        :
                        (index) == Number(mylevel) ? (
                            <Stack
                                direction={"row"}
                                alignItems="center"
                                justifyContent={"space-between"}
                                spacing={2}
                                key={id}
                                sx={{ my: 3 }}
                            >
                                <Stack direction={"row"} alignItems="center" spacing={1}>
                                    <Avatar src="https://clipartix.com/wp-content/uploads/2018/03/cartoon-trophy-2018-26.jpg" sx={{ width: 40, height: 40 }} />
                                    <Typography style={{fontWeight:700}}>Level {index + 1}</Typography>
                                </Stack>
                                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                                    ${amount}
                                </Typography>
                            </Stack>
                        ) :
                            (<Stack
                                direction={"row"}
                                alignItems="center"
                                justifyContent={"space-between"}
                                spacing={2}
                                key={id}
                                sx={{ my: 3 }}

                            >
                                <Stack direction={"row"} alignItems="center" spacing={1}>
                                    <Avatar src="https://clipartix.com/wp-content/uploads/2018/03/cartoon-trophy-2018-26.jpg" sx={{ width: 30, height: 30 }} />
                                    <Typography>Level {index + 1}</Typography>
                                </Stack>
                                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                                    ${amount}
                                </Typography>
                            </Stack>)

                ))}
            </Box>
        </Box>
    );
};

export default Levels;
