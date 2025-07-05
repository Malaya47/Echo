import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";

const Body = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
