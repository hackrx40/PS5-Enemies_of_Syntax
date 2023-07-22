import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import React from "react";
import { links } from "../../data/links";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import { useLocation } from "react-router-dom";
import { BsFire } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import icon from "../../assets/images/icon.jpg";

const Sidebar = ({ window, sideBarWidth, mobileOpen, handleDrawerToggle }) => {
  const notify = () =>
    toast("Welcome back to FinanceGuru!", {
      icon: "👏",
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
  const drawer = (
    <div>
      <Toolbar sx={{ display: "flex", flexDirection: "center" }}>
        <img width="40%" src={icon} alt="icon" /> <Toaster />
      </Toolbar>
      <Divider />
      <List disablePadding>
        {links?.map((link, index) =>
          link?.subLinks ? (
            <SidebarItemCollapse {...link} key={index} />
          ) : (
            <SidebarItem {...link} key={index} />
          )
        )}
      </List>
      <center>
        <div
          style={{
            backgroundColor: "#FDC448",
            borderRadius: 10,
            position: "fixed",
            bottom: 5,
            textAlign: "center",
            padding: 10,
            fontWeight: "bold",
            color: "#111827",
            left: 33,
          }}
        >
          <div>
            Active streak 5{" "}
            <BsFire
              style={{ fontSize: "1.1rem", transform: "translateY(2.4px)" }}
            />
          </div>
        </div>
      </center>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const location = useLocation();
  const path = location.pathname;
  return path === "/login" ||
    path === "/signup" ||
    path === "/inbox" ||
    path === "/otp" ? null : (
    <Box
      component="nav"
      sx={{ width: { md: sideBarWidth }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      {/* For Mobile and Small Sized Tablets. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: sideBarWidth,
            backgroundColor: "sidebar.background",
            color: "sidebar.textColor",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* For Desktop and large Sized Tablets. */}
      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          "& .MuiDrawer-paper": {
            width: sideBarWidth,
            boxSizing: "border-box",
            borderRight: 0,
            backgroundColor: "sidebar.background",
            color: "sidebar.textColor",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
