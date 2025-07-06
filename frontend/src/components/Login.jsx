import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { login } from "../utils/userSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("malaya@gmail.com");
  const [password, setPassword] = useState("Password@123");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId: email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(login(res.data.user));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-4">
      <section className="text-center mb-5">
        <h2 className="text-3xl">Welcome to Echo!</h2>
      </section>

      <section className="flex justify-center">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>

          <label className="label">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="input"
            placeholder="Email"
          />

          <label className="label">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="input"
            placeholder="Password"
          />

          <button onClick={loginHandler} className="btn btn-neutral mt-4">
            Login
          </button>
        </fieldset>
      </section>
    </div>
  );
};

export default Login;
