import styled from "@emotion/styled";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { categories, auctionTypes } from "../data/categories";
import { BiImageAdd } from "react-icons/bi";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import { CloudUpload } from "@mui/icons-material";
import Swal from "sweetalert2";

const AddProduct = () => {
  const [category, setCategory] = useState("");
  const imageInput = useRef(null);
  const [image, setImage] = useState();
  const [url, setUrl] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [aucType, setAucType] = useState("");
  const [data, setData] = useState({
    name: "",
    description: "",
    type: "Electronics",
    auctionType: "Normal",
    startPrice: "",
    startDate: new Date(),
    endDate: new Date(),
    image: "",
    seller: localStorage.getItem("user") ? localStorage.getItem("user") : "6451583e92a3b18816a34e4e",
  });

  const handleStartDateChange = (date) => {
    setData({ ...data, startDate: date });
  };

  const handleEndDateChange = (date) => {
    setData({ ...data, endDate: date });
  };

  const UploadBox = styled(Box)({
    marginTop: 30,
    height: 200,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderStyle: "dashed",
    borderWidth: "2px",
    borderColor: "divider",
  });

  const handleImageFile = (e) => {
    setImage(e.target.files[0]);
    setUrl(URL.createObjectURL(e.target.files[0]));
  };

  const createProduct = async (e) => {
    e.preventDefault();

    Swal.fire(
      'Added',
      'Your product has been sent for approval!',
      'success'
    )
    console.log(data);
    try {
      console.log(image);
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("type", data.type);
      formData.append("auctionType", data.auctionType);
      formData.append("startPrice", data.startPrice);
      formData.append("startDate", data.startDate);
      formData.append("endDate", data.endDate);
      formData.append("seller", data.seller);
      const result = await axios.post(
        "https://easy-ruby-hen-cap.cyclic.app/product/create",
        formData
      );
      console.log(result);
      // clear form
      setData({
        name: "",
        description: "",
        type: "Electronics",
        auctionType: "Normal",
        startPrice: "",
        startDate: new Date(),
        endDate: new Date(),
        image: "",
        seller: "6451583e92a3b18816a34e4e", //get from loclaSTorage after login & signup integration
      });
      setImage(null);
      setUrl(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Typography variant="h6" sx={{ marginBottom: "14px" }}>
        Add Product For Auction
      </Typography>
      <Paper
        sx={{
          boxShadow: "none !important",
          borderRadius: "12px",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "divider",
          p: "20px",
          maxWidth: "800px",
          margin: "0 auto",
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        <form onSubmit={createProduct} autoComplete="off">
          <Box sx={{ my: 2 }}>
            <TextField
              label="Product Name"
              variant="outlined"
              size="small"
              fullWidth
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </Box>
          <Box sx={{ mt: 4 }}>
            <TextField
              label="Product Description"
              variant="outlined"
              rows={4}
              fullWidth
              multiline
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </Box>
          <Box sx={{ mt: 4 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                value={data.type}
                onChange={(e) => setData({ ...data, type: e.target.value })}
              >
                {categories?.map(({ category_id, name }) => (
                  <MenuItem value={name} key={category_id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mt: 4 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">
                Auction Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Auction Type"
                value={data.auctionType}
                onChange={(e) => {
                  setData({ ...data, auctionType: e.target.value });
                }}
              >
                {auctionTypes?.map(({ type_id, type }) => (
                  <MenuItem value={type} key={type_id}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mt: 4, display: "flex", alignItems: "center", gap: 4 }}>
            <TextField
              label="Start Price"
              variant="outlined"
              rows={4}
              fullWidth
              size="small"
              value={data.startPrice}
              onChange={(e) => setData({ ...data, startPrice: e.target.value })}
            >
              <MenuItem key={data.startPrice} value={data.startPrice}>
                $
              </MenuItem>
            </TextField>
          </Box>
          <Box sx={{ mt: 4, display: "flex", alignItems: "center", gap: 17 }}>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Auction Start Date"
                variant="outlined"
                minDate={new Date()}
                rows={4}
                size="small"
                fullWidth
                value={data.startDate}
                onChange={handleStartDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                label="Auction End Date"
                variant="outlined"
                minDate={new Date()}
                rows={4}
                size="small"
                fullWidth
                value={data.endDate}
                onChange={handleEndDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider> */}
          </Box>
          <Box sx={{ mt: 4 }}>
            {url ? (
              <img
                width="100%"
                src={url}
                style={{
                  borderRadius: "5px",
                  maxHeight: "200px",
                  objectFit: "contain",
                }}
              />
            ) : (
              <div
                style={{
                  height: "200px",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Button
                  fullWidth
                  component="label"
                  style={{
                    height: "37px",
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                  value={image}
                  onChange={(e) => handleImageFile(e)}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <BiImageAdd
                      style={{ fontSize: "50px", color: "#027edd" }}
                    />
                    <Typography>
                      Drop your image here or{" "}
                      <span style={{ color: "#027edd", cursor: "pointer" }}>
                        browse
                      </span>
                    </Typography>
                    <Typography sx={{ fontSize: "12px" }}>
                      JPG, PNG and GIF images are allowed
                    </Typography>
                  </Box>
                  <input hidden accept="image/*" type="file" />
                </Button>
              </div>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: "30px",
            }}
          >
            <Button
              variant="contained"
              sx={{ borderRadius: "20px" }}
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default AddProduct;
