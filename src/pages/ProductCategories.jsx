import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import AddCategory from "../components/AddCategory";
import Table from "../components/Table";
import { categories, categoriesColumns } from "../data/categories";
import axios from "axios";

const ProductCategories = () => {
  
  const [open, setOpen] = React.useState(false);
  const [ data, setData ] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://easy-ruby-hen-cap.cyclic.app/product',
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      if(data.length === 0){
        setData(response.data.output);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }, [])

  console.log(data);
  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Typography variant="h6">Categories</Typography>

        {/* <Button
          variant="contained"
          color="primary"
          startIcon={<FiPlus />}
          sx={{ borderRadius: "20px" }}
          onClick={handleClickOpen}
        >
          Add Category
        </Button> */}
      </Box>
      <AddCategory open={open} handleClose={handleClose} />
      <Table
        data={data}
        fields={categoriesColumns}
        numberOfRows={data.length}
        enableTopToolBar={true}
        enableBottomToolBar={true}
        enablePagination={true}
        enableRowSelection={false}
        enableColumnFilters={true}
        enableEditing={false}
        enableColumnDragging={true}
      />
    </Box>
  );
};

export default ProductCategories;
