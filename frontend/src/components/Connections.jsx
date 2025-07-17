import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionsSlice";
import { Link } from "react-router";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(response.data.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-semibold">You have no connections.</h1>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mt-10 mb-8">
        Your Connections
      </h1>

      <div className="grid gap-6">
        {connections.map((connection) => {
          const {
            firstName,
            lastName,
            age,
            gender,
            photoUrl,
            about,
            _id,
            status,
          } = connection;

          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row items-center sm:items-start bg-white dark:bg-base-300 shadow-xl rounded-2xl p-6 border transition-transform hover:scale-[1.01]"
            >
              <div className="avatar mb-4 sm:mb-0 sm:mr-6">
                <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                  <img
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between w-full gap-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full">
                  <div className="text-center sm:text-left">
                    <h4 className="text-xl font-semibold text-primary mb-1">
                      {firstName} {lastName}
                    </h4>
                    <div className="flex justify-center sm:justify-start items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                        {gender}
                      </span>
                      <span className="px-3 py-1 bg-secondary text-white text-sm rounded-full">
                        {age} years
                      </span>
                      {status && (
                        <span
                          className={`px-3 py-1 text-sm rounded-full ${
                            status === "online"
                              ? "bg-green-500 text-white"
                              : "bg-gray-400 text-white"
                          }`}
                        >
                          {status}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm max-w-md">
                      {about}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end mt-4 sm:mt-0">
                  <Link
                    to={`/chat/${_id}`}
                    className="btn btn-primary text-white px-6 py-2 rounded-lg"
                  >
                    Chat
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
