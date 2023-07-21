import React from 'react'
import SalesAnalytics from './SalesAnalytics'
import ProductSales from './ProductSales'
import Reviews from './Reviews'

const UserSelling = () => {
    return (
        <div>
            <ProductSales />
            <SalesAnalytics />
            {/* <Reviews/> */}
        </div>
    )
}

export default UserSelling