import { React, useContext } from "react";

import { redirectTo } from "@reach/router"
import UserContext from "../context/index";
import LoginPage from "../pages/LoginPage";

const PrivateRoute = ({ component: Component, context, ...rest }) => {
  const userContext = useContext(UserContext);
  return userContext.user ? <Component {...rest} /> : <LoginPage/>;
};

export default PrivateRoute;
