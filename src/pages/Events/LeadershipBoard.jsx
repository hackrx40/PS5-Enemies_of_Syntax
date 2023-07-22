import { Box, Typography } from "@mui/material";
import React from "react";
import "./Level.css";
import { FaTwitter } from "react-icons/fa";

const leaderboardData = [
  {
    name: "ABC",
    virtual_cash: "500",
    social:
      "http://twitter.com/share?text=text goes here&url=http://url goes here&hashtags=hashtag1,hashtag2,hashtag3",
  },
  {
    name: "XYZ",
    virtual_cash: "300",
    social:
      "http://twitter.com/share?text=text goes here&url=http://url goes here&hashtags=hashtag1,hashtag2,hashtag3",
  },
  {
    name: "BCD",
    virtual_cash: "100",
    social:
      "http://twitter.com/share?text=text goes here&url=http://url goes here&hashtags=hashtag1,hashtag2,hashtag3",
  }
];

const LeadershipBoard = () => {
  return (
    <Box sx={{ padding: "15px" }}>
      <Typography variant="h5">Levels</Typography>
      <div id="leaderboard">
        <div class="ribbon"></div>
        <table>
          {leaderboardData.map((item, index) => (
            <tr>
              <td class="number">{index + 1}</td>
              <td class="name">{item.name}</td>
              <td class="points">
                {item.virtual_cash}
                <img
                  class="gold-medal"
                  src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true"
                  alt="gold medal"
                />
              </td>
              <td>
                <a href={item.social} target="_blank" rel="noreferrer">
                  <FaTwitter />
                </a>
              </td>
            </tr>
          ))}
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

export default LeadershipBoard;
