import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import "./Level.css";

const leaderboardData = [
  {
    name: "ABC",
    virtual_cash: "500",
  },
  {
    name: "XYZ",
    virtual_cash: "300",
  },
  {
    name: "BCD",
    virtual_cash: "100",
  },
  {
    name: "PQR",
    virtual_cash: "20",
  },
];

const Levels = () => {
  return (
    <Box sx={{ padding: "15px" }}>
      <Typography variant="h5">Levels</Typography>
      <div id="leaderboard">
        <div class="ribbon"></div>
        <table>
          {leaderboardData.map((item, index) => {
            <tr>
              <td class="number">{index}</td>
              <td class="name">{item.name}</td>
              <td class="points">
                {item.virtual_cash}
                <img
                  class="gold-medal"
                  src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true"
                  alt="gold medal"
                />
              </td>
            </tr>;
          })}
          {/* <tr>
            <td class="number">1</td>
            <td class="name">Lee Taeyong</td>
            <td class="points"> 258.244
              <img
                class="gold-medal"
                src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true"
                alt="gold medal"
              />
            </td>
          </tr> */}
        </table>
      </div>
    </Box>
  );
};

export default Levels;
