import React from "react";
import SalesAnalytics from "./SalesAnalytics";
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