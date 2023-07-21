import React, { useEffect, useState } from "react";
import SHOP_DATA from "../../shop-data.json";
import CategoryItem from "./category-item";
import axios from "axios";
import { Box, Typography, Stack, Card, Button } from "@mui/material";

function RecommendProducts({ data }) {
  // console.log(productName);
  // console.log(data);

  const productName = "iPhone";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // let config = {
    //   method: "get",
    //   maxBodyLength: Infinity,
    //   url: "https://easy-ruby-hen-cap.cyclic.app/products",
    //   headers: {},
    // };

    // axios
    //   .request(config)
    //   .then((response) => {
    //     console.log(response.data.products);
    //     setData(response.data.products);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    axios
      .post("http://localhost:5000/recommend", {
        item: ["Iphone"],
      })
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
        // console.log(products);
      });
    console.log(products);
  }, [productName]);
  return (
    <Box>
      <Box>
        <Typography variant="h4" sx={{ py: 3, mx: 6 }}>
          Recommended Auctions - {productName}
        </Typography>
      </Box>
      <Stack
        direction="row"
        sx={{
          overflowX: "scroll",
          diplay: "flex",
          px: 1,
          my: 2,
        }}
      >
        {/* <Typography variant="h5">Testing</Typography> */}
        {products.length === 0 ? (
          products.map((item) => {
            console.log(item);
            return (
              <Box
                sx={{
                  mb: 4,
                  mx: 3,
                  pb: 2,
                  border: "2px solid black",
                  backgroundColor: "#F6F1F1",
                }}
                className="mb-4 mx-3 pb-2 border-2 rounded-lg border-gray-400"
              >
                <CategoryItem items={item}></CategoryItem>
                <Button
                  sx={{
                    border: "2px",
                    mx: 6,
                    px: 4,
                  }}
                  variant="contained"
                >
                  Bid Now
                </Button>
              </Box>
            );
          })
        ) : (
          <Typography variant="h5">No recommended products</Typography>
        )}
      </Stack>
    </Box>
  );
}

export default RecommendProducts;
