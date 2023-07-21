import React from 'react'
import { Grid } from '@mui/material'
import { Container } from '@mui/material'
import { Card } from '@mui/material'
import { CardHeader } from '@mui/material'
import { CardContent } from '@mui/material'
import { Typography } from '@mui/material'
import { Button } from '@mui/material'
import { Divider } from '@mui/material'
import "./Coupon.css"

const data =
{
    "coupons": [
        {
            "coupon_id": 1,
            "category": "Food",
            "name": "Delicious Diner",
            "coupon_code": "YUMMY10",
            "discount_percent": 10,
            "valid_from": "2023-07-01",
            "valid_until": "2023-07-31"
        },
        {
            "coupon_id": 2,
            "category": "Food",
            "restaurant_name": "Pizza Paradise",
            "coupon_code": "PIZZA20",
            "discount_percent": 20,
            "valid_from": "2023-08-01",
            "valid_until": "2023-08-31"
        },
        {
            "coupon_id": 3,
            "category": "Food",
            "restaurant_name": "Tasty Tacos",
            "coupon_code": "TACO15",
            "discount_percent": 15,
            "valid_from": "2023-09-01",
            "valid_until": "2023-09-30"
        },
        {
            "coupon_id": 4,
            "category": "Ola",
            "coupon_code": "RIDENOW",
            "discount_percent": 25,
            "valid_from": "2023-07-15",
            "valid_until": "2023-07-31"
        },
        {
            "coupon_id": 5,
            "category": "Ola",
            "coupon_code": "OLA50",
            "discount_percent": 50,
            "valid_from": "2023-08-01",
            "valid_until": "2023-08-15"
        },
        {
            "coupon_id": 6,
            "category": "Uber",
            "coupon_code": "UBER10",
            "discount_percent": 10,
            "valid_from": "2023-07-20",
            "valid_until": "2023-07-31"
        },
        {
            "coupon_id": 7,
            "category": "Shopping",
            "store_name": "Fashion Junction",
            "coupon_code": "FASHION25",
            "discount_percent": 25,
            "valid_from": "2023-07-01",
            "valid_until": "2023-07-31"
        },
        {
            "coupon_id": 8,
            "category": "Shopping",
            "store_name": "ElectroMart",
            "coupon_code": "ELECTRO20",
            "discount_percent": 20,
            "valid_from": "2023-08-01",
            "valid_until": "2023-08-31"
        }
    ]
}


const Coupons = () => {
    const CouponLayout = ({ title, description, discount, value }) => {
        return (
            <Container>
                <div className='coupon-card'>
                    <img width="100" src="https://static.vecteezy.com/system/resources/previews/008/470/225/original/heart-anime-cute-character-cartoon-model-emotion-illustration-clipart-drawing-kawaii-manga-design-idea-art-free-png.png" className='logo' />
                    <h3>10% off on all orders</h3>
                    <p>Valid till : 20 dec , 2021</p>
                    <div className='circle1'></div>
                    <div className='circle2'></div>
                </div>
            </Container>
        );
    };
    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-gray-800">Coupons</h1>
                <Grid container spacing={3}>
                    {data.coupons.map((coupon) => {
                        return (
                            <Grid item xs={12} md={6} lg={4}>
                                <CouponLayout title={coupon.coupon_code} description={coupon.category} discount={coupon.discount_percent} value="100" />
                            </Grid>
                        )
                    }
                    )}
                </Grid>
            </div>
        </div>
    )
}

export default Coupons