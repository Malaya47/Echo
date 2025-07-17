import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import FeedProfileCard from "./FeedProfileCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const fetchFeed = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(response.data.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (feed?.length === 0) {
    return <h1 className="text-center text-2xl mt-20">No new user found!</h1>;
  }

  return (
    <div>
      {feed && (
        <div className="flex justify-center mt-10">
          <FeedProfileCard user={feed[0]} />
        </div>
      )}
    </div>
  );
};

export default Feed;
