import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GOOGLE_API_KEY } from "../utils/constants";
import { searchVideos, setFetching } from "../utils/videosSlice";

const Button = ({ name }) => {
  const isFetching = useSelector((store) => store.videos.isFetching);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    try {
      dispatch(setFetching(true));
      dispatch(searchVideos([])); // clear old data

      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${name}&key=${GOOGLE_API_KEY}`,
      );

      const data = await response.json();

      dispatch(searchVideos(data.items));
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      dispatch(setFetching(false));
    }
  };

  return (
    <div
      onClick={!isFetching ? handleSearch : undefined}
      className={`shrink-0 px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition 
    ${
      isFetching
        ? "bg-gray-600 cursor-not-allowed opacity-50"
        : "bg-[#272727] text-white hover:bg-[#3f3f3f] cursor-pointer"
    }`}
    >
      {name}
    </div>
  );
};

export default Button;
