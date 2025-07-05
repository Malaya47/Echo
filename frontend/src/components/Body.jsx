import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";

const Body = () => {
  return (
    <body>
      <Navbar />
      <Outlet />
    </body>
  );
};

export default Body;
