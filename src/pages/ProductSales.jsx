import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import DonutChart from "../components/DonutChart";
import Table from "../components/Table";
import {
  productSalesDognutChartData,
  productSalesDognutChartOptions,
} from "../data/chartData";
import { productSalesColumns } from "../data/productSales";
import axios from "axios";


const ProductSales = () => {
  const ComponentWrapper = styled(Box)({
    marginTop: "10px",
    paddingBottom: "10px",
  });

  const [productSales, setProductSales] = useState([]);
  const [productSalesDognutChartData, setProductSalesDognutChartData] = useState([]);
  const user_id = localStorage.getItem('user_id')? localStorage.getItem('user_id') : "6451583e92a3b18816a34e4e";

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://easy-ruby-hen-cap.cyclic.app/user/${user_id}/products`,
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(response.data.products);
      setProductSales(response.data.products);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [])

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      {/* <Typography variant="h6" sx={{ marginBottom: "14px" }}>
        Product Sales
      </Typography> */}
      <ComponentWrapper>
        <Table
          name="Product Auctioned"
          data={productSales}
          fields={productSalesColumns}
          numberOfRows={productSales.length}
          enableTopToolBar={true}
          enableBottomToolBar={true}
          enablePagination={true}
          enableRowSelection={false}
          enableColumnFilters={true}
          enableEditing={false}
          enableColumnDragging={true}
        />
      </ComponentWrapper>
      <ComponentWrapper>
        <Paper
          sx={{
            boxShadow: "none !important",
            borderRadius: "12px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",
            height: "100%",
            padding: "16px",
          }}
        >
          <Typography variant="h5">Product Sales per Category</Typography>
          <DonutChart
            chartOptions={productSalesDognutChartOptions}
            chartData={productSalesDognutChartData}
          />
        </Paper>
      </ComponentWrapper>
    </Box>
  );
};

export default ProductSales;
