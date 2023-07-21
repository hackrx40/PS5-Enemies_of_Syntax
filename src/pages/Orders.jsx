import { Box, Typography } from "@mui/material";
import React, {useEffect, useState} from "react";
import Table from "../components/Table";
import { orders, ordersColumns } from "../data/orders";
import axios from "axios";


const Orders = () => {

  const [orders, setOrders] = useState([]);
  const user_id = localStorage.getItem('user_id')? localStorage.getItem('user_id') : "6451583e92a3b18816a34e4e";

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://easy-ruby-hen-cap.cyclic.app/user/${user_id}/products/bought`,
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(response.data.products)
      setOrders(response.data.products);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [])

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Table
        name="Products Bought"
        data={orders}
        fields={ordersColumns}
        numberOfRows={orders.length}
        enableTopToolBar={true}
        enableBottomToolBar={true}
        enablePagination={true}
        enableRowSelection={false}
        enableColumnFilters={true}
        enableEditing={false}
        enableColumnDragging={true}
        showPreview
        routeLink="orders"
      />
    </Box>
  );
};

export default Orders;
