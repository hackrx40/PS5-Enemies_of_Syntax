import { Box, Typography } from "@mui/material";
import React from "react";
import Table from "../components/Table";
import { transactions, transactionsColumns } from "../data/transactions";
import axios from 'axios';
import { useEffect } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = React.useState([]);
  useEffect(() => {
    var config = {
        method: 'get',
        url: 'https://hackrx4prod-r677breg7a-uc.a.run.app/api/bank/transaction/',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwMTkwNzIwLCJpYXQiOjE2ODk5MzE1MjAsImp0aSI6IjRjODc1NjM1ZjZjMDQzMWQ4MTgyMWQ4MjVjNGZhNmJiIiwidXNlcl9pZCI6MX0.rexC9WkAxgUfng84xWhU7cXqg8vCWoXdyiTc_27huvM'
        }
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            setTransactions(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}, [])

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Typography variant="h6" sx={{ marginBottom: "14px" }}>
        Transactions
      </Typography>
      <Table
        data={transactions}
        fields={transactionsColumns}
        numberOfRows={transactions.length}
        enableTopToolBar={true}
        enableBottomToolBar={true}
        enablePagination={true}
        enableRowSelection={true}
        enableColumnFilters={true}
        enableEditing={true}
        enableColumnDragging={true}
      />
    </Box>
  );
};

export default Transactions;
