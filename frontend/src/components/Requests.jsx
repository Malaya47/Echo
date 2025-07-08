import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);
  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(response.data.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRequest = async (requestId, status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequests(requestId));
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!requests) {
    return <h1>No requests found</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mt-10 mb-6">
        Your Requests
      </h1>
      {requests && requests.length > 0 ? (
        <div className="grid gap-6">
          {requests.map((request) => {
            const {
              _id: requestId,
              fromUserId: { firstName, lastName, age, gender, photoUrl, about },
            } = request;

            return (
              <div
                key={requestId}
                className="flex flex-col sm:flex-row items-center bg-white dark:bg-base-300 shadow-md rounded-2xl p-6 justify-between gap-6"
              >
                <div className="flex items-center gap-6 w-full sm:w-auto">
                  <div className="avatar">
                    <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-2 overflow-hidden">
                      <img
                        src={photoUrl}
                        alt={`${firstName} ${lastName}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold">
                      {firstName} {lastName}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {gender} | {age} yrs
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{about}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleRequest(requestId, "accepted")}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRequest(requestId, "rejected")}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          No new connection requests.
        </p>
      )}
    </div>
  );
};

export default Requests;
