import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/feedSlice";

const FeedProfileCard = ({ user }) => {
  const { firstName, lastName, age, gender, photoUrl, about, _id } = user;
  const dispatch = useDispatch();

  const requestHandler = async (status, id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser(id));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      {user && (
        <div className="relative max-w-md w-full rounded-3xl shadow-xl overflow-hidden bg-white dark:bg-base-200 transition-all hover:scale-[1.01] flex flex-col justify-between min-h-[520px]">
          {/* Profile Image */}
          <div className="h-96 w-full">
            <img
              src={photoUrl}
              alt={`${firstName} ${lastName}`}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Profile Info */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {firstName} {lastName},{" "}
                  <span className="text-xl text-gray-500">{age}</span>
                </h2>
                <span className="px-3 py-1 text-sm bg-pink-500 text-white rounded-full">
                  {gender}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {about}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-around p-5 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => requestHandler("ignored", _id)}
              className="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full font-semibold transition"
            >
              Ignore
            </button>
            <button
              onClick={() => requestHandler("interested", _id)}
              className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition"
            >
              Interested
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedProfileCard;
