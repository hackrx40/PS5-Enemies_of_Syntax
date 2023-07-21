import React from "react";
import SalesAnalytics from "./SalesAnalytics";
import ProductSales from "./ProductSales";
import UserDashboardData from "./UserDashboardData";

const UserSelling = () => {
  return (
    <div>
      <UserDashboardData />
      {/* <ProductSales /> */}
      <SalesAnalytics />
      {/* <Reviews/> */}
    </div>
  );
};

export default UserSelling;