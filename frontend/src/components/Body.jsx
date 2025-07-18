import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { login } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const fetchUserData = async () => {
    if (userData) return;
    try {
      const response = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(login(response.data));
    } catch (error) {
      console.error(error);
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUserData();
    const socket = createSocketConnection();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
