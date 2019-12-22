import React, { useState, Component } from "react";
import { Router, Link, navigate } from "@reach/router";
import HomePage from "./pages/HomePage";
import RecordPage from "./pages/RecordPage";

// import "@elastic/eui/dist/eui_theme_light.css";
import ReportPage from "./pages/ReportPage";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import UserContext from "./context/index";

const setTheme = theme => {
  localStorage.setItem("theme", theme);
  window.location.reload();
};

export default class App extends Component {
  // state = {
  //   user: localStorage.getItem("user"),
  //   setUser: (userData, redirect) => {
  //     this.setState({ user: userData }, () => {
  //       localStorage.setItem("user", this.state.user);
  //       navigate(redirect);
  //     });
  //   }
  // };

  state = {
    meetingID: null,
    groupID: null
  };

  setMeetingGroupID = (meetingID, groupID) => {
    this.setState({
      meetingID,
      groupID
    });
  };

  componentWillMount() {
    if (localStorage.getItem("theme") === "dark") {
      const theme = "eui_theme_dark";
      const cssElement = document.getElementById("theme_css");
      if (cssElement) {
        const rootUrl = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "";
        const href = rootUrl + "/" + theme + ".css";
        cssElement.setAttribute("href", href);
      }
    } else {
      const theme = "eui_theme_light";
      const cssElement = document.getElementById("theme_css");
      if (cssElement) {
        const rootUrl = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "";
        const href = rootUrl + "/" + theme + ".css";
        cssElement.setAttribute("href", href);
      }
    }
  }

  render() {
    return (
      // <UserContext.Provider value={this.state}>
      <Router>
        <LandingPage path="/" />
        <SignUpPage path="/signup" />
        <LoginPage path="/login" />

        <HomePage
          path="/home"
          setTheme={setTheme}
          setMeetingGroupID={this.setMeetingGroupID}
        />
   
        {/* <PrivateRoute component={HomePage} path="/home" setTheme={setTheme} />
          <PrivateRoute component={RecordPage} path="/recording" />
          <PrivateRoute
            component={ReportPage}
            path="/report"
            setTheme={setTheme}
          /> */}
      </Router>
      // </UserContext.Provider>
    );
  }
}
