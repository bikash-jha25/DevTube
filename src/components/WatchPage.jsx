import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { GOOGLE_API_KEY, YOUTUBE_CHANNEL_API } from "../utils/constants";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { RiGeminiFill } from "react-icons/ri";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { TbNotes } from "react-icons/tb";
import CommentsContainer from "./CommentsContainer";
import { MdLiveTv } from "react-icons/md";
import LiveChat from "./LiveChat";
import AiChatBot from "./AiChatBot";
import { FaLaptopCode } from "react-icons/fa";
import Code from "./CodeFeatures/Code";
import Notes from "./Notes";

const WatchPage = () => {
  //close the sidebar by default when we click on the video and open the watch page
  //1. I want to do it once when component is mounted
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
  }, []);

  //Get the video id of the clicked video from URL => there is no ther way to get that
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  // 🔥 PANEL STATE (NEW)
  const [activePanel, setActivePanel] = useState(null);

  // 🔥 TOGGLE FUNCTION (NEW)
  const handlePanelToggle = (panelName) => {
    setActivePanel((prev) => (prev === panelName ? null : panelName));
  };

  //Information about the video
  const [videoInfo, setVideoInfo] = useState(null);
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    getVideoInfo();
  }, []);

  const getVideoInfo = async () => {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${GOOGLE_API_KEY}`,
    );
    const data = await response.json();
    setVideoInfo(data.items[0] || null);
  };

  //Information about the channel of the video
  const [ytIcon, setYtIcon] = useState(null);

  useEffect(() => {
    if (!videoInfo) return;
    const { channelId } = videoInfo.snippet;

    const getAvatar = async () => {
      try {
        const response = await fetch(
          YOUTUBE_CHANNEL_API + channelId + "&key=" + GOOGLE_API_KEY,
        );
        const data = await response.json();

        const icon =
          data?.items[0]?.snippet?.thumbnails?.high?.url ||
          data?.items?.[0]?.snippet?.thumbnails?.medium?.url ||
          data?.items?.[0]?.snippet?.thumbnails?.default?.url;

        setYtIcon(icon || null);
      } catch {
        setYtIcon(null);
      }
    };

    getAvatar();
  }, [videoInfo]);

  if (!videoInfo) return null;

  const { snippet, statistics } = videoInfo;
  const { channelTitle, localized, publishedAt } = snippet;
  const { viewCount, likeCount, commentCount } = statistics;
  const { description, title } = localized;

  const formatCount = (n) => {
    if (!n) return "0";
    const num = parseInt(n);
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    // 🔥 MAIN FLEX LAYOUT
    <div className="flex w-full gap-2 p-4">
      {/* LEFT SIDE (VIDEO SECTION) */}
      <div className="w-[65%] overflow-y-auto scrollbar-hide">
        {/* VIDEO PLAYER */}
        <div className="aspect-video">
          <iframe
            className="w-full h-full rounded-xl"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        {/* TITLE */}
        <h1 className="text-white font-bold text-xl mt-4 leading-snug">
          {title}
        </h1>

        {/* CHANNEL + ACTIONS ROW */}
        <div className="flex items-center justify-between mt-3 flex-wrap gap-3 px-3">
          {/* LEFT: channel info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#272727] shrink-0">
              {ytIcon ? (
                <img
                  src={ytIcon}
                  alt={channelTitle}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white font-bold">
                  {channelTitle?.[0]}
                </div>
              )}
            </div>

            <div>
              <p className="text-white font-semibold text-sm">{channelTitle}</p>
            </div>

            <button className="ml-2 bg-white text-black text-sm font-bold px-4 py-2 rounded-full hover:bg-gray-200 transition">
              Subscribe
            </button>
          </div>

          {/* RIGHT: action buttons */}
          <div className="flex items-center gap-2">
            {/* Like/Dislike */}
            <div className="flex items-center bg-[#272727] rounded-full overflow-hidden">
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-[#3f3f3f] transition text-white text-sm font-semibold border-r border-gray-600">
                <AiOutlineLike className="text-xl" />
                {formatCount(likeCount)}
              </button>
              <button className="flex items-center px-4 py-2 hover:bg-[#3f3f3f] transition text-white">
                <AiOutlineDislike className="text-xl" />
              </button>
            </div>

            {/* ASK */}
            <button
              onClick={() => handlePanelToggle("ai")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition cursor-pointer
              ${activePanel === "ai" ? "bg-white text-black" : "bg-[#272727] text-white hover:bg-[#3f3f3f]"}`}
            >
              <RiGeminiFill className="text-xl" /> Ask
            </button>

            {/* NOTES */}
            <button
              onClick={() => handlePanelToggle("notes")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition cursor-pointer
              ${activePanel === "notes" ? "bg-white text-black" : "bg-[#272727] text-white hover:bg-[#3f3f3f]"}`}
            >
              <TbNotes className="text-xl" /> Notes
            </button>

            {/* Code */}
            <button
              onClick={() => handlePanelToggle("code")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition cursor-pointer
              ${activePanel === "code" ? "bg-white text-black" : "bg-[#272727] text-white hover:bg-[#3f3f3f]"}`}
            >
              <FaLaptopCode className="text-xl" /> Code
            </button>

            {/* LIVE */}
            <button
              onClick={() => handlePanelToggle("live")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition cursor-pointer
              ${activePanel === "live" ? "bg-white text-black" : "bg-[#272727] text-white hover:bg-[#3f3f3f]"}`}
            >
              <MdLiveTv className="text-xl" /> Live
            </button>

            {/* SAVE */}
            {/* <button className="flex items-center gap-2 bg-[#272727] hover:bg-[#3f3f3f] text-white text-sm font-semibold px-4 py-2 rounded-full transition cursor-pointer">
              <MdOutlineBookmarkAdd className="text-xl" /> Save
            </button> */}
          </div>
        </div>

        {/* DESCRIPTION BOX */}
        <div
          className="bg-[#272727] rounded-xl p-4 mt-4 cursor-pointer"
          onClick={() => setShowFullDesc(!showFullDesc)}
        >
          <div className="flex gap-3 text-white text-sm font-semibold mb-2">
            <span>{formatCount(viewCount)} views</span>
            <span>{formatDate(publishedAt)}</span>
          </div>

          <p
            className={`text-gray-300 text-sm whitespace-pre-line ${
              !showFullDesc ? "line-clamp-3" : ""
            }`}
          >
            {description}
          </p>

          <button className="text-white text-sm font-bold mt-2 cursor-pointer">
            {showFullDesc ? "Show less" : "Show more"}
          </button>
        </div>

        <CommentsContainer commentCount={commentCount} />
      </div>

      {/* 🔥 RIGHT PANEL */}
      <div className="w-[35%] h-[90vh] rounded-xl border border-gray-600 bg-[#272727] flex flex-col">
        {/* CONTENT */}
        <div className="flex-1 p-4 overflow-y-auto">
          {activePanel === null && (
            <p className="text-gray-400 text-lg text-center mt-70 ">
              Try out our premium features ( Ask / Code /Notes / Live )
            </p>
          )}
          {activePanel === "code" && <Code />}
          {activePanel === "live" && <LiveChat />}
          {activePanel === "ai" && <AiChatBot />}
          {activePanel === "notes" && <Notes />}
        </div>

        {/* INPUT
        {activePanel && (
          <div className="p-3 border-t border-gray-600 flex gap-2">
            <input
              type="text"
              placeholder="Type here..."
              className="flex-1 bg-black text-white px-3 py-2 rounded-lg outline-none"
            />
            <button className="bg-red-500 px-4 rounded-lg text-white">
              Send
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default WatchPage;
