import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/index.css";
import App from "./App";
import { ThemeToggleProvider } from "./contexts/ThemeContext";
import { CssBaseline } from "@mui/material";
// import { CometChat } from "@cometchat-pro/chat";

// const appID = "238598e661dfab4c";
// const region = "us";

// const authKey = "a6ff669bf49ea3b826218ca0af38456b76af26b9";

// const appSetting = new CometChat.AppSettingsBuilder()
//   .subscribePresenceForAllUsers()
//   .setRegion(region)
//   .build();
// CometChat.init(appID, appSetting).then(
//   () => {
//     console.log("Initialization completed successfully");
//     // You can now call login function.
//   },
//   (error) => {
//     console.log("Initialization failed with error:", error);
//     // Check the reason for error and take appropriate action.
//   }
// );

// const uid = "abcd";

// CometChat.login(uid, authKey).then(
//   user => {
//     console.log("Login Successful:", { user });    
//   },
//   error => {
//     console.log("Login failed with exception:", { error });
//     var user = new CometChat.User(uid);
//     user.setName("Kevin2");
//     CometChat.createUser(user, authKey).then(
//       user1 => {
//         console.log("user created", user1);
//       },error => {
//         console.log("error", error);
//       });
//   }
// );


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeToggleProvider>
      <CssBaseline />
      <Router>
        <App />
      </Router>
    </ThemeToggleProvider>
  </React.StrictMode>
);
