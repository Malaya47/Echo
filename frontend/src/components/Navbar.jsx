import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../utils/userSlice";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { disconnectSocket, getSocket } from "../utils/socket";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const socket = getSocket();

    if (socket && socket.connected) {
      socket.emit("status", { status: "offline", userId: user._id });
    }
    disconnectSocket();

    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });

      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-3xl">
          Echo
        </Link>
        <Link to="/">Where developers meet</Link>
      </div>
      {user && (
        <div className="flex px-4 items-center gap-2">
          <p>Welcome {user?.firstName}</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  // src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  src={`${user?.photoUrl}`}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Your Connections</Link>
              </li>
              <li>
                <Link to="/requests">Received Requests</Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
