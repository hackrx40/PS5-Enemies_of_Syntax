import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber'
import { Html, useProgress } from '@react-three/drei'
import { Suspense } from 'react'
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PreviewIcon from '@mui/icons-material/Preview';
import Divider from '@mui/material/Divider';
import ReactWhatsapp from 'react-whatsapp';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';
import { motion } from 'framer-motion';
import { Pannellum } from "pannellum-react";
import { CarView, ArtPiece } from "./3dProducts"
import realE1 from "../realestate/example3.jpg"
import Swal from 'sweetalert2';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



export default function ProductCard({ data }) {

    const [phone, setPhone] = useState("");
    function Loader() {
        const { progress } = useProgress()
        return <Html center style={{ color: "white" }}>{progress} % loaded</Html>
    }
    const navigate = useNavigate();
    const allDetail = (id) => {
        navigate(`/products/${id}`)
    }
    const [rating, setRating] = useState(3);

    const handleRatingChange = (event, value) => {
        setRating(value);
    };
    const [ highestBid, setHighestBid ] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [form, setForm] = React.useState(false);
    const handleOpenForm = (id) => {
        setForm(true);
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://easy-ruby-hen-cap.cyclic.app/product/${id}`,
            headers: {}
        };
        
        axios.request(config)
            .then((response) => {
                console.log(response.data);
                if(response.data.product.bids.length !== 0){
                    setHighestBid(response.data.product.bids[0].bidAmount)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const handleCloseForm = () => setForm(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const MotionCardMedia = motion(CardMedia);
    console.log(data.type);
    const enddate = new Date(data.endDate).toDateString().split(" ");
    const startdate = new Date(data.startDate).toDateString().split(" ");
    const [currentBid, setBid] = useState(null);

    const placeBid = (id) => {
        
        if(currentBid < highestBid){
            toast.error("Bid amount should be greater than current bid",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            return;
        }
        let data = JSON.stringify({
            "bidBy": localStorage.getItem("userId")?localStorage.getItem("userId"):"6451583e92a3b18816a34e4e",
            "bidOn": id,
            "bidAmount": currentBid
        });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://easy-ruby-hen-cap.cyclic.app/bid/create',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Card elevation={8} sx={{ maxWidth: 345 }} style={{ marginBottom: "20px" }} >

            <MotionCardMedia
                component="img"
                height="194"
                image={data.image || "https://imageio.forbes.com/specials-images/imageserve/5f85be4ed0acaafe77436710/0x0.jpg?format=jpg&width=1200"}
                alt="Paella dish"
                onClick={() => { allDetail(data._id) }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}

            />
            <CardContent>
                <Typography variant="body1" color="text.primary" style={{ fontSize: "23px" }}>
                    {data.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {data.auctionStatus == "Upcoming" ?
                        "Start data: " + startdate[2] + " " + startdate[1] + " " + startdate[3] : "End data: " + enddate[2] + " " + enddate[1] + " " + enddate[3]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Start price: ₹{data.startPrice}
                </Typography>
            </CardContent>
            <Divider />
            <CardContent>
                <Rating
                    name="star-rating"
                    value={rating}
                    onChange={handleRatingChange}
                    precision={0.5}
                    size="large"
                />
            </CardContent>
            <Divider />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {data.description}
                </Typography>
            </CardContent>
            <Divider />
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={handleOpen}>
                    <PreviewIcon />
                </IconButton>
                <IconButton aria-label="add to favorites" onClick={() => {handleOpenForm(data._id)}}>
                    {data.auctionStatus !== "Completed" ? <ShoppingBagIcon /> : <></>}
                </IconButton>
                {/* <IconButton aria-label="add to favorites">
                    <PreviewIcon />
                </IconButton> */}
                <IconButton aria-label="share">
                    <ReactWhatsapp number={phone} message={`${"Checkout the amazing auctioned item " + "http://localhost:3000/products/" + data._id}`} >
                        <ShareIcon />
                    </ReactWhatsapp>
                </IconButton>
            </CardActions>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {data.type === "Real estate" ? <Pannellum
                        width="100%"
                        height="500px"
                        image={realE1}
                        pitch={10}
                        yaw={180}
                        hfov={110}
                        autoLoad
                        showZoomCtrl={false}
                        onLoad={() => {
                            console.log("panorama loaded");
                        }}
                    >
                        <Pannellum.Hotspot
                            type="custom"
                            pitch={31}
                            yaw={150}
                            handleClick={(evt, name) => console.log(name)}
                            name="hs1"
                            s
                        />
                    </Pannellum>
                        : <Canvas >
                            <color attach="background" args={["white"]} />
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} />
                            <Suspense fallback={<Loader />}>
                                {data.type === "Art Piece" ? <ArtPiece /> : ""}
                                {data.type === "Car" ? <CarView /> : ""}
                                {data.type === "Electronics" ? <ArtPiece /> : ""}
                                <CarView />
                            </Suspense>
                        </Canvas>
                    }
                </Box>
            </Modal>
            <Modal
                open={form}
                onClose={handleCloseForm}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {data.type === "Construction" ? <Typography>Place your bid here: </Typography>
                    : <Typography>Last Bid {highestBid ? highestBid : data.startPrice}</Typography>
                    }
                    <TextField variant='outlined' label="Bid" required onChange={(e) => {setBid(e.target.value)}}/>
                    <Button variant="contained" color="primary" onClick={() => {placeBid(data._id)}}>Submit</Button>
                </Box>
            </Modal>
        </Card>
    );
}