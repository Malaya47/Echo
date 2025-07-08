import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionsSlice";

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

  if (!connections) {
    return <h1>No connections found</h1>;
  }

  if (connections.length === 0) {
    return <h1>You have no connections</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mt-10 mb-6">
        Your Connections
      </h1>
      {connections && connections.length > 0 ? (
        <div className="grid gap-6">
          {connections.map((connection) => {
            const { firstName, lastName, age, gender, photoUrl, about, _id } =
              connection;
            return (
              <div
                key={_id}
                className="flex flex-col sm:flex-row items-center sm:items-start bg-white dark:bg-base-300 shadow-lg rounded-2xl p-6 transition-all hover:scale-[1.01]"
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
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {about}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No connections found.</p>
      )}
    </div>
  );
};

export default Connections;
