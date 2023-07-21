import { BsCurrencyDollar } from "react-icons/bs";
import { FaHandshake, FaShare,FaRobot } from "react-icons/fa";
import {
  FiHome,
  FiLayers,
  FiMail,
  FiMessageCircle,
  FiSettings,
  FiShoppingBag,
  FiShoppingCart,
  FiUsers,

} from "react-icons/fi";
import { BsCalendar4Event } from "react-icons/bs"
import { MdAdminPanelSettings } from "react-icons/md";

const admin = false;
// export const links = [
//   // {
//   //   name: "Dashboard",
//   //   icon: <FiHome />,
//   //   url: "/",
//   // },
//   admin == true ?
//   {
//     name: "Admin",
//     icon: <MdAdminPanelSettings />,
//     url: "/admin",
//   }:
//   {
//     name: "Products",
//     icon: <FiShoppingBag />,
//     subLinks: [
//       {
//         name: "All Products",
//         url: "/",
//       },
//       {
//         name: "All Products (list view)",
//         url: "/products/list",
//       },
//       {
//         name: "Add Product",
//         url: "/products/add",
//       },
//     ],
//   },
//   // {
//   //   name: "Sales",
//   //   icon: <BsCurrencyDollar />,
//   //   subLinks: [
//   //     {
//   //       name: "Sales Analytics",
//   //       url: "/sales/analysis",
//   //     },
//   //     {
//   //       name: "Product Sales",
//   //       url: "/sales",
//   //     },
//   //   ],
//   // },
//   {
//     name: "Orders",
//     icon: <FiShoppingCart />,
//     url: "/orders",
//   },
//   {
//     name: "Profile",
//     icon: <FiMessageCircle />,
//     subLinks: [
//       {
//         name: "Settings",
//         icon: <FiSettings />,
//         url: "/profile/settings",
//       },
//       {
//         name: "Buying analysis",
//         url: "/profile/buying",
//       },
//       {
//         name: "Selling analysis",
//         url: "/profile/selling",
//       },
//     ],
//   },

//   {
//     name: "Inbox",
//     icon: <FiMail />,
//     url: "/inbox",
//   },
//   {
//     name: "Events",
//     icon: <BsCalendar4Event />,
//     url: "/events",
//   },
//   {
//     name : "CashKudos",
//     icon : <BsCurrencyDollar />,
//     url : "/cashkudos"
//   }

// ];

export const links = [
  {
    name: "Dashboard",
    icon: <FiHome />,
    url: "/",
  },
  {
    name: "CashKudos",
    icon: <BsCurrencyDollar />,
    url: "/cashkudos"
  },
  {
    name: "Profile",
    icon: <FiMessageCircle />,
    subLinks: [
      {
        name: "Settings",
        icon: <FiSettings />,
        url: "/profile/settings",
      },
      {
        name: "Transactions",
        url: "/profile/Transactions",
      },
      {
        name: "Categories",
        url: "/profile/categories",
      },
    ],
  },
  {
    name: "Virtual Assistant",
    icon: <FaRobot/>,
    url: "/virtualassistant",
  },
];

